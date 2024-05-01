import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HashtagListComponent } from '../../domains/hashtags/components/hashtag-list.component';

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
