import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { map } from "rxjs";
import { Article } from "./article.interface";
import { ArticleService } from "./article.service";

export const getArticlesResolver: ResolveFn<Article[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.articles$;
}

export const findArticleBySlugResolver: ResolveFn<Article> = route => {
  const articleService = inject(ArticleService);
  const slug = route.paramMap.get('slug');
  return articleService.findBySlug(slug);
}

export const articleTitleResolver: ResolveFn<string> = route => {
  const articleService = inject(ArticleService);
  const slug = route.paramMap.get('slug');
  return articleService.findBySlug(slug).pipe(
    map(article => article.title),
  );
}
