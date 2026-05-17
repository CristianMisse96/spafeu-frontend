import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const userRoles = authService.roles();
  const allowedRoles = route.data['roles'] as string[];

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const hasAccess = userRoles.some((role: string) => allowedRoles.includes(role));

  if (!hasAccess) {
    toastr.error('No tienes permiso para acceder a esta sección.', 'Acceso denegado');
    router.navigate(['/']);
    return false;
  }

  return true;
};
