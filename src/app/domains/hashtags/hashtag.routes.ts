import { Routes } from "@angular/router";
import { findArticlesByHashtag, getHashtags, hashtagTitle } from "./hashtag.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/hashtags/hashtags.component'),
    resolve: { hashtags: getHashtags },
  },
  {
    path: ':hashtag',
    loadComponent: () => import('./pages/hashtags/hashtag/hashtag.component'),
    title: hashtagTitle,
    resolve: { articles: findArticlesByHashtag },
  }
];

export default routes;