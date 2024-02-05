import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn, RouterLink } from '@angular/router';
import { computedAsync } from 'ngxtension/computed-async';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';
import { Article } from '../../types/article.interface';
import { view } from '../../utilities/view.operator';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { NgTemplateOutlet } from '@angular/common';

interface IndexView {
  featured: Article;
  recent: Article[];
}

export const indexViewResolver: ResolveFn<IndexView> = () => {
  const content = inject(ContentService);
  return view<IndexView>({ 
    featured: content.featured$,
    recent: content.findRecent(3),
  });
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FeaturedArticleComponent,
    ArticleListComponent,
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
