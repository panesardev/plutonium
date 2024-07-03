import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hashtag-list',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="flex justify-center gap-4 flex-wrap">
      @for (hashtag of hashtags(); track hashtag) {
        <a routerLink="/hashtags/{{ hashtag }}" class="text-primary hover:underline">#{{ hashtag }}</a>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HashtagListComponent {
  hashtags = input.required<string[]>();
}