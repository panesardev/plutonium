import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    ArticleListComponent,
    AsyncPipe,
    FeaturedArticleComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {

  private articleService = inject(ArticleService);

  view = computedFrom({
    articles: this.articleService.articles$,
    featured: this.articleService.featured$,
  }, { initialValue: null });

}
