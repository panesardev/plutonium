import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ModalService } from '@app/layout/modal/modal.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-modal',
  template: `
    <div class="bg-white rounded-2xl max-w-sm mx-auto p-6 pb-8 md:p-8">
      <div class="flex justify-between gap-6 mb-3">
        <h1 class="heading">Login</h1>
        <button class="bg-red-100/50 text-red-500 p-2 h-fit" (click)="close()">
          <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
        </button>
      </div>

      <p class="mb-8">Continue with preferred social provider</p>
      
      <div class="grid gap-4">
        <button class="btn-secondary" (click)="login('google.com')">
          <img class="w-5" src="/icons/google.png" alt="google">
          <span>Continue with Google</span>
        </button>
        <button class="btn-secondary" (click)="login('github.com')">
          <img class="w-5" src="/icons/github.png" alt="github">
          <span>Continue with Github</span>
        </button>
        <button class="btn-secondary" (click)="login('facebook.com')">
          <img class="w-5" src="/icons/facebook.png" alt="facebook">
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  async login(providerId: string): Promise<void> {
    await this.auth.loginWithProvider(providerId).then(() => this.modal.close());
  }
  
  close() {
    this.modal.close();
  }
}
