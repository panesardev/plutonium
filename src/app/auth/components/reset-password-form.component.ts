import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-6">
        <h1 class="bg-gradient-to-br from-primary to-teal-500 text-3xl font-bold bg-clip-text text-center text-transparent">Reset Password</h1>
      </div>
      <fieldset class="mb-4">
        <label>enter email <span class="text-red-500">*</span></label>
        <input type="email" name="email" formControlName="email" placeholder="john.wick123@example.com">
      </fieldset>
      <div class="grid">
        <button [disabled]="form.invalid">Send Link</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent {
  private auth = inject(AuthService);

  success = output<string>();
  error = output<string>();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  async submit() {
    if (this.form.valid) {
      await this.auth.resetPassword(this.form.value.email)
        .then(() => this.success.emit('Password reset link has been sent!'))
        .catch(e => this.error.emit(e.message));
    }
  }
}
