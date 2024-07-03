import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Modal, ModalComponent } from '../modal.component';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    ModalComponent,
  ],
  template: `
    <app-modal heading="Success!">
      <div class="mb-8">
        <p>{{ message() }}</p>
      </div>
      <div class="grid">
        <button (click)="modal.close()">Cool!</button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent extends Modal {
  message = input.required<string>();
}
