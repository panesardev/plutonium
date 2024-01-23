import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
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

  @ViewChild('container', { read: ViewContainerRef }) 
  containerRef: ViewContainerRef;

  ngAfterViewInit(): void {
    this.modal.setContainerRef(this.containerRef);
  }

}
