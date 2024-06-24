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
    path: 'owner',
    loadComponent: () => import('@org/owner').then(m => m.OwnerComponent),
  },
];
