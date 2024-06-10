import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Modal, ModalComponent } from '../modal.component';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'access-denied',
  standalone: true,
  imports: [
    ModalComponent,
    RouterLink,
  ],
  template: `
    <modal heading="Access Denied">
      <p class="mb-8">You must be logged in!</p>
      
      <div class="grid grid-cols-2 gap-6">
        <button class="bg-secondary text-primary" (click)="redirect()">Back</button>
        <button routerLink="/auth" (click)="modal.close()">Login</button>
      </div>
    </modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessDeniedComponent extends Modal {
  private location = inject(Location);

  redirect() {
    this.location.back();
    this.modal.close();
  }
}
