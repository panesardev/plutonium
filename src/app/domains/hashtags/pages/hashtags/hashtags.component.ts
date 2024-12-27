import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hashtags',
  imports: [
    RouterLink,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HashtagsComponent {
  hashtags = input.required<string[]>();
}
