import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login-page/login-page";
import { RegisterPage } from "./pages/register-page/register-page";
import { ForgotPasswordPage } from "./pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "./pages/reset-password-page/reset-password-page";
import { AuthLayout } from "./layuot/auth-layout/auth-layout";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'register',
        component: RegisterPage
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPage
      },
      {
        path: 'reset-password',
        component: ResetPasswordPage
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

export default authRoutes;

