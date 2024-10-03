import { Routes } from "@angular/router";
import { TitleResolver } from "@app/shared/resolvers/title.resolver";

const routes: Routes = [
  {
    path: 'create-account',
    loadComponent: () => import('./pages/create-account/create-account.component'),
    title: TitleResolver,
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    title: TitleResolver,
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component'),
    title: TitleResolver,
  },
];

export default routes;
