import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleListComponent } from '@domains/articles/components/article-list.component';
import { Article } from '@domains/articles/article.interface';

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