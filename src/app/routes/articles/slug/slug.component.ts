import { AsyncPipe, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { HashtagListComponent } from '../../../layout/components/hashtag-list.component';
import { RenderMarkdownComponent } from '../../../layout/components/render-markdown.component';
import { Toc } from '../../../types/article.interface';
import { SaveButtonComponent } from '../../../layout/deferred/save-button.component';
import { ArticleService } from '../../../services/article.service';
import { FallbackImageDirective } from '../../../utilities/image.directive';

@Component({
  selector: 'app-slug',
  standalone: true,
  imports: [
    AsyncPipe,
    FallbackImageDirective,
    HashtagListComponent,
    NgOptimizedImage,
    RenderMarkdownComponent,
    RouterLink,
    SaveButtonComponent,
  ],
  templateUrl: './slug.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SlugComponent {

  private articleService = inject(ArticleService);
  private document = inject(DOCUMENT);
  private slug = injectParams('slug');

  article$ = this.articleService.findBySlug(this.slug());

  tableOfContents = signal<Toc[]>([]);

  scroll(id: string): void {
    this.document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', 
    });
  }
  
}
