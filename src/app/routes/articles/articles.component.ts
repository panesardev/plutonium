import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '../../domains/articles/article.interface';
import { ArticleListComponent } from '../../domains/articles/components/article-list.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    AsyncPipe,
    ArticleListComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {
  articles = input.required<Article[]>();
}
