import { ChangeDetectorRef, inject } from "@angular/core";
import { ModalService } from "./modal.service";

export class Modal {
  readonly cdr = inject(ChangeDetectorRef);
  readonly modal = inject(ModalService);

  cd = setTimeout(() => this.cdr.detectChanges());
}
