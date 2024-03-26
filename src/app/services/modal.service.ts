import { Injectable, ViewContainerRef, signal } from '@angular/core';
import { Modal } from '../types/modal.class';

export interface ModalInput {
  name: string;
  value: unknown;
};

@Injectable({ providedIn: 'root' })
export class ModalService {
  private container: ViewContainerRef;
  
  readonly isOpen = signal(false);

  setContainer(container: ViewContainerRef): void {
    this.container = container;
  }

  open(modal: typeof Modal, inputs?: ModalInput[]): void {
    this.container.clear();
    const component = this.container.createComponent(modal);
    if (inputs) {
      inputs.forEach(input => component.setInput(input.name, input.value));
    }
    this.isOpen.set(true);
  }

  async openLazy(load: () => Promise<typeof Modal>, inputs?: ModalInput[]) {
    const modal = await load();
    this.container.clear();
    const component = this.container.createComponent(modal);
    if (inputs) {
      inputs.forEach(input => component.setInput(input.name, input.value));
    }
    this.isOpen.set(true);
  }

  close(): void {
    setTimeout(() => this.container.clear(), 300);
    this.isOpen.set(false);
  }  
}
