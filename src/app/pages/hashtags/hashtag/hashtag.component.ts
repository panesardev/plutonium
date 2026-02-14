import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleListComponent } from '@app/domains/articles/components/article-list.component';
import { Article } from '@app/domains/articles/article.interface';

@Component({
  selector: 'app-hashtag',
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './hashtag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HashtagComponent {
  hashtag = input.required<string>();
  articles = input.required<Article[]>();
}