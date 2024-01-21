import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ArticleService } from '../../services/article.service';
import { computedAsync } from 'ngxtension/computed-async';
import { computedFrom } from 'ngxtension/computed-from';

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

  articles$ = this.articleService.articles$;
  featured$ = this.articleService.featured$;

  articles = computedAsync(() => this.articles$);
  featured = computedAsync(() => this.featured$);

  view = computedFrom({
    articles: this.articles,
    featured: this.featured,
  });

}
