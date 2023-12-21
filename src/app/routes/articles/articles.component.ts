import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { ArticleListComponent } from '../../components/article-list.component';
import { FeaturedArticleComponent } from '../../components/featured-article.component';
import { LoadingComponent } from '../../layout/loading.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    ArticleListComponent,
    FeaturedArticleComponent,
    LoadingComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {

  private articleService = inject(ArticleService);

  view = computedFrom({
    featured: this.articleService.findFeatured(),
    articles: this.articleService.findAll(),
  }, { initialValue: null });

}
