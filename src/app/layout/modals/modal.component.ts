import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <ng-container #container />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

  private modalService = inject(ModalService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('container', { read: ViewContainerRef }) 
  containerRef: ViewContainerRef;

  ngAfterViewInit(): void {
    this.modalService.setContainerRef(this.containerRef);
    this.cdr.detectChanges();
  }

}
