import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ResolveFn } from '@angular/router';
import { Article } from '../../domains/articles/article.interface';
import { ArticleListComponent } from '../../domains/articles/components/article-list.component';
import { ArticleService } from '../../domains/articles/article.service';

export const ArticlesResolver: ResolveFn<Article[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.articles$;
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
