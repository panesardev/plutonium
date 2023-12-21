import { Injectable, ViewContainerRef, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {

  private containerRef: ViewContainerRef;
  readonly isClosed = signal(true);

  setContainerRef(containerRef: ViewContainerRef): void {
    this.containerRef = containerRef;
  }

  open(component: any): void {
    this.isClosed.set(false);
    this.containerRef.clear();
    this.containerRef.createComponent(component);
  }

  close(): void {
    setTimeout(() => {
      this.containerRef.remove();
    }, 300);
    this.isClosed.set(true);
  }  
}
