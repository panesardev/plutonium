import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { computedFrom } from 'ngxtension/computed-from';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { map, switchMap } from 'rxjs';
import { Article } from '../../types/article.interface';
import { Modal } from '../../types/modal.class';
import { ArticleService } from '../../services/article.service';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    RouterLink,
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal width="max-w-4xl">
      <button class="btn btn-sm btn-error float-right" (click)="modal.close()">
        <i class="close-icon"></i>
      </button> 

      <h1 class="font-bold text-2xl text-primary mb-6">Search articles</h1>

      <form [formGroup]="searchForm">
        <input type="text" name="search" formControlName="search" placeholder="start typing"
        class="bg-base-200 text-primary text-lg placeholder:text-slate-600 w-full px-5 py-2 mb-4 rounded-full">
      </form>

      <p class="text-sm md:text-md mb-4">Displaying results for "{{ query() }}"</p>
      <div class="h-96 overflow-y-scroll">
        @for (article of articles(); track article.slug) {
          <div routerLink="/articles/{{ article.slug }}" (click)="modal.close()"
            class="bg-slate-100 hover:bg-base-300 px-4 py-3 mb-2 rounded-md cursor-pointer">
            <p class="font-bold text-primary text-md mb-2">{{ article.title }}</p>
            <p class="text-sm">{{ article.description }}</p>
          </div>
        }
        @empty {
          <p class="text-center text-primary text-xl mb-6">Empty list!</p>
        }
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SearchModalComponent extends Modal {

  private articleService = inject(ArticleService);
  private formBuilder = inject(FormBuilder);

  searchForm = this.formBuilder.group({ search: '' });

  query = toLazySignal(
    this.searchForm.valueChanges.pipe(
      map(value => value.search),
    ),
  );

  articles = computedFrom(
    [ this.query ], 
    switchMap(([ query ]) => 
      this.articleService.articles$.pipe(
        map(articles => articles.filter(a => searchFn(a, query))),
      ), 
    ),
    { initialValue: [] as Article[] },
  );

}

function searchFn(article: Article, input: string): boolean {
  if (input === '') return false;
  return article.title.includes(input) ||
    article.description.includes(input) ||
    article.hashtags.includes(input);
}
