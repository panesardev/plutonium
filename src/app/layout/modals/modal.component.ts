import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { Modal } from './modal.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ modal.isOpen() ? 'modal-overlay-open' : 'modal-overlay-close' }} fixed top-0 right-0 left-0 h-[110vh] z-[100] bg-slate-950/60"></div>
    <div class="{{ modal.isOpen() ? 'modal-open' : 'modal-close' }} fixed z-[101] inset-0 px-3 py-4 select-none" #modalRef (click)="close($event)">
      <div class="bg-white rounded-xl p-6 md:p-8 mx-auto {{ width() }}">
        <div class="flex justify-between items-center gap-6 mb-6">
          <h1 class="text-primary font-bold text-xl">{{ heading() }}</h1>
          <button class="bg-red-100/50 text-red-500 p-2" (click)="modal.close()">
            <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
          </button>
        </div>
        <ng-content/>
      </div>
    </div>
  `,
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent extends Modal {
  heading = input.required<string>();
  width = input<string>('max-w-sm');

  modalRef = viewChild.required<ElementRef>('modalRef');

  close(event: MouseEvent) {
    if (event.target === this.modalRef().nativeElement) {
      this.modal.close();
    }
  }
}
