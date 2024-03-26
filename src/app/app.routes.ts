import { Routes } from '@angular/router';
import { ArticleResolver } from './routes/articles/article/article.component';
import { ArticlesResolver } from './routes/articles/articles.component';
import { HashtagResolver } from './routes/hashtags/hashtag/hashtag.component';
import { HashtagsResolver } from './routes/hashtags/hashtags.component';
import IndexComponent from './routes/index/index.component';
import { AuthGuard } from './utilities/auth.guard';
import { TitleResolver } from './utilities/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
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
