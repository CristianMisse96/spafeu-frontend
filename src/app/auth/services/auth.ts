import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginForm } from '@auth/interfaces/login-form.interface';
import { RefreshTokenResponse } from '@auth/interfaces/refresh-token-response.interface';
import { RegisterForm } from '@auth/interfaces/register-form.interface';
import { Role } from '@auth/interfaces/role.interface';
import { User } from '@auth/interfaces/user.interface';
import { EstadoKycEnum } from '@shared/enums/estadokyc.enum';
import { RoleEnum } from '@shared/enums/role.enum';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { MessagesService } from '@shared/services/messages.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;
const TOKEN_KEY = 'SpafeuToken';
const USER_KEY = 'SpafeuUser';

/**
 * Servicio central de autenticación.
 *
 * Gestiona el access token (localStorage + signals), la renovación mediante
 * refresh token en cookie HttpOnly, y el cierre de sesión contra el backend.
 */
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private _currentUser = signal<User | null>(JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'));

  private http = inject(HttpClient);
  private messages = inject(MessagesService);

  usuario = computed(() => this._currentUser());
  estadoKyc = computed(() => this._currentUser()?.estadoKyc ?? EstadoKycEnum.NO_INICIADO);
  token = computed(() => this._token());

  roles = computed(() => {
    const token = this._token();
    if (!token) return [];

    const payload = this.obtenerDatosToken(token);
    return (
      payload?.authorities?.map((r: { authority: string }) => r.authority) ?? []
    );
  });

  login(formData: LoginForm) {
    return this.http
      .post(`${BASE_URL}/login`, {
        username: formData.email,
        password: formData.password,
      })
      .pipe(
        tap((resp: any) => {
          const response = resp as { token: string; usuario: User };
          this.setSession(response.token, response.usuario);
        })
      );
  }

  forgotPassword(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http
      .post(`${BASE_URL}/auth/forgot-password`, null, { params })
      .pipe(catchError(this.messages.errorHandler));
  }

  register(formData: RegisterForm) {
    const { name: nombreCompleto, ...dataForm } = formData;
    const datosEnviar = { nombreCompleto, ...dataForm };

    return this.http
      .post(`${BASE_URL}/auth/register`, datosEnviar)
      .pipe(catchError(this.messages.errorHandler));
  }

  resetPassword(token: string, password: string) {
    const params = new HttpParams().set('token', token).set('newPassword', password);

    return this.http
      .post(`${BASE_URL}/auth/reset-password`, null, { params })
      .pipe(catchError(this.messages.errorHandler));
  }

  /**
   * Renueva el access token usando el refresh token almacenado en cookie HttpOnly.
   * @returns Observable con el nuevo access token.
   */
  refreshToken(): Observable<string> {
    return this.http
      .post<RespuestaServicio<RefreshTokenResponse>>(`${BASE_URL}/session/refresh`, {})
      .pipe(
        tap((resp) => {
          if (resp.ok && resp.negocio?.accessToken) {
            this.setSession(resp.negocio.accessToken, resp.negocio.usuario);
          }
        }),
        map((resp) => {
          if (!resp.ok || !resp.negocio?.accessToken) {
            throw new Error('La respuesta de renovación no contiene un access token válido');
          }
          return resp.negocio.accessToken;
        }),
        catchError((error) => {
          this.clearSession();
          return throwError(() => error);
        })
      );
  }

  isAuthenticated = computed(() => {
    const token = this.token();
    if (!token) return false;

    const payload = this.obtenerDatosToken(token);
    return !!payload?.username && payload.username.length > 0;
  });

  isTokenExpirado = computed(() => {
    const token = this.token();
    if (!token) return true;

    const payload = this.obtenerDatosToken(token);
    if (!payload || !payload.exp) return true;

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp < nowInSeconds;
  });

  obtenerDatosToken(accessToken: string): {
    username?: string;
    exp?: number;
    authorities?: { authority: string }[];
  } | null {
    if (accessToken != null) {
      try {
        return JSON.parse(atob(accessToken.split('.')[1]));
      } catch {
        return null;
      }
    }

    return null;
  }

  /**
   * Cierra la sesión localmente y notifica al backend para revocar el refresh token.
   * La llamada al backend es fire-and-forget: no bloquea la navegación del usuario.
   */
  logout() {
    this.http.post<RespuestaServicio<string>>(`${BASE_URL}/session/logout`, {}).subscribe();
    this.clearSession();
  }

  actualizarEstadoKycUsuario(estado: EstadoKycEnum) {
    const usuario = this._currentUser();
    if (usuario) {
      const actualizado = { ...usuario, estadoKyc: estado };
      this._currentUser.set(actualizado);
      localStorage.setItem(USER_KEY, JSON.stringify(actualizado));
    }
  }

  actualizarUsuario(data: Partial<User>) {
    const usuario = this._currentUser();

    if (usuario) {
      const actualizado = {
        ...usuario,
        ...data,
      };

      this._currentUser.set(actualizado);
      localStorage.setItem(USER_KEY, JSON.stringify(actualizado));
    }
  }

  private setSession(token: string, usuario: User) {
    this._token.set(token);
    localStorage.setItem(TOKEN_KEY, token);

    const payload = this.obtenerDatosToken(token);
    const roles: Role[] = (payload?.authorities ?? []).map((r, index) => ({
      id: index,
      rol: r.authority as RoleEnum,
    }));
    const user: User = {
      ...usuario,
      roles,
    };

    this._currentUser.set(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private clearSession() {
    this._token.set(null);
    this._currentUser.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
