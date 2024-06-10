import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'create-account-form',
  standalone: true,
  imports: [],
  template: `
    <p>
      create-account-form works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountFormComponent {

}
