import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticleService } from '../../domains/articles/article.service';
import { HashtagListComponent } from '../../domains/hashtags/components/hashtag-list.component';

export const HashtagsResolver: ResolveFn<string[]> = () => {
  const articleService = inject(ArticleService);
  return articleService.hashtags$;
}

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [
    HashtagListComponent,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagsComponent {
  hashtags = input.required<string[]>();
}
