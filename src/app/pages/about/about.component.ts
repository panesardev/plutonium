import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOCIAL } from '../../app.constants';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent {
  social = SOCIAL;
}
