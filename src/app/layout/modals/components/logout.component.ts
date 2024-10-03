import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { ModalComponent } from '../modal.component';
import { Modal } from '../modal.interface';
import { FallbackImageDirective } from '@app/shared/directives/fallback-image.directive';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    AsyncPipe,
    FallbackImageDirective,
    ModalComponent,
  ],
  template: `
    <app-modal heading="Are you sure?">
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
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent extends Modal {
  private auth = inject(AuthService);
  private router = inject(Router);

  user$ = this.auth.user$;

  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/');
    this.modal.close();
  }
}
