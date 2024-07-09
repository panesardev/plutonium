import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { AuthService } from '../../../auth/auth.service';
import { ErrorImageDirective } from '../../../shared/error-image.directive';
import { Modal } from '../modal.class';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    ModalComponent,
    ErrorImageDirective,
  ],
  template: `
    <app-modal heading="Are you sure?">
      @if (user(); as user) {
        <div class="bg-secondary text-primary flex items-center rounded-md gap-3 mb-4 px-4 py-3 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
        <img [src]="user.photoURL" onError="/icons/user.png" [alt]="user.displayName" class="rounded-full w-8 h-8">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }

      <p class="mb-6">You will be logged out!</p>

      <div class="grid grid-cols-2 gap-6">
        <button class="bg-secondary text-primary" (click)="modal.close()">Back</button>
        <button (click)="logout()">Logout</button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent extends Modal {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = derivedAsync(() => this.auth.user$);

  async logout() {
    await this.auth.logout();
    await this.router.navigate(['/']);
    this.modal.close();
  }
}
