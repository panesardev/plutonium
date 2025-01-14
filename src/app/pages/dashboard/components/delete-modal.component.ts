import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BRAND } from '@app/app.constants';
import { AuthService } from '@app/auth/auth.service';
import { ModalService } from '@app/layout/modal/modal.service';
import { ImageErrorDirective } from '@app/shared/directives/image-error.directive';

@Component({
  selector: 'app-delete-modal',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ImageErrorDirective,
  ],
  template: `
    <div class="bg-white rounded-2xl max-w-sm mx-auto p-6 pb-8 md:p-8 error-shadow">
      <div class="flex justify-between items-center gap-6 mb-6">
        <h1 class="text-primary font-bold text-xl">Are you sure?</h1>
        <button class="bg-red-100/50 text-red-500 p-2" (click)="modal.close()">
          <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
        </button>
      </div>

      @if (user$ | async; as user) {
        <div class="bg-secondary text-primary flex items-center rounded-md gap-3 mb-4 px-4 py-3 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
          <img [src]="user.photoURL" alt="user" class="rounded-full size-6" error="/icons/user.png">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }

      <p class="mb-6">Type "{{ phrase }}" to permanently delete your account from {{ BRAND }}</p>

      <div class="input-field mb-6">
        <input type="text" name="text" [formControl]="confirmControl" id="text" class="peer" placeholder=" " autocomplete="off"/>
        <label for="text" class="peer-focus:text-primary peer-focus:top-1 peer-focus:left-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          <span>Type phrase here</span>
        </label>
      </div>

      <button class="btn-danger w-full" (click)="deleteAccount()">Delete account</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
  private auth = inject(AuthService);
  readonly modal = inject(ModalService);

  confirmControl = new FormControl('', Validators.required);

  user$ = this.auth.user$;
  
  error = signal<string>(null);

  BRAND = BRAND;
  phrase = 'Delete my account';

  async deleteAccount() {
    if (this.confirmControl.value === this.phrase) {
      await this.auth.deleteAccount()
        .then(() => this.modal.close())
        .catch(e => this.error.set(e.message));
    }
  }
}
