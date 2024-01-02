import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { ArticleListComponent } from '../../../components/article-list.component';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [
    ArticleListComponent,
    AsyncPipe,
  ],
  templateUrl: './hashtag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagComponent {

  private articleService = inject(ArticleService);

  hashtag = injectParams('hashtag');

  // articles = computedFrom(
  //   [this.hashtag],
  //   pipe(
  //     switchMap(([ hashtag ]) => this.articleService.findAllByHashtag(hashtag)),
  //     startWith([]),
  //   ),
  // );

  articles$ = this.articleService.findAllByHashtag(this.hashtag());

}
