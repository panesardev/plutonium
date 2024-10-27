import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { ModalComponent } from './layout/modal/modal.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ModalComponent,
  ],
  template: `
    <div class="scroll-watcher"></div>

    <div class="fixed top-0 right-0 left-0 h-[110vh] z-[-10] bg-gradient-to-b from-transparent to-secondary-2 from-10%"></div>

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
})
export class AppComponent {}
