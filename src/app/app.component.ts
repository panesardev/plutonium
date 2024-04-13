import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer.component';
import { NavbarComponent } from './layout/navbar.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <main>
      <div class="scroll-watcher"></div>
      <div class="fixed top-0 left-0 right-0 z-10 select-none">
        <app-navbar/>
      </div>
      <div class="max-width mt-24 md:mt-32 mx-auto">
        <router-outlet/>
      </div>
      <div class="select-none">
        <app-footer/>
      </div>
    </main>
    <div class="fixed inset-0 z-[-10] bg-gradient-to-b from-transparent to-base-300 from-20%"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private container = inject(ViewContainerRef);
  private modal = inject(ModalService);

  constructor() {
    this.modal.setContainer(this.container);
  }
}
