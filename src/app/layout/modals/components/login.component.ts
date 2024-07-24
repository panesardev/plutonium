import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { CreateAccountFormComponent } from '../../../auth/components/create-account-form.component';
import { LoginFormComponent } from '../../../auth/components/login-form.component';
import { ResetPasswordFormComponent } from '../../../auth/components/reset-password-form.component';
import { SocialLoginComponent } from '../../../auth/components/social-login.component';
import { ModalComponent } from '../modal.component';
import { Modal } from '../modal.class';

type AuthFormType = 'LOGIN' | 'CREATE_ACCOUNT' | 'RESET_PASSWORD';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    LoginFormComponent,
    CreateAccountFormComponent,
    ResetPasswordFormComponent,
    SocialLoginComponent,
    ModalComponent,
  ],
  template: `
    <app-modal heading="Login">
      <div class="grid md:grid-cols-2 max-w-4xl gap-6 md:gap-10 mx-auto">
        <div class="bg-white rounded-lg p-6 md:p-10">
          @switch (type()) {
            @case ('LOGIN') {
              <app-login-form (success)="openSuccess($event)" (error)="openError($event)"/>
            }
            @case ('CREATE_ACCOUNT') {
              <app-create-account-form (success)="openSuccess($event)" (error)="openError($event)"/>
            }
            @case ('RESET_PASSWORD') {
              <app-reset-password-form (success)="openSuccess($event)" (error)="openError($event)"/>
            }
          }
          <div class="pt-6">
            @switch (type()) {
              @case ('LOGIN') {
                <div class="flex justify-center items-center gap-6">
                  <a (click)="setType('CREATE_ACCOUNT')" class="text-orange-500 hover:underline cursor-pointer">New account</a>
                  <a (click)="setType('RESET_PASSWORD')" class="text-orange-500 hover:underline cursor-pointer">Forget password</a>
                </div>
              }
              @case ('CREATE_ACCOUNT') {
                <div class="flex justify-center items-center gap-6">
                  <a (click)="setType('LOGIN')" class="text-orange-500 hover:underline cursor-pointer">Login instead</a>
                  <a (click)="setType('RESET_PASSWORD')" class="text-orange-500 hover:underline cursor-pointer">Forget password</a>
                </div>
              }
              @case ('RESET_PASSWORD') {
                <div class="flex justify-center items-center gap-6">
                  <a (click)="setType('LOGIN')" class="text-orange-500 hover:underline cursor-pointer">Login instead</a>
                  <a (click)="setType('CREATE_ACCOUNT')" class="text-orange-500 hover:underline cursor-pointer">New account</a>
                </div>
              }
            }
          </div>
        </div>
        <div class="bg-white rounded-lg h-fit p-6 md:p-10">
          <app-social-login (success)="openSuccess($event)" (error)="openError($event)"/>
        </div>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends Modal {
  private router = inject(Router);

  type = signal<AuthFormType>('LOGIN');

  openSuccess(message: string) {
    const fn = () => import('./success.component').then(c => c.SuccessComponent);
    this.modal.open(fn, { name: 'message', value: message });
    this.router.navigateByUrl('/dashboard');
  }

  openError(message: string) {
    const fn = () => import('./error.component').then(c => c.ErrorComponent);
    this.modal.open(fn, { name: 'message', value: message });
  }

  setType(type: AuthFormType) {
    this.type.set(type);
  }
}
