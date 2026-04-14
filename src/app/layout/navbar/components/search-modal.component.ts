import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticleService } from '@app/domains/articles/article.service';
import { ModalService } from '@app/layout/modal/modal.service';
import { AutoFocusDirective } from '@app/shared/directives/auto-focus.directive';
import { distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-modal',
  imports: [  
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    AutoFocusDirective,
  ],
  template: `
    <div class="bg-white rounded-xl max-w-2xl mx-auto p-6 pb-8 md:p-8">
      <div class="flex justify-between items-center gap-6 mb-6">
        <h1 class="text-primary font-bold text-xl">Search articles</h1>
        <button class="bg-red-100/50 text-red-500 p-2" (click)="modal.close()">
          <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
        </button>
      </div>

      <input appAutoFocus type="text" name="text" [formControl]="textControl" id="text" placeholder="Type here" autocomplete="off" autofocus
        class="bg-secondary/80 hover:bg-secondary text-primary w-full px-5 py-3 rounded-full outline-none mb-4" />

      <div class="h-96 overflow-y-scroll">
        @for (article of articles$ | async; track article.slug) {
          <div routerLink="/articles/{{ article.slug }}" (click)="modal.close()" class="hover:bg-secondary/75 border-[1px] border-slate-300 flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 md:py-4 mb-2 rounded-xl cursor-pointer">
            <img class="size-16 object-cover rounded-full" src="/articles/{{ article.slug }}/img/cover.png" alt="img">
            <div>
              <p class="font-bold text-base md:text-lg text-primary">{{ article.title }}</p>
              <p class="text-sm md:text-base">{{ article.description }}</p>
            </div>
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

  input = viewChild<ElementRef<HTMLInputElement>>('input');

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
