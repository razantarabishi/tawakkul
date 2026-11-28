import { Routes } from '@angular/router';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/customer-layout/customer-layout').then((m) => m.CustomerLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: '',
        loadChildren: () =>
          import('./support/support.routes').then((module) => module.SUPPORT_ROUTES),
      },
    ],
  },
];
