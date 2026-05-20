import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginForm } from '@auth/interfaces/login-form.interface';
import { RegisterForm } from '@auth/interfaces/register-form.interface';
import { User } from '@auth/interfaces/user.interface';
import { EstadoKycEnum } from '@shared/enums/estadokyc.enum';
import { MessagesService } from '@shared/services/messages.service';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL= environment.baseUrl;
const TOKEN_KEY = 'SpafeuToken';
const USER_KEY = 'SpafeuUser';

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

        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.authorities?.map((r: any) => r.authority) ?? [];
    });

    login(formData: LoginForm) {
      return this.http.post(`${BASE_URL}/login`, {
        username: formData.email,
        password: formData.password
      })
        .pipe(
          tap((resp: any) => {
            this._token.set(resp.token);
            const payload= JSON.parse(atob(resp.token.split(".")[1]));
            localStorage.setItem(TOKEN_KEY, resp.token);
            const {nombreCompleto,estadoKyc,id,foto} = resp.usuario;
            const roles = (payload.authorities ?? []).map((r: any) => r.authority);
            const user: User= {
              id,
              nombreCompleto,
              estadoKyc,
              foto,
              roles
            }
            this._currentUser.set(user);
            localStorage.setItem(USER_KEY, JSON.stringify(user));

          })
        );
    }
    
    forgotPassword(email : string) {

      const params = new HttpParams().set('email', email);
      return this.http.post(`${BASE_URL}/auth/forgot-password`, null, {params})
                .pipe(
                  catchError(this.messages.errorHandler)
                )
    }

    register(formData: RegisterForm) {
      const { name: nombreCompleto, ...dataForm}= formData;
      const datosEnviar = { nombreCompleto, ...dataForm };

      return this.http.post(`${BASE_URL}/auth/register`,datosEnviar)
              .pipe(
                catchError(this.messages.errorHandler)
              );
    }

    resetPassword(token: string, password: string) {
      const params = new HttpParams()
                          .set('token', token)
                          .set('newPassword',password);

      return this.http.post(`${BASE_URL}/auth/reset-password`,null, {params})
                      .pipe(
                        catchError(this.messages.errorHandler)
                      );
    }

  isAuthenticated = computed(()=>{
    const token = this.token();
    if (!token) return false;

    const payload = this.obtenerDatosToken(token);
    return !!payload?.username && payload.username.length > 0;
  })

  isTokenExpirado = computed(()=>{
    const token = this.token();
    if (!token) return true; 

    const payload = this.obtenerDatosToken(token);
    if (!payload || !payload.exp) return true; 

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp < nowInSeconds;
  })
    

  obtenerDatosToken(accessToken: string): any{

    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return null;
  }

  logout() {
    this._token.set(null);
    this._currentUser.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
  
  actualizarEstadoKycUsuario(estado: EstadoKycEnum) {
    const usuario = this._currentUser();
    if (usuario) {
      const actualizado = { ...usuario, estadoKyc: estado };
      this._currentUser.set(actualizado);
      localStorage.setItem(USER_KEY, JSON.stringify(actualizado));
    }
  }
}
