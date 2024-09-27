import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Credentials } from '@auth/auth.interface';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResetPasswordComponent {
  private auth = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  error = signal<string>(null);

  async submit() {
    if (this.form.valid) {
      const credentials: Credentials = {
        email: this.form.value.email,
      };

      await this.auth.resetPassword(credentials)
        .catch(e => this.error.set(e.message));
    }
  }
}
