import { ChangeDetectionStrategy, Component, ViewContainerRef, inject, viewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <ng-container #container />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private modal = inject(ModalService);

  containerRef = viewChild('container', { read: ViewContainerRef });

  ngAfterViewInit(): void {
    this.modal.setContainerRef(this.containerRef());
  }

}
