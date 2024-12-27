import { Routes } from "@angular/router";
import { articleTitle, findArticleBySlug, getArticles } from "./article.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/articles/articles.component'),
    resolve: { articles: getArticles },
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/articles/article/article.component'),
    title: articleTitle,
    resolve: { article: findArticleBySlug },
  }
];

export default routes;