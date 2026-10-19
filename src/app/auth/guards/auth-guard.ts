import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ToastrService } from 'ngx-toastr';

/**
 * Guard que protege las rutas del dashboard.
 *
 * Solo verifica la existencia de un access token. Si el token expiró,
 * el interceptor de autenticación intentará renovarlo automáticamente
 * ante el primer 401; de no poder hacerlo, redirigirá al login.
 */
export const authGuard: CanMatchFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (!authService.isAuthenticated()) {
    toast.warning('Debes iniciar sesión para continuar.', 'Acceso denegado', { timeOut: 2500 });
    return router.createUrlTree(['auth/login']);
  }

  return true;
};
