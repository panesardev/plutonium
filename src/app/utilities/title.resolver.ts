import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { map } from "rxjs";
import { ContentService } from "../services/content.service";

// articles/:slug
export const articleTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  return inject(ContentService).findBySlug(slug).pipe(
    map(article => `${article.title} - Plutonium`),
  );
}

// hashtags/:hashtag
export const hashtagTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  let hashtag = route.paramMap.get('hashtag');
  // capitalize
  hashtag = hashtag.charAt(0).toUpperCase() + hashtag.slice(1);
  return `${hashtag} - Plutonium`;
}
