import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base.modal.component';
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

  logout() {
    this.auth.logout();
    this.modal.close();
  }
}
