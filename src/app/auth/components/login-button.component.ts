import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { ModalService } from '@app/layout/modal/modal.service';
import { ImageErrorDirective } from '@app/shared/directives/image-error.directive';

@Component({
  selector: 'app-login-button',
  imports: [
    AsyncPipe,
    RouterLink,
    ImageErrorDirective,
  ],
  template: `
    @if (user$ | async; as user) {
      <div class="flex items-center gap-3" routerLink="/dashboard">
        <button class="btn-primary w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m14.305 16.53.923-.382"/><path d="m15.228 13.852-.923-.383"/><path d="m16.852 12.228-.383-.923"/><path d="m16.852 17.772-.383.924"/><path d="m19.148 12.228.383-.923"/><path d="m19.53 18.696-.382-.924"/><path d="m20.772 13.852.924-.383"/><path d="m20.772 16.148.924.383"/><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/></svg>
          <span>Dashboard</span>
        </button>
        <img class="rounded-full cursor-pointer w-11" [src]="user.photoURL" [alt]="user.displayName" error="/icons/user.png">
      </div>
    }
    @else {
      <button class="btn-primary w-full" (click)="openLoginModal()">Login</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  user$ = this.auth.user$;

  async openLoginModal() {
    const fn = () => import('./login-modal.component').then(c => c.LoginModalComponent);
    await this.modal.open(fn);
  }
  
}
