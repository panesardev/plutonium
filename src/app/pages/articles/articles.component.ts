import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '@app/domains/articles/article.interface';
import { ArticleListComponent } from '@app/domains/articles/components/article-list.component';

@Component({
  selector: 'app-articles',
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesComponent {
  articles = input.required<Article[]>();
}
