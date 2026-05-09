import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout/main-layout';
import { NoPageFound } from '@shared/components/no-page-found/no-page-found';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', loadComponent: () => import('@shared/components/home/home')},
      { path: 'auth', loadChildren: () => import('@auth/auth.routes') },
    ],
  },

  {
    path: '**',
    component: NoPageFound
  },
];
