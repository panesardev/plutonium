import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HashtagListComponent } from '../../layout/components/hashtag-list.component';
import { ContentService } from '../../services/content.service';
import { view } from '../../utilities/view.operator';

interface HashtagsView {
  hashtags: string[];
}

export const hashtagsViewResolver: ResolveFn<HashtagsView> = () => {
  const content = inject(ContentService);
  return view<HashtagsView>({ hashtags: content.hashtags$ });
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
  view = input.required<HashtagsView>();
}
