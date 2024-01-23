import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HashtagListComponent } from '../../layout/components/hashtag-list.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [
    AsyncPipe,
    HashtagListComponent,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagsComponent {
  readonly content = inject(ContentService);
}
