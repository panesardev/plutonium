import { Injectable, signal } from '@angular/core';
import { Modal } from './modal.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {
  
  active = signal<Modal>(null);
  opened = signal<boolean>(false);

  async open(componentFn: () => Promise<any>, inputs?: {}): Promise<void> {
    const component = await componentFn();
    this.active.set({ component, inputs });
    this.opened.set(true);
  }

  close() {
    setTimeout(() => this.active.set(null), 300);
    this.opened.set(false);
  }

}