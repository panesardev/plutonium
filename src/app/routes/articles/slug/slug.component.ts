import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input as RouteInput, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { HashtagListComponent } from '../../../components/hashtag-list.component';
import { RenderMarkdownComponent } from '../../../components/render-markdown.component';
import { SaveButtonComponent } from '../../../components/save-button.component';
import { Article, Toc } from '../../../interfaces/article';
import { LoadingComponent } from '../../../layout/loading.component';
import { ArticleService } from '../../../services/article.service';
import { FallbackImageDirective } from '../../../utilities/fallback.image.directive';

export const prefetchArticleBySlug: ResolveFn<Article> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  return inject(ArticleService).findBySlug(slug);
}

@Component({
  selector: 'app-slug',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HashtagListComponent,
    SaveButtonComponent,
    FallbackImageDirective,
    LoadingComponent,
    RouterLink,
    RenderMarkdownComponent,
  ],
  templateUrl: './slug.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SlugComponent {

  private document = inject(DOCUMENT);

  @RouteInput() article: Article;

  tableOfContents = signal<Toc[]>(null);

  scroll(id: string): void {
    this.document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', 
    });
  }
  
}
