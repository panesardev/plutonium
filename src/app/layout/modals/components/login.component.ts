import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Modal } from '../modal.interface';
import { BaseModalComponent } from '../base.modal.component';
import { FallbackImageDirective } from '../../../utilities/fallback.image.directive';
import { AuthFormComponent } from '../../../domains/auth/components/auth-form.component';
import { AuthService } from '../../../domains/auth/auth.service';
import { AuthData } from '../../../domains/auth/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BaseModalComponent,
    AuthFormComponent,
    FallbackImageDirective,
    RouterLink,
    AsyncPipe,
  ],
  template: `
    <app-base-modal heading="Authentication">
      @if (user$ | async; as user) {
        <div class="flex items-center gap-3 bg-secondary hover:bg-base-300 text-primary rounded mb-4 px-4 py-3 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
          <img [src]="user.photoURL" alt="user" class="rounded-full w-8 h-8" fallbackImage="/assets/img/user.png">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }
      
      @if (error()) {
        <p class="text-red-500 mb-4 cursor-pointer" (click)="error.set(null)">{{ error() }}</p>
      }

      <div class="mb-6">
        <app-auth-form (onSubmit)="submitAction($event)"/>
      </div>

      <div class="grid">
        <button class="btn secondary" (click)="googleLogin()">
          <img class="w-6 h-6" src="/assets/svg/google.svg" alt="google">
          <span>Continue with Google</span>  
        </button>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends Modal {
  private auth = inject(AuthService);

  user$ = this.auth.user$;

  error = signal<string>(null);

  async submitAction(authData: AuthData) {
    try {
      const { displayName, email, password, type } = authData;
      switch (type) {
        case 'LOGIN': {
          await this.auth.login({ email, password });
          break;
        }
        case 'CREATE_ACCOUNT': {
          await this.auth.createAccount({ email, password, displayName });
          break;
        }
        case 'RESET_PASSWORD': {
          await this.auth.resetPassword({ email });
          break;
        }
      }
      this.modal.close();
    } catch (e) {
      this.error.set(e.message);
    }
  }

  async googleLogin() {
    try { 
      await this.auth.oAuthLogin('google');
      this.modal.close();
    } catch (e) {
      this.error.set(e.message);
    }
  }
}
