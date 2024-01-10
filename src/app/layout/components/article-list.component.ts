import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../types/article.interface';
import { HashtagListComponent } from './hashtag-list.component';

// md:grid-cols-[repeat(auto-fit,minmax(250px,350px))]

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    RouterLink,
    HashtagListComponent,
  ],
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-10 mx-auto max-w-5xl">
      @for (article of articles; track article.slug) {
        <div class="grid justify-between rounded-lg h-fit gap-4 md:gap-5 bg-neutral">
          <a routerLink="/articles/{{ article.slug }}">
            <img [src]="article.coverUrl" [loading]="'lazy'" class="rounded-lg" [alt]="article.title" width="100" height="50">
          </a>
          <div class="px-4 md:px-6 pb-4 md:pb-6">
            <h1 class="text-xl text-primary font-bold mb-2">{{ article.title }}</h1>
            <p class="mb-4">{{ article.description }}</p>
            <div class="inline-block mb-5">
              <app-hashtag-list [hashtags]="article.hashtags"></app-hashtag-list>
            </div>
            <button class="btn btn-primary w-full" routerLink="/articles/{{ article.slug }}">Read more</button>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {

  @Input({ required: true }) articles: Article[];

  // articles = input.required();

}
