import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HashtagListComponent } from '../../layout/components/hashtag-list.component';
import { ContentService } from '../../services/content.service';

export const HashtagsResolver: ResolveFn<string[]> = () => {
  const content = inject(ContentService);
  return content.getHashtags();
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
