import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { BRAND } from "../../app.constants";
import { Article } from "../articles/article.interface";
import { HashtagService } from "./hashtag.service";

export const getHashtags: ResolveFn<string[]> = () => {
  const hashtagService = inject(HashtagService);
  return hashtagService.hashtags$;
}

export const findArticlesByHashtag: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  const hashtagService = inject(HashtagService);
  return hashtagService.findByHashtag(hashtag);
}

export const hashtagTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  return `${hashtag.charAt(0).toUpperCase() + hashtag.slice(1)} - ${BRAND}`;
} 
