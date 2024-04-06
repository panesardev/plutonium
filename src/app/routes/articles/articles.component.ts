import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Article } from '../../shared/types/article.interface';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { ResolveFn } from '@angular/router';
import { ContentService } from '../../shared/services/content.service';

export const ArticlesResolver: ResolveFn<Article[]> = () => {
  const content = inject(ContentService);
  return content.getArticles();
}

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
