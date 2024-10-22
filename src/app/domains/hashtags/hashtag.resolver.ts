import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Article } from "@app/domains/articles/article.interface";
import { HashtagService } from "./hashtag.service";

export const GetHashtags: ResolveFn<string[]> = () => {
  const hashtagService = inject(HashtagService);
  return hashtagService.hashtags$;
}

export const FindArticlesByHashtag: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  const hashtagService = inject(HashtagService);
  const hashtag = route.paramMap.get('hashtag');
  return hashtagService.findByHashtag(hashtag);
}

export const HashtagTitle: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  return hashtag.charAt(0).toUpperCase() + hashtag.slice(1);
} 
