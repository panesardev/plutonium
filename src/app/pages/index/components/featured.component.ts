import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '@domains/articles/article.interface';
import { ImageErrorDirective } from '@shared/directives/image-error.directive';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ImageErrorDirective,
  ],
  template: `
    <div class="grid md:grid-cols-[2fr_3fr] gap-6 md:gap-8 cursor-pointer" routerLink="/articles/{{ article().slug }}">
      <img ngSrc="/articles/{{ article().slug }}/img/cover.webp" class="rounded-xl" [alt]="article().title" width="691" height="388" priority>
      <div>
        <h1 class="font-bold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-teal-500 mb-2 pb-2">{{ article().title }}</h1>
        <p class="text-lg mb-2">{{ article().description }}</p>
        <div class="flex items-center gap-4 mb-4">
          <img [src]="article().authorImage" onError="/icons/user.png" class="rounded-full w-8" alt="user" height="30" width="30">
          <span>By <a target="_blank" rel="noopener" rel="noreferrer" [href]="article().authorLink">{{ article().authorName }}</a></span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedComponent {
  article = input.required<Article>();
}