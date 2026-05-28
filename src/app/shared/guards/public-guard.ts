import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';

import { ToastrService } from 'ngx-toastr';

export const publicGuard: CanActivateFn = () => {

    const auth = inject(Auth);
    const router = inject(Router);
    const toast = inject(ToastrService);

    if (auth.isAuthenticated()) {

        toast.info(
            `${auth.usuario()?.nombreCompleto}, ya estás autenticado`,
            'Login'
        );

        return router.createUrlTree([
            '/dashboard-user/home'
        ]);
    }

    return true;
};