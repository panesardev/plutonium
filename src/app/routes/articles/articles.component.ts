import { ChangeDetectionStrategy, Component, inject, Input as RouteInput } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { ArticleListComponent } from '../../components/article-list.component';
import { FeaturedArticleComponent } from '../../components/featured-article.component';
import { LoadingComponent } from '../../layout/loading.component';
import { ArticleService } from '../../services/article.service';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Article } from '../../interfaces/article';

export const prefetchArticles: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  return inject(ArticleService).articles$;
}

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

  @RouteInput() articles: Article[];

}
