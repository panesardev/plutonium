import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgComponentOutlet,
  ],
  template: `
    @if (modal.active()) {
      <div class="{{ modal.opened() ? 'modal-overlay-open' : 'modal-overlay-close' }} bg-slate-300/50 backdrop-blur-md custom-shadow fixed top-0 right-0 left-0 bottom-0 z-[100]"></div>
      <div class="{{ modal.opened() ? 'modal-open' : 'modal-close' }} fixed z-[101] inset-0 px-3 py-6 select-none">
        <ng-container [ngComponentOutlet]="modal.active().component" [ngComponentOutletInputs]="modal.active().inputs" />
      </div>
    }
  `,
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly modal = inject(ModalService);

  ref = effect(() => {
    const onEsc = ({ key }) => key === 'Escape' && this.modal.close();

    if (this.modal.active()) {
      document.addEventListener('keyup', onEsc, true);
    }
    else {
      document.removeEventListener('keyup', onEsc, true);
    }
  });
}
