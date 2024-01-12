import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hashtag-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex justify-center gap-4 flex-wrap">
      @for (hashtag of hashtags; track hashtag) {
        <button routerLink="/hashtags/{{ hashtag }}"class="btn btn-secondary btn-sm">
          {{ hashtag }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HashtagListComponent {

  @Input({ required: true }) hashtags: string[];

  // hashtags = input.required<string[]>();

}
