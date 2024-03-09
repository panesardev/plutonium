import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  template: `
    <div class="{{ modal.isClosed() ? 'modal-overlay-out' : 'modal-overlay-in' }} fixed inset-0 z-[100] bg-[#156b7526]"></div>
    <div class="{{ modal.isClosed() ? 'modal-out' : 'modal-in' }} fixed z-[101] inset-0 p-6 md:p-10">
      <div class="bg-neutral rounded-lg p-6 md:p-8 mx-auto custom-shadow {{ classes() }}">
        <ng-content/>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseModalComponent {
  private cdr = inject(ChangeDetectorRef);
  readonly modal = inject(ModalService);

  classes = input<string>('');

  cd = setTimeout(() => this.cdr.detectChanges());
  
}
