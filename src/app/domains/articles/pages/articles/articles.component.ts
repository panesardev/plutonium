import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleListComponent } from '../../components/article-list.component';
import { Article } from '../../article.interface';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesComponent {
  articles = input.required<Article[]>();
}
