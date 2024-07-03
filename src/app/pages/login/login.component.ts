import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../layout/modals/modal.service';
import { CreateAccountFormComponent } from './components/create-account-form.component';
import { LoginFormComponent } from './components/login-form.component';
import { ResetPasswordFormComponent } from './components/reset-password-form.component';
import { SocialLoginComponent } from './components/social-login.component';

type AuthFormType = 'LOGIN' | 'CREATE_ACCOUNT' | 'RESET_PASSWORD';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginFormComponent,
    CreateAccountFormComponent,
    ResetPasswordFormComponent,
    SocialLoginComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private router = inject(Router);
  private modal = inject(ModalService);

  type = signal<AuthFormType>('LOGIN');

  openSuccess(message: string) {
    const fn = () => import('../../layout/modals/components/success.component').then(c => c.SuccessComponent);
    this.modal.open(fn, { name: 'message', value: message });
    this.router.navigateByUrl('/dashboard');
  }

  openError(message: string) {
    const fn = () => import('../../layout/modals/components/error.component').then(c => c.ErrorComponent);
    this.modal.open(fn, { name: 'message', value: message });
  }

  setType(type: AuthFormType) {
    this.type.set(type);
  }
}
