import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computedAsync } from 'ngxtension/computed-async';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FeaturedArticleComponent,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {

  private auth = inject(AuthService);
  private content = inject(ContentService);

  user = computedAsync(() => this.auth.user$);
  featured = computedAsync(() => this.content.featured$);

}
