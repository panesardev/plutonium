import { Routes } from '@angular/router';
import IndexComponent, { indexViewResolver } from './routes/index/index.component';
import { hashtagTitleResolver, articleTitleResolver } from './utilities/title.resolver';
import { articleViewResolver } from './routes/articles/article/article.component';
import { articlesViewResolver } from './routes/articles/articles.component';
import { hashtagViewResolver } from './routes/hashtags/hashtag/hashtag.component';
import { hashtagsViewResolver } from './routes/hashtags/hashtags.component';
import { dashboardGuard, dashboardViewResolver } from './routes/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'Home - Plutonium',
    resolve: {
      view: indexViewResolver,
    }
  },
  {
    path: 'articles',
    loadComponent: () => import('./routes/articles/articles.component'),
    title: 'Articles - Plutonium',
    resolve: {
      view: articlesViewResolver,
    }
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./routes/articles/article/article.component'),
    title: articleTitleResolver,
    resolve: {
      view: articleViewResolver,
    }
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: 'Dashboard - Plutonium',
    canActivate: [dashboardGuard],
    resolve: {
      view: dashboardViewResolver,
    }
  },
  {
    path: 'hashtags',
    loadComponent: () => import('./routes/hashtags/hashtags.component'),
    title: 'Hashtags - Plutonium',
    resolve: {
      view: hashtagsViewResolver,
    }
  },
  {
    path: 'hashtags/:hashtag',
    loadComponent: () => import('./routes/hashtags/hashtag/hashtag.component'),
    title: hashtagTitleResolver,
    resolve: {
      view: hashtagViewResolver,
    }
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
