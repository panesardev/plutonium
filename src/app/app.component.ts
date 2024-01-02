import { ApplicationRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './layout/modal.component';
import { ModalService } from './services/modal.service';
import { NavbarComponent } from './layout/navbar.component';
import { FooterComponent } from './layout/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ModalComponent,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <div class="{{ modal.isClosed() ? '' : 'blur-lg' }}">
      <app-navbar />
      <main class="max-width mx-auto">
        <div class="pt-24 md:pt-28 pb-16"> <!-- fix navbar layout shift on modal open -->
          <router-outlet />
        </div>
      </main>
      <app-footer />
    </div>
    <app-modal />
  `,
})
export class AppComponent {

  readonly modal = inject(ModalService);

  constructor() {
    // inject(ApplicationRef).isStable.subscribe(isStable => console.log(`Stable: ${isStable}`));
  }

}
