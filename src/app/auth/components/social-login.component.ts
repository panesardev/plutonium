import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'social-login',
  standalone: true,
  imports: [],
  template: `
    <button (click)="googleLogin()">Google Login</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLoginComponent {
  private auth = inject(AuthService);

  googleLogin() {
    this.auth.oAuthLogin('google');
  }

}
