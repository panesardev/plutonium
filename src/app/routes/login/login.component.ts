import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { LoginFormState, LoginFormType, OAuthProviderName } from '../../types/auth.interface';
import { AuthService } from '../../services/auth.service';
import { FallbackImageDirective } from '../../utilities/image.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FallbackImageDirective,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {

  private auth = inject(AuthService);

  user = toLazySignal(this.auth.user$);
  error = signal<string>(null);
  authError = signal<string>(null);
  
  state = signal<LoginFormState>({
    type: 'LOGIN',
    credentials: {
      email: '',
      password: '',
      displayName: ''
    },
  });
  
  isLoginForm = computed(() => this.state().type === 'LOGIN');
  isSignUpForm = computed(() => this.state().type === 'SIGN_UP');
  isResetPasswordForm = computed(() => this.state().type === 'RESET_PASSWORD');
  
  heading = computed(() => {
    return this.state().type === 'RESET_PASSWORD' ? 'Reset password' :
      this.state().type === 'SIGN_UP' ? 'Create new account' : 
      this.state().type === 'LOGIN' ? 'Login' : null;
  });

  async submit() {
    try {
      switch (this.state().type) {
        case 'LOGIN': 
          await this.auth.login(this.state().credentials);
          break;
        case 'SIGN_UP': 
          await this.auth.signUp(this.state().credentials);
          break;
        case 'RESET_PASSWORD': 
          await this.auth.resetPassword(this.state().credentials);
          break;
      }
    } catch (e) {
      this.error.set(e.message);
    }
  }
  
  async socialLogin(providerName: OAuthProviderName): Promise<void> {
    await this.auth.socialLogin(providerName).catch(e => this.authError.set(e.message));
  }

  setFormType(type: LoginFormType) {
    this.state.update(value => {
      return { ...value, type };
    });
  }
}
