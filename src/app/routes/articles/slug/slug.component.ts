import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { HashtagListComponent } from '../../../components/hashtag-list.component';
import { RenderMarkdownComponent } from '../../../components/render-markdown.component';
import { SaveButtonComponent } from '../../../components/save-button.component';
import { Toc } from '../../../interfaces/article';
import { LoadingComponent } from '../../../layout/loading.component';
import { ArticleService } from '../../../services/article.service';
import { PlatformService } from '../../../services/platform.service';
import { FallbackImageDirective } from '../../../utilities/fallback.image.directive';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SlugComponent {

  private articleService = inject(ArticleService);
  private platform = inject(PlatformService);
  private slug = injectParams('slug');

  article = toLazySignal(
    this.articleService.findBySlug(this.slug())
  );

  tocs = signal<Toc[]>([]);

  scroll(id: string): void {
    this.platform.document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', 
    });
  }
  
}
