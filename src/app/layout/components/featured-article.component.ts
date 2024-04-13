import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../types/article.interface';
import { HashtagListComponent } from './hashtag-list.component';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';

@Component({
  selector: 'app-featured-article',
  standalone: true,
  imports: [
    RouterLink,
    HashtagListComponent,
    NgOptimizedImage,
    FallbackImageDirective,
  ],
  template: `
    <div class="grid md:grid-cols-[2fr_3fr] gap-6 md:gap-8">
      <div class="cursor-pointer" routerLink="/articles/{{ article().slug }}">
        <img ngSrc="/content/{{ article().slug }}/img/cover_800x450.webp" class="rounded-lg" [alt]="article().title" width="800" height="450" priority>
      </div>
      <div class="md:pt-4">
        <h1 class="font-bold text-2xl md:text-3xl text-gradient bg-gradient-to-br from-primary to-teal-500 mb-2 pb-2">
          {{ article().title }}
        </h1>
        <p class="text-lg mb-2">{{ article().description }}</p>
        <div class="flex items-center gap-4 mb-6">
          <img [src]="article().authorImage" class="rounded-full w-8" fallbackImage="assets/img/user.png" alt="user" height="30" width="30" fallbackImage="/assets/img/user.png">
          <span>By <a target="_blank" rel="noopener" rel="noreferrer" [href]="article().authorLink">{{ article().authorName }}</a></span>
        </div>
        <div class="bg-neutral flex items-center rounded-xl md:rounded-full w-fit p-4 gap-6 custom-shadow">
          <button class="btn primary w-full md:w-fit" routerLink="/articles/{{ article().slug }}">
            <span>Read more</span>
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg>
          </button>
          <app-hashtag-list [hashtags]="article().hashtags"/>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedArticleComponent {
  article = input.required<Article>();
}
