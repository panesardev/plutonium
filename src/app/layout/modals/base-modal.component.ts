import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  template: `
    <div class="{{ modal.isClosed() ? 'modal-overlay-out' : 'modal-overlay-in' }} fixed inset-0 z-[100] bg-[#d8f8f5df]"></div>
    <div class="{{ modal.isClosed() ? 'modal-out' : 'modal-in' }} fixed z-[101] inset-0 px-6 md:px-8 pt-9 md:pt-12">
      <div class="bg-neutral rounded-lg p-6 md:p-8 mx-auto custom-shadow {{ width() ? width() : 'w-full' }} {{ height() ? height() : 'h-auto' }}">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseModalComponent {
  private cdr = inject(ChangeDetectorRef);
  readonly modal = inject(ModalService);

  width = input<string>();
  height = input<string>();

  constructor() {
    const listener = (e: any) => e.code === 'Escape' && this.modal.close();
    
    document.addEventListener('keyup', listener, true);

    inject(DestroyRef).onDestroy(() => {
      document.removeEventListener('keyup', listener, true);
    });

    // fix BaseModalComponent not rendering custom css classes on Modal open
    setTimeout(() => this.cdr.detectChanges());
  }

}
