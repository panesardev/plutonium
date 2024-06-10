import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hashtag-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      hashtag-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HashtagListComponent {

}
