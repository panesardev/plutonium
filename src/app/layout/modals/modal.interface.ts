import { ChangeDetectorRef, inject } from "@angular/core";
import { ModalService } from "./modal.service";

export class Modal {
  cdr = inject(ChangeDetectorRef);
  modal = inject(ModalService);

  cd = setTimeout(() => this.cdr.detectChanges());
}
