import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    <div class="fixed inset-0 z-[-10] bg-gradient-to-b from-transparent to-tertiary from-20%"></div>
    <app-navbar class="select-none"/>
    <main class="mt-24 lg:p-8">
      <router-outlet/>
    </main>
    @defer {
      <app-footer class="select-none"/>
    }
    @defer {
      <app-render-modal/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
