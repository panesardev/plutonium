import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthProviderName } from '../auth.interface';

@Component({
  selector: 'app-social-login',
  standalone: true,
  template: `
    <div class="grid gap-3">
      <button class="bg-secondary-1 hover:bg-secondary-2" (click)="login('google')">
        <img class="w-5" src="/icons/google.png" alt="google">
        <span>Continue with Google</span>
      </button>
      <button class="bg-secondary-1 hover:bg-secondary-2" (click)="login('github')">
        <img class="w-5" src="/icons/github.png" alt="github">
        <span>Continue with Github</span>
      </button>
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
      .then(() => this.router.navigateByUrl('/dashboard'))
      .catch(e => this.error.emit(e.message.slice(9)));
  }
}
