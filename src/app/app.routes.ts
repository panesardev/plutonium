import { Routes } from '@angular/router';
import { prefetchArticles } from './routes/articles/articles.component';
import { prefetchArticleBySlug } from './routes/articles/slug/slug.component';
import { prefetchArticlesByHashtag } from './routes/hashtags/hashtag/hashtag.component';
import { prefetchHashtags } from './routes/hashtags/hashtags.component';
import IndexComponent from './routes/index/index.component';
import { hashtagTitleResolver, slugTitleResolver, titleResolver } from './utilities/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component'),
    title: titleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: titleResolver,
  },
  {
    path: 'articles',
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/articles/articles.component'),
        title: titleResolver,
        resolve: { articles: prefetchArticles },
      },
      {
        path: ':slug',
        loadComponent: () => import('./routes/articles/slug/slug.component'),
        title: slugTitleResolver,
        resolve: { article: prefetchArticleBySlug },
      }
    ],
  },
  {
    path: 'hashtags',
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/hashtags/hashtags.component'),
        title: titleResolver,
        resolve: { hashtags: prefetchHashtags },
      },
      {
        path: ':hashtag',
        loadComponent: () => import('./routes/hashtags/hashtag/hashtag.component'),
        title: hashtagTitleResolver,
        resolve: { articles: prefetchArticlesByHashtag },
      }
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: titleResolver,
  },
];
