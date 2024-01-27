import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HashtagListComponent } from '../../layout/components/hashtag-list.component';
import { ContentService } from '../../services/content.service';
import { computedAsync } from 'ngxtension/computed-async';

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
  private content = inject(ContentService);

  hashtags = computedAsync(() => this.content.hashtags$);
}
