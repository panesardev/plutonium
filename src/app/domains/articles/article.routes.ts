import { Routes } from "@angular/router";
import { ArticleTitle, FindArticleBySlug, GetArticles } from "./article.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/articles/articles.component'),
    resolve: { articles: GetArticles },
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/articles/article/article.component'),
    title: ArticleTitle,
    resolve: { article: FindArticleBySlug },
  }
];

export default routes;