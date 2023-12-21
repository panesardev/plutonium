import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormData, LoginFormComponent } from '../../components/login-form.component';
import { AuthService } from '../../services/auth.service';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { OAuthProviderName } from '../../interfaces/auth';
import { RouterLink } from '@angular/router';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RouterLink,
    FallbackImageDirective,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {

  private auth = inject(AuthService);

  user = toLazySignal(this.auth.user$);
  heading = signal<string>(null);
  error = signal<string>(null);
  authError = signal<string>(null);

  setHeading(heading: string) {
    this.heading.set(heading);
  }

  async submit(formData: FormData) {
    try {
      switch (formData.type) {
        case 'LOGIN': await this.auth.login(formData.data);
          break;
        case 'SIGN_UP': await this.auth.signUp(formData.data);
          break;
        case 'RESET_PASSWORD': await this.auth.resetPassword(formData.data);
          break;
      }
    } catch (e) {
      this.error.set(e.message);
    }
  }

  
  async socialLogin(providerName: OAuthProviderName): Promise<void> {
    await this.auth.socialLogin(providerName)
      .catch(e => this.authError.set(e.message));
  }

}
