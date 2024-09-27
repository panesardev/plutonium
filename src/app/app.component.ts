import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { RenderModalComponent } from './layout/modals/render-modal.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RenderModalComponent,
  ],
  template: `
    <div class="scroll-watcher"></div>

    <div class="fixed inset-0 z-[-10] bg-gradient-to-b from-transparent to-secondary-2 from-20%"></div>

    <app-navbar class="select-none"/>
    
    <main class="mt-32 px-6 lg:px-8">
      <router-outlet/>
    </main>
    
    @defer {
      <app-footer class="select-none"/>
    }
    @defer {
      <app-render-modal/>
    }
  `,
})
export class AppComponent {}
