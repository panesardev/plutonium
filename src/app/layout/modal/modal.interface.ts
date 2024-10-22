import { inject } from "@angular/core";
import { ModalService } from "./modal.service";

export class Modal {
  modal = inject(ModalService);
}
