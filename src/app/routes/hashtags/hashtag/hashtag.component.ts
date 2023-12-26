import { ChangeDetectionStrategy, Component, inject, Input as RouteInput } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { injectParams } from 'ngxtension/inject-params';
import { pipe, startWith, switchMap } from 'rxjs';
import { ArticleListComponent } from '../../../components/article-list.component';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Article } from '../../../interfaces/article';

export const prefetchArticlesByHashtag: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  return inject(ArticleService).findAllByHashtag(hashtag);
}

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './hashtag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagComponent {

  @RouteInput() articles: Article[];

  hashtag = injectParams('hashtag');

  // articles = computedFrom(
  //   [this.hashtag],
  //   pipe(
  //     switchMap(([ hashtag ]) => this.articleService.findAllByHashtag(hashtag)),
  //     startWith([]),
  //   ),
  // );

}
