import { Injectable, ViewContainerRef, signal } from '@angular/core';
import { Modal } from './modal.component';

export interface ModalInput {
  name: string;
  value: unknown;
};

@Injectable({ providedIn: 'root' })
export class ModalService {
  private container: ViewContainerRef;
  
  isOpen = signal(false);

  setContainer(container: ViewContainerRef): void {
    this.container = container;
  }

  async open(modal: () => Promise<typeof Modal>, ...inputs: ModalInput[]) {
    this.container.clear();
    const component = this.container.createComponent(await modal());
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


