import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { ModalService } from '@app/layout/modal/modal.service';
import { FallbackImageDirective } from '@app/shared/directives/fallback-image.directive';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    FallbackImageDirective,
  ],
  template: `
    <div class="bg-white rounded-xl max-w-sm mx-auto p-6 pb-8 md:p-8">
      <div class="flex justify-between items-center gap-6 mb-6">
        <h1 class="text-primary font-bold text-xl">Are you sure?</h1>
        <button class="bg-red-100/50 text-red-500 p-2" (click)="modal.close()">
          <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
        </button>
      </div>

      @if (user$ | async; as user) {
        <div class="bg-secondary-1 text-primary flex items-center rounded-md gap-3 mb-4 px-4 py-3 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
          <img [src]="user.photoURL" alt="user" class="rounded-full w-8 h-8" fallback="/icons/user.png">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }

      <p class="mb-6">You will be logged out!</p>

      <div class="grid grid-cols-2 gap-6">
        <button class="bg-secondary-1 text-primary" (click)="modal.close()">Cancel</button>
        <button class="btn-danger" (click)="logout()">Logout</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutModalComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  readonly modal = inject(ModalService);

  user$ = this.auth.user$;

  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/');
    this.modal.close();
  }
}
