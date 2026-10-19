import { Routes } from "@angular/router";
import { DashboardUserLayoutComponent } from "./layout/dashboard-user-layout/dashboard-user-layout.component";
import { kycGuard } from "./guards/kyc.guard";
import { roleGuard } from "@shared/guards/role-guard";


export const dashboardUserRoutes: Routes = [
    {
        path:'',
        component: DashboardUserLayoutComponent,
        canActivateChild: [kycGuard],
        children:[
            {
                path: 'on-boarding',
                data: { roles: ['ROLE_USER'] },
                canActivate: [roleGuard],
                loadComponent: () => import('./pages/on-boarding/on-boarding')
            },
            {
                path: 'home',
                data: { roles: ['ROLE_USER'] },
                canActivate: [roleGuard],
                loadComponent: () => import('./pages/dashboard-user-home/dashboard-user-home')
            },

            {
                path: 'excercises',
                loadComponent: () => import('./pages/excersise-list/excersise-list')
            },
            {
                path: 'excercise/:id',
                loadComponent: () => import('./pages/excercise/excercise')
            },
            {
                path: 'progress',
                loadComponent: () => import('./pages/seguimiento/seguimiento')
            },
            {
                path: 'educacion',
                loadComponent: () => import('./pages/educacion/educacion')
            },
            {
                path: '**',
                redirectTo: 'home'
            },
        ]
    },
];

export default dashboardUserRoutes;
