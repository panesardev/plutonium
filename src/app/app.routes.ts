import { Routes } from '@angular/router';
import { articleTitleResolver, findArticleBySlug, getArticles } from './domains/articles/article.resolver';
import { findArticlesByHashtag, getHashtags, hashtagTitleResolver } from './domains/hashtags/hashtag.resolver';
import IndexComponent from './pages/index/index.component';
import { titleResolver } from './shared/resolvers/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    title: titleResolver,
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/pages/auth.component'),
    title: titleResolver,
  },
  {
    path: 'articles',
    loadComponent: () => import('./domains/articles/pages/articles/articles.component'),
    title: titleResolver,
    resolve: { articles: getArticles },
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./domains/articles/pages/article/article.component'),
    title: articleTitleResolver,
    resolve: { article: findArticleBySlug },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: titleResolver,
  },
  {
    path: 'hashtags',
    loadComponent: () => import('./domains/hashtags/pages/hashtags/hashtags.component'),
    title: titleResolver,
    resolve: { hashtags: getHashtags },
  },
  {
    path: 'hashtags/:hashtag',
    loadComponent: () => import('./domains/hashtags/pages/hashtag/hashtag.component'),
    title: hashtagTitleResolver,
    resolve: { articles: findArticlesByHashtag },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: titleResolver,
  },
];
