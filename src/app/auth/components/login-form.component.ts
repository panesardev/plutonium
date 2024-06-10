import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [],
  template: `
    <p>
      login-form works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

}
