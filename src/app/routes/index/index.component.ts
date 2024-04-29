import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FeaturedArticleComponent } from '../../domains/articles/components/featured-article.component';
import { ArticleService } from '../../domains/articles/article.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    FeaturedArticleComponent,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {
  private articleService = inject(ArticleService);

  featured$ = this.articleService.featured$;
}
