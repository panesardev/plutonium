import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn, RouterLink } from '@angular/router';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { HomeUserCardComponent } from '../../layout/deferred/home-user-card.component';
import { ContentService } from '../../services/content.service';
import { Article } from '../../types/article.interface';
import { combineLatestObject } from '../../utilities/custom.operators';

interface IndexView {
  featured: Article;
  recent: Article[];
}

export const indexViewResolver: ResolveFn<IndexView> = () => {
  const content = inject(ContentService);
  return combineLatestObject({ 
    featured: content.featured$,
    recent: content.findRecent(3),
  });
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    ArticleListComponent,
    FeaturedArticleComponent,
    HomeUserCardComponent,
    NgTemplateOutlet,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {
  view = input.required<IndexView>();
}
