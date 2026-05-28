import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login-page/login-page";
import { RegisterPage } from "./pages/register-page/register-page";
import { ForgotPasswordPage } from "./pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "./pages/reset-password-page/reset-password-page";
import { AuthLayout } from "./layuot/auth-layout/auth-layout";
import { publicGuard } from "@shared/guards/public-guard";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
        canActivate: [publicGuard]
      },
      {
        path: 'register',
        component: RegisterPage,
        canActivate: [publicGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPage,
        canActivate: [publicGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordPage,
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

