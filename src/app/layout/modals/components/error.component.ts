import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Modal } from '../modal.class';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    ModalComponent,
  ],
  template: `
    <app-modal heading="Error!">
      <div class="text-red-500 mb-8">
        <p>{{ message() }}</p>
      </div>
      <div class="grid">
        <button class="bg-red-500 text-red-50" (click)="modal.close()">Okay</button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent extends Modal {
  message = input.required<string>();
}
