import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleListComponent } from '../../../../domain/articles/components/article-list.component';
import { Article } from '../../../../domain/articles/article.interface';

@Component({
  selector: 'app-hashtag',
  standalone: true,
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