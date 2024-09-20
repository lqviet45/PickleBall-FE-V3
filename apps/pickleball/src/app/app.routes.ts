import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'guest',
    pathMatch: 'full'
  },
  {
    path: 'guest',
    loadComponent: () => import('@org/guest').then(m => m.GuestComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('@org/admin').then(m => m.AdminComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('@org/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('@org/register').then(m => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('@org/forgot-password').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'owner',
    loadComponent: () => import('@org/owner').then(m => m.OwnerComponent),
  },
  {
    path: 'staff',
    loadComponent: () => import('@org/staff').then(m => m.StaffComponent),
  },
  {
    path: 'user/:firebaseId',
    loadComponent: () => import('@org/user').then(m => m.UserComponent),
  },
];
