import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Article } from "../articles/article.interface";
import { HashtagService } from "./hashtag.service";
import { BRAND } from "@app/app.constants";

export const GetHashtagsResolver: ResolveFn<string[]> = () => {
  const hashtagService = inject(HashtagService);
  return hashtagService.hashtags$;
}

export const FindArticlesByHashtagResolver: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  const hashtagService = inject(HashtagService);
  return hashtagService.findByHashtag(hashtag);
}

export const HashtagTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  return `${hashtag.charAt(0).toUpperCase() + hashtag.slice(1)} - ${BRAND}`;
} 
