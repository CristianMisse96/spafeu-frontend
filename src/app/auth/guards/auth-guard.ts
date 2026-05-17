import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (!authService.isAuthenticated()) {
    // no autenticado
    toast.warning('Debes iniciar sesión para continuar.', 'Acceso denegado', { timeOut: 2500 });
    return router.createUrlTree(['auth/login']);
  }

  if (authService.isTokenExpirado()) {
    // sesión expirada
    authService.logout();
    toast.info('Por favor, inicia sesión nuevamente para continuar.', 'Sesión expirada', { timeOut: 2500 });
    return router.createUrlTree(['auth/login']);
  }

  return true;
};
