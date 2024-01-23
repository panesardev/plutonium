import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computedAsync } from 'ngxtension/computed-async';
import { HashtagListComponent } from '../../layout/components/hashtag-list.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [
    HashtagListComponent,
    RouterLink,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagsComponent {

  private content = inject(ContentService);

  hashtags = computedAsync(() => this.content.hashtags$);

}
