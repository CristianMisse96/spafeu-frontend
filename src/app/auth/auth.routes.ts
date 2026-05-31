import { Routes } from "@angular/router";
import { publicGuard } from "@shared/guards/public-guard";
import { AuthLayout } from "./layuot/auth-layout/auth-layout";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: ()=> import('./pages/login-page/login-page'),
        canActivate: [publicGuard]
      },
      {
        path: 'register',
        loadComponent: ()=> import('./pages/register-page/register-page'),
        canActivate: [publicGuard]
      },
      {
        path: 'forgot-password',
        loadComponent: ()=> import('./pages/forgot-password-page/forgot-password-page'),
        canActivate: [publicGuard]
      },
      {
        path: 'reset-password',
        loadComponent: ()=> import('./pages/reset-password-page/reset-password-page'),
        canActivate: [publicGuard]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

export default authRoutes;

