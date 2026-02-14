import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BRAND } from '@app/app.constants';
import { AuthService } from '@app/auth/auth.service';
import { ModalService } from '@app/layout/modal/modal.service';

@Component({
  selector: 'app-delete-account-modal',
  template: `
    <div class="bg-white rounded-2xl max-w-sm mx-auto p-6 pb-8 md:p-8 error-shadow">
      <div class="flex justify-between items-center gap-6 mb-6">
        <h1 class="text-primary font-bold text-xl">Are you sure?</h1>
        <button class="bg-red-100/50 text-red-500 p-2" (click)="modal.close()">
          <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
        </button>
      </div>

      <div class="bg-secondary rounded-xl px-5 py-3 mb-6">
        <p>You will need to login again to confirm and permanently delete your account.</p>
      </div>

      <button class="btn-danger w-full" (click)="deleteAccount()">Delete account</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountModalComponent {
  private auth = inject(AuthService);
  readonly modal = inject(ModalService);

  BRAND = BRAND;

  async deleteAccount() {
    await this.auth.deleteAccount().then(() => this.modal.close())
  }
}
