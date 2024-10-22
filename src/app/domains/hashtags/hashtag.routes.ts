import { Routes } from "@angular/router";
import { FindArticlesByHashtag, GetHashtags, HashtagTitle } from "./hashtag.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/hashtags/hashtags.component'),
    resolve: { hashtags: GetHashtags },
  },
  {
    path: ':hashtag',
    loadComponent: () => import('./pages/hashtags/hashtag/hashtag.component'),
    title: HashtagTitle,
    resolve: { articles: FindArticlesByHashtag },
  }
];

export default routes;