import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BaseModalComponent } from './base-modal.component';
import { Modal } from '../../types/modal.class';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
  ],
  template: `
    <app-base-modal width="w-full md:w-[400px]">
      <h1 class="font-bold text-center text-2xl text-error mb-4">Are you sure?</h1>
      <p class="text-lg text-center mb-6">You will be logged out!</p>

      <div class="grid content-center gap-4">
        <button class="btn btn-error" (click)="logout()">Logout</button>
        <button class="btn btn-secondary" (click)="modal.close()">Cancel</button>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutModalComponent extends Modal {
  private auth = inject(AuthService);

  async logout() {
    await this.auth.logout();
    this.modal.close();
  }

}
