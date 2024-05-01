import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ArticleService } from "../articles/article.service";
import { inject } from "@angular/core";
import { Article } from "../articles/article.interface";
import { Title } from "@angular/platform-browser";
import { tap } from "rxjs";
import { BRAND } from "../../app.constants";

export const HashtagsResolver: ResolveFn<string[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.hashtags$;
}

export const HashtagResolver: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  const articleService = inject(ArticleService);
  const title = inject(Title);
  return articleService.findByHashtag(hashtag).pipe(
    tap(() => title.setTitle(`${hashtag.charAt(0).toUpperCase() + hashtag.slice(1)} - ${BRAND}`)),
  );
}
