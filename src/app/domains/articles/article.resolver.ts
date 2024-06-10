import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { map } from "rxjs";
import { BRAND } from "../../app.constants";
import { Article } from "./article.interface";
import { ArticleService } from "./article.service";

export const getArticles: ResolveFn<Article[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.articles$;
}

export const findArticleBySlug: ResolveFn<Article> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  const articleService = inject(ArticleService);
  return articleService.findBySlug(slug);
}

export const articleTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  const articleService = inject(ArticleService);
  return articleService.findBySlug(slug).pipe(
    map(article => `${article.title} - ${BRAND}`),
  );
}