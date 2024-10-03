import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '@app/auth/auth.interface';
import { AuthService } from '@app/auth/auth.service';
import { SocialLoginComponent } from '@app/auth/components/social-login.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    SocialLoginComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  error = signal<string>(null);

  async submit() {
    if (this.form.valid) {
      const credentials: Credentials = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      
      await this.auth.login(credentials)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(e => this.error.set(e.message));
    }
  }

}
