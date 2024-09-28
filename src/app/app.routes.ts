import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TitleResolver } from './shared/resolvers/title.resolver';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    title: TitleResolver,
  },
  {
    path: 'articles',
    loadChildren: () => import('./domains/articles/article.routes'),
    title: TitleResolver,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    title: TitleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: TitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: 'hashtags',
    loadChildren: () => import('./domains/hashtags/hashtag.routes'),
    title: TitleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: TitleResolver,
  }
];
