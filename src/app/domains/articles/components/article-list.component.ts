import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import HashtagListComponent from '@app/domains/hashtags/components/hashtag-list.component';
import { Article } from '../article.interface';
import { ImageErrorDirective } from '@app/shared/directives/image-error.directive';

@Component({
  selector: 'app-article-list',
  imports: [
    RouterLink,
    NgOptimizedImage,
    ImageErrorDirective,    
    HashtagListComponent,
  ],
  template: `
    <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,350px))] justify-center gap-6 md:gap-8 lg:gap-10">
      @for (article of articles(); track article.slug) {
        <div class="bg-white rounded-xl secondary-shadow h-fit">
          <a routerLink="/articles/{{ article.slug }}">
            <img ngSrc="/articles/{{ article.slug }}/img/cover.webp" error="/articles/{{ article.slug }}/img/cover.png" class="rounded-xl" [alt]="article.title" priority="{{ $index === 0 ? true : false }}" width="384" height="216">
          </a>
          <div class="pt-4 px-6 pb-8">
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
export default class ArticleListComponent {
  articles = input.required<Article[]>();
}
