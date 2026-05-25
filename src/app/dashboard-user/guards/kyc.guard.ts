import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { EstadoKycEnum } from '@shared/enums/estadokyc.enum';

export const kycGuard: CanActivateChildFn = (childRoute, state) => {

    const authService=  inject(Auth);
    const router= inject(Router);

    const kycApproved = authService.estadoKyc();
    const url = state.url;

   // Si no ha aprobado el KYC y está intentando ir a /home → redirigir a verify
    if (kycApproved === EstadoKycEnum.NO_INICIADO  && url.includes('home')) {
      return router.parseUrl('/dashboard-user/on-boarding');
    }

    // Si ya aprobó el KYC y está yendo a verify redirigir a home
    if ((kycApproved === EstadoKycEnum.COMPLETO) 
            && url.includes('verify-identity')) {
      return router.parseUrl('/dashboard-user/home');
    }

    return true
};
