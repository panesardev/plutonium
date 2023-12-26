import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { ArticleListComponent } from '../../../components/article-list.component';
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

  articles = toLazySignal(
    this.articleService.findAllByHashtag(this.hashtag())
  );
  
}
