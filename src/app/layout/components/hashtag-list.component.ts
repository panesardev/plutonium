import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hashtag-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex justify-center gap-4 flex-wrap">
      @for (hashtag of hashtags(); track hashtag) {
        <button routerLink="/hashtags/{{ hashtag }}" class="btn btn-sm bg-secondary text-primary">
          {{ hashtag }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HashtagListComponent {
  hashtags = input.required<string[]>();
}
