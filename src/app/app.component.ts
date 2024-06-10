import { ChangeDetectionStrategy, Component, ViewContainerRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ModalService } from './layout/modals/modal.service';

@Component({
  selector: 'app',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <navbar class="select-none" />
    <main class="mt-20 lg:p-8">
      <router-outlet />
    </main>
    <footer class="select-none"></footer>
    <div class="fixed inset-0 z-[-10] bg-gradient-to-b from-transparent to-tertiary from-20%"></div>
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
