import { Routes } from '@angular/router';
import { ArticleResolver, ArticlesResolver } from './domains/articles/article.resolver';
import { AuthGuard } from './domains/auth/auth.guard';
import { HashtagResolver, HashtagsResolver } from './domains/hashtags/hashtag.resolver';
import IndexComponent from './routes/index/index.component';
import { TitleResolver } from './utilities/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about.component'),
    title: TitleResolver,
  },
  {
    path: 'articles',
    loadComponent: () => import('./routes/articles/articles.component'),
    title: TitleResolver,
    resolve: { articles: ArticlesResolver },
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./routes/articles/article/article.component'),
    resolve: { article: ArticleResolver },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: TitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: 'hashtags',
    loadComponent: () => import('./routes/hashtags/hashtags.component'),
    title: TitleResolver,
    resolve: { hashtags: HashtagsResolver },
  },
  {
    path: 'hashtags/:hashtag',
    loadComponent: () => import('./routes/hashtags/hashtag/hashtag.component'),
    resolve: { articles: HashtagResolver },
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: TitleResolver,
  }
];
