import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOCIAL } from '../../app.constants';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  social = SOCIAL;
}
