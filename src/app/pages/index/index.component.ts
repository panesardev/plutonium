import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'index',
  standalone: true,
  imports: [
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IndexComponent {

}
