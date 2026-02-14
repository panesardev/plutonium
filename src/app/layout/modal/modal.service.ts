import { Injectable, signal } from '@angular/core';

export interface Modal {
  component: any;
  inputs: any;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly active = signal<Modal>(null);
  readonly opened = signal<boolean>(false);

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
