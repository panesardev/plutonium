import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '../article.interface';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ImageErrorDirective } from '@shared/directives/image-error.directive';
import { HashtagListComponent } from '@domains/hashtags/components/hashtag-list.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ImageErrorDirective,
    HashtagListComponent,
  ],
  template: `
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-8 lg:gap-10">
      @for (article of articles(); track article.slug) {
        <div class="bg-surface h-fit rounded-xl">
          <a routerLink="/articles/{{ article.slug }}">
            <img ngSrc="/articles/{{ article.slug }}/img/cover.webp" onError="/articles/{{ article.slug }}/img/cover.png" class="rounded-xl" [alt]="article.title" priority="{{ $index === 0 ? true : false }}" width="384" height="216">
          </a>
          <div class="p-6">
            <h1 class="text-primary text-xl font-bold mb-2">{{ article.title }}</h1>
            <p class="mb-4">{{ article.description }}</p>
            <div class="inline-block mb-6">
              <app-hashtag-list [hashtags]="article.hashtags" />
            </div>
            <button class="btn-primary w-full" routerLink="/articles/{{ article.slug }}">Read more</button>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  articles = input.required<Article[]>();
}
