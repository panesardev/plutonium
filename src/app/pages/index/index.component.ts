import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeaturedComponent } from './components/featured.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleService } from '@app/domains/articles/article.service';
import { FEATURED_ARTICLE_SLUG } from '@app/app.constants';

@Component({
    selector: 'app-index',
    imports: [
        FeaturedComponent,
        AsyncPipe,
        RouterLink,
    ],
    templateUrl: './index.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  private articleService = inject(ArticleService);

  featured$ = this.articleService.findBySlug(FEATURED_ARTICLE_SLUG);
}
