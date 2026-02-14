import { Routes } from "@angular/router";
import { findArticlesByHashtagResolver, getHashtagsResolver, hashtagTitleResolver } from "@app/domains/hashtags/hashtag.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./hashtags.component'),
    resolve: { hashtags: getHashtagsResolver },
  },
  {
    path: ':hashtag',
    loadComponent: () => import('./hashtag/hashtag.component'),
    title: hashtagTitleResolver,
    resolve: { articles: findArticlesByHashtagResolver },
  }
];

export default routes;