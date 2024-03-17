import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { Modal } from '../../types/modal.class';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  template: `
    <div class="{{ modal.isClosed() ? 'modal-overlay-out' : 'modal-overlay-in' }} fixed inset-0 z-[100] bg-slate-700/25"></div>
    <div class="{{ modal.isClosed() ? 'modal-out' : 'modal-in' }} fixed z-[101] inset-0 px-2 py-6 md:p-10">
    <div class="bg-neutral rounded p-6 md:p-8 mx-auto {{ classes() }}">
        @if (heading()) {
          <div class="flex justify-between items-center gap-6 pb-2 mb-4 border-b-2 border-slate-100">
            <h1 class="font-bold text-lg">{{ heading() }}</h1>
            <div>
              <a class="text-red-500 hover:underline cursor-pointer" (click)="modal.close()">
                <i class="close-icon"></i>
              </a>
            </div>
          </div>
        }
        <ng-content/>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseModalComponent extends Modal {

  classes = input<string>();
  heading = input.required<string>();

  
}
