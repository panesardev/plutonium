import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-6">
        <h1 class="bg-gradient-to-br from-primary to-teal-500 text-3xl font-bold bg-clip-text text-center text-transparent">Using email</h1>
      </div>
      <fieldset class="mb-4">
        <label>enter email <span class="text-red-500">*</span></label>
        <input type="email" name="email" formControlName="email" placeholder="john.wick123@example.com">
      </fieldset>
      <fieldset class="mb-8">
        <label>enter password <span class="text-red-500">*</span></label>
        <input type="password" name="password" formControlName="password" placeholder="password">
      </fieldset>
      <div class="grid">
        <button [disabled]="form.invalid">Login</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private auth = inject(AuthService);

  success = output<string>();
  error = output<string>();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value; 
      await this.auth.login(email, password)
        .then(displayName => this.success.emit(`Welcome ${displayName}`))
        .catch(e => this.error.emit(e.message));
    }
  }
}
