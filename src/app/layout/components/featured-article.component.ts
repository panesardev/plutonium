import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../types/article.interface';
import { HashtagListComponent } from './hashtag-list.component';
import { FallbackImageDirective } from '../../utilities/image.directive';

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
    <div class="max-w-6xl mx-auto">
      <h1 class="inline-block text-lg md:text-xl text-primary bg-neutral px-10 py-2 mb-5 rounded-full custom-shadow select-none">
        <span>Featured</span>
      </h1>
      <div class="grid md:grid-cols-[400px_1fr] gap-5 md:gap-8 mb-10">
        <img ngSrc="/content/{{ article().slug }}/img/cover_800x450.webp" class="rounded-lg" alt="cover" width="800" height="450" priority>
        <div class="flex flex-col justify-between">
          <div>
            <h1 class="font-bold text-2xl md:text-3xl text-primary mb-5">{{ article().title }}</h1>
            <p class="text-lg md:text-xl mb-5">{{ article().description }}</p>
            <div class="flex items-center gap-3 md:gap-4 mb-5">
              <img [src]="article().authorImage" class="rounded-full w-8" fallbackImage="assets/img/user.png" alt="user" height="30" width="30" fallbackImage="/assets/img/user.png">
              <span>By <a target="_blank" rel="noopener" rel="noreferrer" [href]="article().authorLink">{{ article().authorName }}</a></span>
            </div>
            <div class="flex items-center gap-6 bg-neutral rounded-lg md:rounded-full mb-5 p-4 custom-shadow">
              <button class="btn btn-primary w-full md:w-fit" routerLink="/articles/{{ article().slug }}">
                <span>Read more</span>
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg>
              </button>
              <app-hashtag-list [hashtags]="article().hashtags"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedArticleComponent {

  article = input.required<Article>();

}
