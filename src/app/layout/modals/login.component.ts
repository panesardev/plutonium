import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthData } from '../../types/auth.interface';
import { Modal } from '../../types/modal.class';
import { AuthFormComponent } from '../components/auth-form.component';
import { BaseModalComponent } from './base.modal.component';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';

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
        <div class="flex items-center gap-3 bg-red-100 text-red-500 rounded mb-4 px-4 py-3 cursor-pointer" (click)="error.set(null)">
          <span>{{ error() }}</span>
        </div>
      }

      <div class="mb-6">
        <app-auth-form (onSubmit)="submitAction($event)"/>
      </div>

      <div class="grid">
        <button class="btn border-[1px] border-slate-300 hover:bg-slate-50 transition-colors" (click)="googleLogin()">
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

  submitAction(authData: AuthData) {
    const { displayName, email, password, type } = authData;
    switch (type) {
      case 'LOGIN': {
        this.auth.login({ email, password }).catch(e => this.error.set(e.message));
        break;
      }
      case 'CREATE_ACCOUNT': {
        this.auth.createAccount({ email, password, displayName }).catch(e => this.error.set(e.message));
        break;
      }
      case 'RESET_PASSWORD': {
        this.auth.resetPassword({ email }).catch(e => this.error.set(e.message));
        break;
      }
    }
  }

  googleLogin() {
    this.auth.oAuthLogin('google').catch(e => this.error.set(e.message));
  }
}
