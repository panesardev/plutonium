import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    ArticleListComponent,
    FeaturedArticleComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {

  private content = inject(ContentService);

  view = computedFrom({
    articles: this.content.articles$,
    featured: this.content.featured$,
  }, { initialValue: null });

}
