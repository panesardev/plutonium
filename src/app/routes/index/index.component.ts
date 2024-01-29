import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn, RouterLink } from '@angular/router';
import { computedAsync } from 'ngxtension/computed-async';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';
import { Article } from '../../types/article.interface';
import { view } from '../../utilities/view.operator';

interface IndexView {
  featured: Article;
}

export const indexViewResolver: ResolveFn<IndexView> = () => {
  const content = inject(ContentService);
  return view({ featured: content.featured$ });
}

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

  view = input.required<IndexView>();

  user = computedAsync(() => this.auth.user$);
}
