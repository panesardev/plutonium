import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { LoginWithProviderComponent } from '@app/auth/components/login-with-provider.component';

export interface CreateAccountFormValue {
  displayName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-create-account',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoginWithProviderComponent,
  ],
  templateUrl: './create-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateAccountComponent {
  private auth = inject(AuthService);

  form = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error = signal<string>(null);
  
  async submit(value: CreateAccountFormValue) {
    await this.auth.createAccount(value).catch(e => this.error.set(e.message));
  }

}
