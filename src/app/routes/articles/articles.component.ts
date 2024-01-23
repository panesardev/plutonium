import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ContentService } from '../../services/content.service';
import { Article } from '../../types/article.interface';
import { view } from '../../utilities/view.operator';

interface ArticlesView {
  articles: Article[];
  featured: Article;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    AsyncPipe,
    ArticleListComponent,
    FeaturedArticleComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {
  private content = inject(ContentService);

  view$ = view<ArticlesView>({
    articles: this.content.articles$,
    featured: this.content.featured$,
  });

}
