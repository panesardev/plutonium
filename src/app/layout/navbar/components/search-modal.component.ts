import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticleService } from '@app/domains/articles/article.service';
import { ModalService } from '@app/layout/modal/modal.service';
import { distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-modal',
  imports: [
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  template: `
    <div class="bg-white rounded-xl max-w-2xl mx-auto p-6 pb-8 md:p-8">
      <div class="flex justify-between items-center gap-6 mb-6">
        <h1 class="text-primary font-bold text-xl">Search articles</h1>
        <button class="bg-red-100/50 text-red-500 p-2" (click)="modal.close()">
          <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
        </button>
      </div>

      <div class="input-field mb-4">
        <input type="text" name="text" [formControl]="textControl" id="text" class="peer" placeholder=" " autocomplete="off"/>
        <label for="text" class="peer-focus:text-primary peer-focus:top-1 peer-focus:left-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          <span>Start typing</span>
        </label>
      </div>

      @if (text$ | async; as text) {
        <p class="text-center mb-4">Displaying results for "{{ text }}"</p>
      }
      @else {
        <p class="text-center mb-4">Start typing to search</p>
      }
      
      <div class="h-96 overflow-y-scroll">
        @for (article of articles$ | async; track article.slug) {
          <div routerLink="/articles/{{ article.slug }}" (click)="modal.close()" class="bg-secondary/75 hover:bg-secondary-hover border-[1px] border-secondary px-4 md:px-6 py-3 md:py-4 mb-2 rounded-md cursor-pointer">
            <p class="font-bold text-base md:text-lg text-primary">{{ article.title }}</p>
            <p class="text-sm md:text-base">{{ article.description }}</p>
          </div>
        }
        @empty {
          <p class="text-center mb-4">Empty list!</p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent {
  private articleService = inject(ArticleService);
  readonly modal = inject(ModalService);

  textControl = new FormControl<string>('');

  text$ = this.textControl.valueChanges.pipe(
    distinctUntilChanged(),
    map(text => text.toLowerCase()),
  );

  articles$ = this.text$.pipe(
    switchMap(text => 
      this.articleService.articles$.pipe(
        map(articles => articles.filter(article => {
          if (text) {
            const searchIn = [article.title, article.description, ...article.hashtags];
            return searchIn.some(v => v.includes(text));
          }
          return false;
        })),
      ),
    ),
  );

}
