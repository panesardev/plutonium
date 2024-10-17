import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hashtag-list',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="flex justify-center gap-3 flex-wrap">
      @for (hashtag of hashtags(); track hashtag) {
        <a routerLink="/hashtags/{{ hashtag }}" class="bg-secondary-1 hover:bg-secondary-2 text-primary text-sm capitalize rounded-full px-3 py-1">#{{ hashtag }}</a>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HashtagListComponent {
  hashtags = input.required<string[]>();
}