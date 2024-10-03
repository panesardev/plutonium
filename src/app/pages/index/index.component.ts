import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeaturedComponent } from './components/featured.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleService } from '@app/domains/articles/article.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FeaturedComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
  private articleService = inject(ArticleService);

  featured$ = this.articleService.featured$;
}
