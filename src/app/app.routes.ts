import { Routes } from '@angular/router';
import IndexComponent from './routes/index/index.component';
import { hashtagTitleResolver, slugTitleResolver } from './utilities/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'Home - Plutonium',
  },
  {
    path: 'articles',
    loadComponent: () => import('./routes/articles/articles.component'),
    title: 'Articles - Plutonium',
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./routes/articles/slug/slug.component'),
    title: slugTitleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: 'Dashboard - Plutonium',
  },
  {
    path: 'hashtags',
    loadComponent: () => import('./routes/hashtags/hashtags.component'),
    title: 'Hashtags - Plutonium',
  },
  {
    path: 'hashtags/:hashtag',
    loadComponent: () => import('./routes/hashtags/hashtag/hashtag.component'),
    title: hashtagTitleResolver,
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component'),
    title: 'Login - Plutonium',
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: '404 page not found - Plutonium',
  },
];
