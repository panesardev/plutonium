import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseModalComponent } from './base-modal.component';
import { Modal } from '../../types/modal.class';
import { Router } from 'express';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
  ],
  template: `
    <app-base-modal classes="w-full md:w-[400px]">
      <h1 class="font-bold text-center text-2xl text-primary mb-4">Access denied!</h1>
      <p class="text-lg text-center mb-6">You need to be logged in!</p>

      <div class="grid content-center gap-4">
        <button class="btn btn-primary" (click)="redirect()">Login</button>
        <button class="btn btn-secondary" (click)="modal.close()">Cancel</button>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent extends Modal {

  private router = inject(Router);

  async redirect() {
    await this.router.navigateByUrl('/login');
    this.modal.close();
  }

}
