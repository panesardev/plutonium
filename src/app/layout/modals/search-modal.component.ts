import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { BaseModalComponent } from './base-modal.component';
import { Modal } from './modal.class';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    BaseModalComponent,
    FormsModule,
  ],
  template: `
    <app-base-modal width="max-w-4xl">
      <button class="btn btn-sm btn-error float-right" (click)="modal.close()">
        <i class="close-icon"></i>
      </button> 
      <h1 class="font-bold text-2xl text-primary mb-6">Search articles</h1>

      <input #input type="text" name="search" [(ngModel)]="search" (ngModelChange)="this.input$.next($event)" placeholder="start typing"
        class="bg-base-200 text-primary text-lg placeholder:text-slate-600 w-full px-5 py-2 mb-4 rounded-full">

      <ng-container *ngIf="articles$ | async as articles">
        <div *ngIf="articles.length; else isEmpty">
          <p class="text-sm md:text-md mb-4">Displaying results for "{{ input$ | async }}"</p>
          <div class="h-96 overflow-y-scroll">
            <div *ngFor="let article of articles" routerLink="/articles/{{ article.slug }}" (click)="modal.close()"
              class="bg-slate-100 hover:bg-base-300 px-4 py-3 mb-2 rounded-md cursor-pointer">
              <p class="font-bold text-primary text-md mb-2">{{ article.title }}</p>
              <p class="text-sm">{{ article.description }}</p>
            </div>
          </div>
        </div>
        
        <ng-template #isEmpty>
          <p class="text-center text-primary text-xl mb-6">Empty list!</p>
        </ng-template>
      </ng-container>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent extends Modal {

  private cdr = inject(ChangeDetectorRef);
  readonly articleService = inject(ArticleService);

  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;

  input$ = new BehaviorSubject<string>(null);
  search: string;
  articles$ = this.input$.pipe(
    distinctUntilChanged(),
    debounceTime(500),
    switchMap(input => 
      this.articleService.findAll().pipe(
        map(articles => articles.filter(a => searchFn(a, input))),
        tap(() => this.cdr.detectChanges()),
      ),  
    ),
  );

  ngAfterViewInit() {
    this.inputRef.nativeElement.focus();
  }

}

function searchFn(article: Article, input: string): boolean {
  if (input === '') return false;
  return article.title.includes(input) ||
    article.description.includes(input) ||
    article.hashtags.includes(input);
}