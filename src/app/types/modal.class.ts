import { inject } from "@angular/core";
import { ModalService } from "../services/modal.service";

export class Modal {
  readonly modal = inject(ModalService);
}
