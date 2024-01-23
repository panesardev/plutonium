import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Article } from '../../types/article.interface';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    BaseModalComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  template: `
    <app-base-modal width="max-w-4xl">
      <button class="btn btn-sm btn-error float-right" (click)="modal.close()">
        <i class="close-icon"></i>
      </button> 

      <h1 class="font-bold text-2xl text-primary mb-6">Search articles</h1>

      <input type="text" name="search" [formControl]="searchControl" placeholder="start typing" autocomplete="off"
        class="bg-base-200 text-primary text-lg placeholder:text-slate-600 w-full px-5 py-2 mb-4 rounded-full">

      @if (search$ | async; as search) {
        <p class="text-sm lg:text-md text-center mb-4">Displaying results for "{{ search }}"</p>
      }
      
      <div class="h-96 overflow-y-scroll">
        @for (article of articles$ | async; track article.slug) {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent extends Modal {
  private content = inject(ContentService);

  searchControl = new FormControl('');

  search$ = this.searchControl.valueChanges;

  articles$ = this.search$.pipe(
    switchMap(search => 
      this.content.articles$.pipe(
        map(articles => articles.filter(a => searchFn(search, a))),
      ),
    ),
  );
  
}

function searchFn(search: string, article: Article): boolean {
  if (search === '') return false;
  return article.title.includes(search) ||
    article.description.includes(search) ||
    article.hashtags.includes(search);
}
