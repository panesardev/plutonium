import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleService } from '../../domain/articles/article.service';
import { AsyncPipe } from '@angular/common';
import { FeaturedComponent } from './components/featured.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AsyncPipe,
    FeaturedComponent,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IndexComponent {
  private articleService = inject(ArticleService);

  featured$ = this.articleService.featured$;
}