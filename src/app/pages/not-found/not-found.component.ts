import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NotFoundComponent {

}
