import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { map } from "rxjs";
import { Article } from "./article.interface";
import { ArticleService } from "./article.service";

export const GetArticlesResolver: ResolveFn<Article[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.articles$;
}

export const FindArticleBySlugResolver: ResolveFn<Article> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  const articleService = inject(ArticleService);
  return articleService.findBySlug(slug);
}

export const ArticleTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  const articleService = inject(ArticleService);
  return articleService.findBySlug(slug).pipe(
    map(article => `${article.title} - Plutonium`),
  );
}
