import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviderName } from '@auth/auth.interface';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-social-login',
  standalone: true,
  template: `
    <div class="grid gap-6">
      <button class="bg-secondary-1 hover:bg-secondary-2" (click)="login('google')">Continue with Google</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  
  error = output<string>();

  async login(name: AuthProviderName) {
    await this.auth.loginWithProvider(name)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(e => this.error.emit(e.message));
  }
}
