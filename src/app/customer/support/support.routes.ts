import { Routes } from '@angular/router';
import { SUPPORT_PAGE, SUPPORT_PAGES } from './support-pages';

export const SUPPORT_ROUTES: Routes = Object.values(SUPPORT_PAGES).map((page) => ({
  path: page.route.slice(1),
  providers: [{ provide: SUPPORT_PAGE, useValue: page }],
  loadComponent: () => import('./support-page/support-page').then((module) => module.SupportPage),
}));
