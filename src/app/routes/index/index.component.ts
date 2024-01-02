import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeaturedArticleComponent } from '../../layout/components/featured-article.component';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AsyncPipe,
    FeaturedArticleComponent,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {

  private auth = inject(AuthService);
  private articleService = inject(ArticleService);

  user$ = this.auth.user$;
  featuredArticle$ = this.articleService.featured$;

}
