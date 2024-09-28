import { Routes } from "@angular/router";
import { FindArticlesByHashtagResolver, GetHashtagsResolver, HashtagTitleResolver } from "./hashtag.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/hashtags/hashtags.component'),
    resolve: { hashtags: GetHashtagsResolver },
  },
  {
    path: ':hashtag',
    loadComponent: () => import('./pages/hashtags/hashtag/hashtag.component'),
    title: HashtagTitleResolver,
    resolve: { articles: FindArticlesByHashtagResolver },
  }
];

export default routes;