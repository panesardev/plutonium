import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { map } from "rxjs";
import { ContentService } from "../services/content.service";
import { BRAND } from "../app.constants";

// default title resolver
export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig?.path;
  let title = 'Home';

  if (path) {
    title = path[0].toUpperCase() + path.slice(1, path.length);
  }
  if (path === '404') {
    title = 'Page Not Found';
  }

  return `${title} - ${BRAND}`;
}

// articles/:slug
export const articleTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  return inject(ContentService).findBySlug(slug).pipe(
    map(article => `${article.title} - ${BRAND}`),
  );
}

// hashtags/:hashtag
export const hashtagTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  let hashtag = route.paramMap.get('hashtag');
  // capitalize
  hashtag = hashtag.charAt(0).toUpperCase() + hashtag.slice(1);
  return `${hashtag} - ${BRAND}`;
}
