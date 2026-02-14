import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hashtag-list',
  imports: [
    RouterLink,
  ],
  template: `
    <div class="flex justify-center gap-3 flex-wrap">
      @for (hashtag of hashtags(); track hashtag) {
        <a routerLink="/hashtags/{{ hashtag }}" class="bg-secondary hover:bg-secondary-hover text-primary text-sm rounded-full px-3 py-1">#{{ hashtag }}</a>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HashtagListComponent {
  hashtags = input.required<string[]>();
}