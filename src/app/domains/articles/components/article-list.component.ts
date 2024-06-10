import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'article-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      article-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {

}
