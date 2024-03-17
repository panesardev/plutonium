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
    <app-base-modal heading="Logout" classes="max-w-md">
      <h1 class="font-bold text-xl mb-2">Are you sure?</h1>
      <p class="mb-8">You will be logged out!</p>
      
      <div class="grid grid-cols-2 justify-center items-center gap-6">
        <button class="btn bg-slate-100" (click)="modal.close()">Cancel</button>
        <button class="btn bg-red-500 text-red-50" (click)="logout()">Logout</button>
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
