import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { map } from "rxjs";
import { Article } from "./article.interface";
import { ArticleService } from "./article.service";

export const GetArticles: ResolveFn<Article[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.articles$;
}

export const FindArticleBySlug: ResolveFn<Article> = (route: ActivatedRouteSnapshot) => {
  const articleService = inject(ArticleService);
  const slug = route.paramMap.get('slug');
  return articleService.findBySlug(slug);
}

export const ArticleTitle: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const articleService = inject(ArticleService);
  const slug = route.paramMap.get('slug');
  return articleService.findBySlug(slug).pipe(
    map(article => article.title),
  );
}
