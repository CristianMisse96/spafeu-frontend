import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { MessagesService } from '@shared/services/messages.service';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';

/**
 * Interceptor de autenticación único.
 *
 * Responsabilidades:
 * - Enviar credenciales (cookies) en todas las peticiones al backend.
 * - Añadir el access token como Bearer, excepto en endpoints de autenticación.
 * - Detectar 401 por access token expirado e intentar renovarlo una sola vez.
 * - Compartir una única renovación entre peticiones concurrentes.
 * - Si la renovación falla con 401, limpiar la sesión y redirigir al login.
 * - Si la renovación falla con 403, mostrar advertencia y redirigir al inicio del usuario.
 * - Otros errores de renovación se propagan para que los servicios los manejen.
 * - Detectar 403 (acceso denegado) y redirigir al inicio del usuario.
 */

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> | null = null;

const AUTH_ENDPOINTS = ['/api/login', '/api/session/refresh', '/api/session/logout'];

function isAuthEndpoint(url: string): boolean {
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

function cloneRequest(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  return req.clone({
    withCredentials: true,
    setHeaders: token && !isAuthEndpoint(req.url) ? { Authorization: `Bearer ${token}` } : {},
  });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const messages = inject(MessagesService);

  const token = authService.token();
  const authReq = cloneRequest(req, token);

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isAuthEndpoint(req.url)
      ) {
        return handleUnauthorized(authService, router, messages, req, next);
      }

      if (error instanceof HttpErrorResponse && error.status === 403) {
        messages.showWarning('No tienes permisos para acceder a este recurso.', 'Acceso denegado');
        router.navigate(['/dashboard-user/home']);
      }

      return throwError(() => error);
    })
  );
};

function handleUnauthorized(
  authService: Auth,
  router: Router,
  messages: MessagesService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject = new BehaviorSubject<string | null>(null);

    return authService.refreshToken().pipe(
      switchMap((newToken) => {
        isRefreshing = false;
        refreshTokenSubject!.next(newToken);
        refreshTokenSubject!.complete();
        return next(cloneRequest(req, newToken));
      }),
      catchError((error: unknown) => {
        isRefreshing = false;
        refreshTokenSubject!.error(error);
        refreshTokenSubject = null;

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            authService.logout();
            router.navigate(['/auth/login']);
          } else if (error.status === 403) {
            messages.showWarning('No tienes permisos para acceder a este recurso.', 'Acceso denegado');
            router.navigate(['/dashboard-user/home']);
          }
        }

        return throwError(() => error);
      })
    );
  }

  return refreshTokenSubject!.pipe(
    filter((token): token is string => token !== null),
    take(1),
    switchMap((newToken) => next(cloneRequest(req, newToken))),
    catchError((error) => throwError(() => error))
  );
}
