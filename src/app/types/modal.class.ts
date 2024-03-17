import { ChangeDetectorRef, inject } from "@angular/core";
import { ModalService } from "../services/modal.service";

export class Modal {
  readonly cdr = inject(ChangeDetectorRef);
  readonly modal = inject(ModalService);

  cd = setTimeout(() => this.cdr.detectChanges());
}
