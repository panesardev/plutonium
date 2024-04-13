import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ContentService } from '../../services/content.service';
import { AsyncPipe } from '@angular/common';

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
  private content = inject(ContentService);

  featured$ = this.content.getFeatured();
}
