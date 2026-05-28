import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout/main-layout';
import { NoPageFound } from '@shared/components/no-page-found/no-page-found';
import { authGuard } from '@auth/guards/auth-guard';
import { publicGuard } from '@shared/guards/public-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', 
        canActivate: [publicGuard],
        loadComponent: () => import('@shared/components/home/home')
      },
      { path: 'auth', loadChildren: () => import('@auth/auth.routes') },
    ],
  },
  {
    path: 'dashboard-user',
    canMatch: [authGuard],
    loadChildren: () => import('@dashboard-user/dashboard-user.routes')
  },

  {
    path: '**',
    component: NoPageFound
  },
];
