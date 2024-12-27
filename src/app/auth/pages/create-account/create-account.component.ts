import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '@app/auth/auth.interface';
import { AuthService } from '@app/auth/auth.service';
import { SocialLoginComponent } from '@app/auth/components/social-login.component';

@Component({
    selector: 'create-account',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        SocialLoginComponent,
    ],
    templateUrl: './create-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateAccountComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  
  form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  error = signal<string>(null);

  async submit() {
    if (this.form.valid) {
      const credentials: Credentials = {
        displayName: this.form.value.displayName,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      await this.auth.createAccount(credentials)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(e => this.error.set(e.message));
    }
  }
}
