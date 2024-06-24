import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'guest',
    loadComponent: () => import('@org/guest').then(m => m.GuestComponent)
  },
];
