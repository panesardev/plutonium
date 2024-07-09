import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { ArticleService } from '../../../domains/articles/article.service';
import { Modal } from '../modal.class';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'search',
  standalone: true,
  imports: [
    RouterLink,
    ModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-modal heading="Search" width="max-w-2xl">
      <fieldset class="mb-4">
        <label>enter title</label>
        <input type="text" [formControl]="textControl" placeholder="type here" autocomplete="off">
      </fieldset>

      @if (text()) {
        <p class="text-center mb-4">Displaying results for "{{ text()}}"</p>
      }
      
      <div class="h-96 overflow-y-scroll">
        @for (article of articles(); track article.slug) {
          <div [routerLink]="['articles', article.slug]" (click)="modal.close()"
            class="border-[1px] border-slate-300 hover:bg-base-100 px-4 md:px-6 py-3 md:py-4 mb-2 rounded cursor-pointer">
            <p class="font-bold text-lg text-primary">{{ article.title }}</p>
            <p>{{ article.description }}</p>
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
export class SearchComponent extends Modal {
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
          const searchIn = [
            article.title, 
            article.description, 
            ...article.hashtags
          ];
          return text ? searchIn.some(v => v.includes(text)) : false;
        })),
      )
    ),
  );

  text = derivedAsync(() => this.text$);
  articles = derivedAsync(() => this.articles$);

}
