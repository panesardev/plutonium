import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { injectParams } from 'ngxtension/inject-params';
import { switchMap } from 'rxjs';
import { ArticleListComponent } from '../../../components/article-list.component';
import { LoadingComponent } from '../../../layout/loading.component';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [
    ArticleListComponent,
    LoadingComponent,
  ],
  templateUrl: './hashtag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagComponent {

  private articleService = inject(ArticleService);

  readonly hashtag = injectParams('hashtag');

  articles = computedFrom(
    [this.hashtag],
    switchMap(([hashtag]) => this.articleService.findAllByHashtag(hashtag)),
    { initialValue: null }
  );
  
}
