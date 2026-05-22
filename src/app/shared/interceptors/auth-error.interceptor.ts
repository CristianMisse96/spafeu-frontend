import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastrService);
  const router = inject(Router);
  const authService = inject(Auth);

  return next(req).pipe(
    catchError(e => {
      if (e.status === 401) {
        if (authService.isAuthenticated()) {
          authService.logout();
          toast.error('Acceso no autorizado. Inicia sesión o contacta al administrador.', 'Error!!', { timeOut: 3000 });
        }
        if (router.url !== '/auth/login') router.navigate(['/auth/login']);
      }

      if (e.status === 403) {
        toast.warning('no tienes acceso a este recurso', 'Acceso Denegado', { timeOut: 3000 });
        router.navigate(['/']);
      }

      return throwError(() => e);
    })
  );
};
