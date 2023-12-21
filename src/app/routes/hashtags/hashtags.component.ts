import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HashtagListComponent } from '../../components/hashtag-list.component';
import { LoadingComponent } from '../../layout/loading.component';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { toLazySignal } from 'ngxtension/to-lazy-signal';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [
    HashtagListComponent,
    LoadingComponent,
    RouterLink,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagsComponent {

  private articleService = inject(ArticleService);

  hashtags = toLazySignal(this.articleService.findAllHashtags());

}
