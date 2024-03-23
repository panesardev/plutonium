import { Routes } from '@angular/router';
import { articleViewResolver } from './routes/articles/article/article.component';
import { articlesViewResolver } from './routes/articles/articles.component';
import { dashboardViewResolver } from './routes/dashboard/dashboard.component';
import { hashtagViewResolver } from './routes/hashtags/hashtag/hashtag.component';
import { hashtagsViewResolver } from './routes/hashtags/hashtags.component';
import IndexComponent, { indexViewResolver } from './routes/index/index.component';
import { authGuard } from './utilities/auth.guard';
import { articleTitleResolver, hashtagTitleResolver, titleResolver } from './utilities/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
    resolve: {
      view: indexViewResolver,
    }
  },
  {
    path: 'articles',
    loadComponent: () => import('./routes/articles/articles.component'),
    title: titleResolver,
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
    title: titleResolver,
    canActivate: [authGuard],
    resolve: {
      view: dashboardViewResolver,
    }
  },
  {
    path: 'hashtags',
    loadComponent: () => import('./routes/hashtags/hashtags.component'),
    title: titleResolver,
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
    title: titleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: titleResolver,
  },
];
