import { Routes } from '@angular/router';
import { titleResolver } from './shared/resolvers/title.resolver';
import IndexComponent from './pages/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes'),
    title: titleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    title: titleResolver,
  },
  {
    path: 'articles',
    loadChildren: () => import('./domains/articles/article.routes'),
    title: titleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: titleResolver,
  },
  {
    path: 'hashtags',
    loadChildren: () => import('./domains/hashtags/hashtag.routes'),
    title: titleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: titleResolver,
  },
];
