import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { AuthData, OAuthProviderName } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { FallbackImageDirective } from '../../utilities/image.directive';

export type FormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export interface FormData {
  data: AuthData;
  type: FormType;
}

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
  
  formState = signal<FormData>({
    type: 'LOGIN',
    data: {
      email: '',
      password: '',
      displayName: ''
    },
  });
  
  isLoginForm = computed(() => this.formState().type === 'LOGIN');
  isSignUpForm = computed(() => this.formState().type === 'SIGN_UP');
  isResetPasswordForm = computed(() => this.formState().type === 'RESET_PASSWORD');
  heading = computed(() => {
    return this.formState().type === 'RESET_PASSWORD' ? 'Reset password' :
      this.formState().type === 'SIGN_UP' ? 'Create new account' : 
      this.formState().type === 'LOGIN' ? 'Login' : null;
  });

  async submit() {
    try {
      switch (this.formState().type) {
        case 'LOGIN': await this.auth.login(this.formState().data);
          break;
        case 'SIGN_UP': await this.auth.signUp(this.formState().data);
          break;
        case 'RESET_PASSWORD': await this.auth.resetPassword(this.formState().data);
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

  setFormType(type: FormType) {
    this.formState.update(value => {
      return { ...value, type };
    });
  }
}
