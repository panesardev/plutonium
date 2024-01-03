import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ArticleService } from '../../services/article.service';
import { AsyncPipe } from '@angular/common';

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

  featured$ = this.articleService.featured$;
  articles$ = this.articleService.articles$;

}
