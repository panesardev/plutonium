import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { injectParams } from 'ngxtension/inject-params';
import { ArticleListComponent } from '../../../layout/components/article-list.component';
import { ArticleService } from '../../../services/article.service';

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

  private articleService = inject(ArticleService);
  hashtag = injectParams('hashtag');

  articles = computedAsync(() => 
    this.articleService.findAllByHashtag(this.hashtag())
  );

}
