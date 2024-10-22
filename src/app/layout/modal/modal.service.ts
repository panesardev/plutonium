import { Injectable, ViewContainerRef, signal } from '@angular/core';
import { Modal } from './modal.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private container: ViewContainerRef;
  
  opened = signal(false);

  setContainer(container: ViewContainerRef): void {
    this.container = container;
  }

  async open(modal: () => Promise<typeof Modal>) {
    this.container.clear();
    this.container.createComponent(await modal());
    this.opened.set(true);
  }

  close(): void {
    setTimeout(() => this.container.clear(), 300);
    this.opened.set(false);
  }
}
