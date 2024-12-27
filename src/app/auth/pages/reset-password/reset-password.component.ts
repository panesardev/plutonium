import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

export interface ResetPasswordFormValue {
  email: string;
}

@Component({
  selector: 'app-reset-password',
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResetPasswordComponent {
  private auth = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  error = signal<string>(null);
  
  async submit(value: ResetPasswordFormValue) {
    await this.auth.resetPassword(value).catch(e => this.error.set(e.message));
  }
}
