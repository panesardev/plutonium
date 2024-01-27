import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { ArticleListComponent } from '../../../layout/components/article-list.component';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './hashtag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagComponent {
  private content = inject(ContentService);

  hashtag = input.required<string>();
  
  articles = computedAsync(() => 
    this.content.findAllByHashtag(this.hashtag()),
  );

}
