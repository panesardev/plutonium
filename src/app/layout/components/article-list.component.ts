import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../types/article.interface';
import { HashtagListComponent } from './hashtag-list.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    RouterLink,
    HashtagListComponent,
    NgOptimizedImage,
  ],
  template: `
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-8 lg:gap-10">
      @for (article of articles(); track article.slug) {
        <div class="bg-neutral rounded-lg custom-shadow">
          <a routerLink="/articles/{{ article.slug }}">
            <img ngSrc="/content/{{ article.slug }}/img/cover.png" class="rounded-lg" [alt]="article.title" width="400" height="225" [priority]="$index === 0">
          </a>
          <div class="p-4 md:p-6">
            <h1 class="text-lg font-bold mb-2" routerLink="/articles/{{ article.slug }}">{{ article.title }}</h1>
            <p class="mb-4" routerLink="/articles/{{ article.slug }}">{{ article.description }}</p>
            <div class="inline-block mb-6">
              <app-hashtag-list [hashtags]="article.hashtags"></app-hashtag-list>
            </div>
            <button class="btn primary w-full" routerLink="/articles/{{ article.slug }}">Read more</button>
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
