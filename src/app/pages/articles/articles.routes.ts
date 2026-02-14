import { Routes } from "@angular/router";
import { articleTitleResolver, findArticleBySlugResolver, getArticlesResolver } from "@app/domains/articles/article.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./articles.component'),
    resolve: { articles: getArticlesResolver },
  },
  {
    path: ':slug',
    loadComponent: () => import('./article/article.component'),
    title: articleTitleResolver,
    resolve: { article: findArticleBySlugResolver },
  }
];

export default routes;
