import { Routes } from "@angular/router";
import { ArticleTitleResolver, FindArticleBySlugResolver, GetArticlesResolver } from "./article.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/articles/articles.component'),
    resolve: { articles: GetArticlesResolver },
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/articles/article/article.component'),
    title: ArticleTitleResolver,
    resolve: { article: FindArticleBySlugResolver },
  }
];

export default routes;