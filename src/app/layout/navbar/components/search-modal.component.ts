import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticleService } from '@app/domains/articles/article.service';
import { ModalComponent } from '@app/layout/modal/modal.component';
import { Modal } from '@app/layout/modal/modal.interface';
import { distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    ModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-modal heading="Search articles" width="max-w-2xl">
      <fieldset class="mb-4">
        <input type="text" [formControl]="textControl" placeholder="start typing" autocomplete="off">
      </fieldset>

      @if (text$ | async; as text) {
        <p class="text-center mb-4">Displaying results for "{{ text }}"</p>
      }
      @else {
        <p class="text-center mb-4">Start typing to search</p>
      }
      
      <div class="h-96 overflow-y-scroll">
        @for (article of articles$ | async; track article.slug) {
          <div routerLink="/articles/{{ article.slug }}" (click)="modal.close()" class="bg-secondary-1/75 hover:bg-secondary-2 border-2 border-secondary-2 px-4 md:px-6 py-3 md:py-4 mb-2 rounded-md cursor-pointer">
            <p class="font-bold text-base md:text-lg text-primary">{{ article.title }}</p>
            <p class="text-sm md:text-base">{{ article.description }}</p>
          </div>
        }
        @empty {
          <p class="text-center mb-4">Empty list!</p>
        }
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent extends Modal {
  private articleService = inject(ArticleService);

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
