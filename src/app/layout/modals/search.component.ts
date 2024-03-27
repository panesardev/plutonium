import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base.modal.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    AsyncPipe,
    BaseModalComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  template: `
    <app-base-modal heading="Search articles" width="max-w-2xl">
      <div class="input mb-4">
        <span>enter title</span>
        <input type="text" [formControl]="textControl" placeholder="type here" autocomplete="off">
      </div>

      @if (text$ | async; as text) {
        <p class="text-center mb-4">Displaying results for "{{ text }}"</p>
      }
      
      <div class="h-96 overflow-y-scroll">
        @for (article of articles$ | async; track article.slug) {
          <div [routerLink]="['articles', article.slug]" (click)="modal.close()"
            class="bg-slate-100 hover:bg-base-300 px-4 md:px-6 py-3 md:py-4 mb-2 rounded cursor-pointer">
            <p class="font-bold text-lg text-primary">{{ article.title }}</p>
            <p>{{ article.description }}</p>
          </div>
        }
        @empty {
          <p class="text-center mb-4">Empty list!</p>
        }
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent extends Modal {
  private content = inject(ContentService);

  textControl = new FormControl('');

  text$ = this.textControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(text => text.toLowerCase()),
  );

  articles$ = this.text$.pipe(
    switchMap(text => this.content.search(text)),
  );
}
