import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ContentService } from '../../services/content.service';
import { Article } from '../../types/article.interface';
import { view } from '../../utilities/view.operator';

interface ArticlesView {
  articles: Article[];
}

export const articlesViewResolver: ResolveFn<ArticlesView> = () => {
  const content = inject(ContentService);
  return view<ArticlesView>({
    articles: content.articles$,
  });
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {
  view = input.required<ArticlesView>();
}
