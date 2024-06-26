import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../domains/auth/auth.service';
import { Modal } from '../modal.interface';
import { BaseModalComponent } from '../base.modal.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    BaseModalComponent,
    AsyncPipe,
  ],
  template: `
    <app-base-modal heading="Are you sure?" width="max-w-sm">
      @if (user$ | async; as user) {
        <div class="flex items-center gap-3 bg-secondary hover:bg-base-300 text-primary rounded mb-4 px-4 py-3 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
          <img [src]="user.photoURL" alt="user" class="rounded-full w-8 h-8" fallbackImage="/assets/img/user.png">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }

      <p class="mb-6">You will be logged out!</p>

      <div class="grid">
        <button class="btn red" (click)="logout()">Logout</button>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent extends Modal {
  private auth = inject(AuthService);

  user$ = this.auth.user$;

  logout() {
    this.auth.logout();
    this.modal.close();
  }
}
