import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { constants } from "../app.constants";
import { ArticleService } from "../services/article.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig.path;

  let title: string = 'Home';

  if (path) {
    title = path[0].toUpperCase() + path.slice(1, path.length);
  }

  if (path === '**') {
    title = `404 Not Found`;
  }

  return `${title} - ${constants.brand}`;
}

// resolve title for /hashtags/:hashtag
export const hashtagTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  let hashtag = route.paramMap.get('hashtag');
  // capitalize
  hashtag = hashtag[0].toUpperCase() + hashtag.slice(1, hashtag.length);

  return `${hashtag} - ${constants.brand}`;
}

// resolve title for /articles/:slug
export const slugTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');

  return inject(ArticleService).findBySlug(slug).pipe(
    map(article => `${article.title} - ${constants.brand}`),
  );
}

