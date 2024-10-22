import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '../article.interface';
import { FallbackImageDirective } from '@app/shared/directives/fallback-image.directive';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [FallbackImageDirective],
  template: `
    <div class="flex flex-col md:flex-row md:items-center justify-center gap-4 md:gap-5">
      <div class="flex items-center gap-3 md:gap-4">
        <img [src]="article().authorImage" class="w-8 rounded-full" fallback="/icons/user.png" [alt]="article().authorName">
        <span>By <a class="text-primary hover:underline" target="_blank" rel="noopener" rel="noreferrer" itemprop="author" [name]="article().authorName" [href]="article().authorLink">{{ article().authorName }}</a></span>
      </div>
      <div class="hidden md:block select-none">•</div>
      <div itemprop="datePublished">Posted on {{ article().createdAt }}</div>
      <div class="hidden md:block select-none">•</div>
      <div>
        <a class="text-primary underline" [href]="article().source" target="_blank">source</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleHeaderComponent {
  article = input.required<Article>();
}
