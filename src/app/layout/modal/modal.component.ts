import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  imports: [
    NgComponentOutlet,
  ],
  template: `
    @if (modal.active()) {
      <div class="{{ modal.opened() ? 'modal-overlay-open' : 'modal-overlay-close' }} bg-slate-300/50 backdrop-blur-md secondary-shadow fixed top-0 right-0 left-0 bottom-0 z-[100]"></div>
      <div class="{{ modal.opened() ? 'modal-open' : 'modal-close' }} fixed z-[101] inset-0 px-3 py-6 select-none" (click)="close($event)" #modalContainer>
        <ng-container [ngComponentOutlet]="modal.active().component" [ngComponentOutletInputs]="modal.active().inputs" />
      </div>
    }
  `,
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly modal = inject(ModalService);
  readonly modalContainer = viewChild<ElementRef<HTMLDivElement>>('modalContainer');

  close(event: PointerEvent) {
    if (event.target === this.modalContainer().nativeElement || event.target === this.modalContainer().nativeElement.firstChild) {
      this.modal.close();
    }
  }
}
