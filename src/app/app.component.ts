import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ModalComponent } from './layout/modal/modal.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ModalComponent,
  ],
  template: `
    <div class="scroll-watcher"></div>
    <div class="background-overlay"></div>
    
    <app-navbar class="select-none" />
    
    <main class="mt-28 md:mt-32 px-6 lg:px-8">
      <router-outlet/>
    </main>
    
    @defer {
      <app-footer class="select-none" />
    }
    @defer {
      <app-modal />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
