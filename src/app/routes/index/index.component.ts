import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AsyncPipe,
    FeaturedArticleComponent,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {
  readonly auth = inject(AuthService);
  readonly content = inject(ContentService);
}
