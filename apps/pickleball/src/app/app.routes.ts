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
    path: 'login',
    loadComponent: () => import('@org/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('@org/register').then(m => m.RegisterComponent),
  },
  {
    path: 'owner',
    loadComponent: () => import('@org/owner').then(m => m.OwnerComponent),
  },
  {
    path: 'staff',
    loadComponent: () => import('@org/staff').then(m => m.StaffComponent),
  },
];
