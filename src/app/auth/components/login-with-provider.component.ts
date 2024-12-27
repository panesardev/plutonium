import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-with-provider',
  template: `
    <div class="grid gap-4">
      <button class="btn-secondary" (click)="loginWithGoogle()">
        <img class="w-5" src="/icons/google.png" alt="google">
        <span>Continue with Google</span>
      </button>
      <button class="btn-secondary" (click)="loginWithGithub()">
        <img class="w-5" src="/icons/github.png" alt="github">
        <span>Continue with Github</span>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginWithProviderComponent {
  private auth = inject(AuthService);
  
  error = output<string>();

  async loginWithGoogle(): Promise<void> {
    await this.auth.loginWithProvider(new GoogleAuthProvider())
      .catch(e => this.error.emit(e.message.slice(9)));
  }
  
  async loginWithGithub(): Promise<void> {
    await this.auth.loginWithProvider(new GithubAuthProvider())
      .catch(e => this.error.emit(e.message.slice(9)));
  }
}
