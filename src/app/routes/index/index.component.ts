import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { FeaturedArticleComponent } from '../../components/featured-article.component';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FeaturedArticleComponent,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {

  private auth = inject(AuthService);
  private articleService = inject(ArticleService);

  user = toLazySignal(this.auth.user$);
  featuredArticle = toLazySignal(this.articleService.featured$);

}
