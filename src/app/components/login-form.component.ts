import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthData } from '../interfaces/auth';

export type FormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export interface FormData {
  data: AuthData;
  type: FormType;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
  ],
  template: `
    <form (ngSubmit)="submit()" class="grid gap-5">
      @if (formState(); as formState) {
        @if (isSignUpForm()) {
          <div class="input">
            <label for="email">Enter full name</label>
            <input type="text" name="displayName" [(ngModel)]="formState.data.displayName" placeholder="John Wick">
          </div>
        }
        <div class="input">
          <label for="email">Enter email</label>
          <input type="email" name="email" [(ngModel)]="formState.data.email" placeholder="john.wick@example.com">
        </div>
        @if (isLoginForm() || isSignUpForm()) {
          <div class="input">
            <label for="email">Enter password</label>
            <input type="password" name="password" [(ngModel)]="formState.data.password" placeholder="password">
          </div>
        }

        <div class="text-center">
          @if (!isSignUpForm()) {
            <a (click)="setFormType('SIGN_UP')">Create new Account</a>
          }
          @if (isResetPasswordForm()) {
            <span>&nbsp; • &nbsp;</span>
          }
          @if (!isLoginForm()) {
            <a (click)="setFormType('LOGIN')">Already have an account?</a>
          }
          @if (!isResetPasswordForm()) {
            <span>&nbsp; • &nbsp;</span>
          }
          @if (!isResetPasswordForm()) {
            <a (click)="setFormType('RESET_PASSWORD')">Forgot password?</a>
          }
        </div>

        <button type="submit" class="btn btn-primary">
          <span>{{ heading() }}</span>
        </button>
      }
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  @Output() onSubmit = new EventEmitter<FormData>();
  @Output() onHeadingChange = new EventEmitter<string>();

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

  constructor() {
    effect(() => this.onHeadingChange.emit(this.heading()), { allowSignalWrites: true });
  }

  setFormType(type: FormType) {
    this.formState.update(value => {
      return { ...value, type };
    });
  }

  submit() {
    this.onSubmit.emit(this.formState());
  }

}
