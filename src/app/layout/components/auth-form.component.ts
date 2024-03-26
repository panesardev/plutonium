import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthData, FormType } from '../../types/auth.interface';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="authForm" (ngSubmit)="submitAction()">
      @if (isCreateAccountForm()) {
        <div class="input mb-3">
          <span>enter name</span>
          <input type="text" formControlName="displayName" placeholder="John Wick">
        </div>
      }
      <div class="input mb-3">
        <span>enter email</span>
        <input type="email" formControlName="email" placeholder="john.wick@example.com">
      </div>
      @if (!isResetPasswordForm()) {
        <div class="input mb-3">
          <span>enter password</span>
          <input type="password" formControlName="password" placeholder="type here">
        </div>
      }
      <div class="text-center mb-6">
        @if (!isLoginForm()) {
          <span class="text-primary hover:underline cursor-pointer" (click)="setFormType('LOGIN')">Login</span>
        }
        @if (isResetPasswordForm()) {
          <span>&nbsp; • &nbsp;</span>
        }
        @if (!isCreateAccountForm()) {
          <span class="text-primary hover:underline cursor-pointer" (click)="setFormType('CREATE_ACCOUNT')">New account</span>
        }
        @if (!isResetPasswordForm()) {
          <span>&nbsp; • &nbsp;</span>
        }
        @if (!isResetPasswordForm()) {
          <span class="text-primary hover:underline cursor-pointer" (click)="setFormType('RESET_PASSWORD')">Forgot password?</span>
        }
      </div>

      <div class="grid">
        <button type="submit" class="btn bg-primary text-base-100">
          <span>{{ heading() }}</span>
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  onSubmit = output<AuthData>();
  
  authForm = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  formType = signal<FormType>('LOGIN');
  isLoginForm = computed(() => this.formType() === 'LOGIN');
  isCreateAccountForm = computed(() => this.formType() === 'CREATE_ACCOUNT');
  isResetPasswordForm = computed(() => this.formType() === 'RESET_PASSWORD');
  
  heading = computed(() => {
    return this.isResetPasswordForm() ? 'Reset password' : 
    this.isCreateAccountForm() ? 'Create new account' : 
    this.isLoginForm() ? 'Login' : null;
  });

  submitAction() {
    this.onSubmit.emit({
      ...this.authForm.value,
      type: this.formType(),
    });
  }

  setFormType(type: FormType) {
    this.formType.set(type);
  }
}
