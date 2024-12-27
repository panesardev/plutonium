import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { LoginWithProviderComponent } from '@app/auth/components/login-with-provider.component';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoginWithProviderComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private auth = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  error = signal<string>(null);

  async submit(value: LoginFormValue) {
    await this.auth.login(value).catch(e => this.error.set(e.message));
  }

}
