import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Article } from "./article.interface";
import { ArticleService } from "./article.service";
import { inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { tap } from "rxjs";
import { BRAND } from "../../app.constants";

export const ArticlesResolver: ResolveFn<Article[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.articles$;
}

export const ArticleResolver: ResolveFn<Article> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  const articleService = inject(ArticleService);
  const title = inject(Title);
  return articleService.findBySlug(slug).pipe(
    tap(article => title.setTitle(`${article.title} - ${BRAND}`)),
  );
}