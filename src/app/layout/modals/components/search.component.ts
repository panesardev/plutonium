import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { ArticleService } from '../../../domains/articles/article.service';
import { Modal, ModalComponent } from '../modal.component';

@Component({
  selector: 'search',
  standalone: true,
  imports: [
    ModalComponent,
  ],
  template: `
    <modal heading="Search" width="max-w-2xl">
      
    </modal>
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

}
