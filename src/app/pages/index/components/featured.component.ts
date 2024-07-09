import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../domain/articles/article.interface';
import { ErrorImageDirective } from '../../../shared/error-image.directive';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ErrorImageDirective,
  ],
  template: `
    <div class="grid md:grid-cols-[2fr_3fr] gap-6 md:gap-8">
      <div class="cursor-pointer" routerLink="/articles/{{ article().slug }}">
        <img ngSrc="/articles/{{ article().slug }}/img/cover.webp" class="rounded-lg" [alt]="article().title" width="800" height="450" priority>
      </div>
      <div>
        <h1 class="font-bold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-teal-500 mb-2 pb-2">
          {{ article().title }}
        </h1>
        <p class="text-lg mb-2">{{ article().description }}</p>
        <div class="flex items-center gap-4 mb-4">
          <img [src]="article().authorImage" onError="/icons/user.png" class="rounded-full w-8" alt="user" height="30" width="30">
          <span>By <a target="_blank" rel="noopener" rel="noreferrer" [href]="article().authorLink">{{ article().authorName }}</a></span>
        </div>
        <button class="w-full md:w-fit" routerLink="/articles/{{ article().slug }}">
          <span>Read more</span>
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedComponent {
  article = input.required<Article>();
}