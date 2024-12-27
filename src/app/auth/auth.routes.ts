import { Routes } from "@angular/router";
import { titleResolver } from "@app/shared/resolvers/title.resolver";

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    title: titleResolver,
  },
  {
    path: 'create-account',
    loadComponent: () => import('./pages/create-account/create-account.component'),
    title: titleResolver,
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component'),
    title: titleResolver,
  },
];

export default routes;
