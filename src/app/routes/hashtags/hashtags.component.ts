import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HashtagListComponent } from '../../layout/components/hashtag-list.component';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [
    HashtagListComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagsComponent {

  private articleService = inject(ArticleService);

  hashtags$ = this.articleService.hashtags$;

}
