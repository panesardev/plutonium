import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Article } from "@app/domains/articles/article.interface";
import { HashtagService } from "./hashtag.service";

export const getHashtags: ResolveFn<string[]> = () => {
  const hashtagService = inject(HashtagService);
  return hashtagService.hashtags$;
}

export const findArticlesByHashtag: ResolveFn<Article[]> = route => {
  const hashtagService = inject(HashtagService);
  const hashtag = route.paramMap.get('hashtag');
  return hashtagService.findByHashtag(hashtag);
}

export const hashtagTitle: ResolveFn<string> = route => {
  const hashtag = route.paramMap.get('hashtag');
  return hashtag.charAt(0).toUpperCase() + hashtag.slice(1);
} 
