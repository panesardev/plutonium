import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from './modals/modal.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <footer class="grid place-content-center h-96">
      <div class="flex gap-4 md:gap-6 items-center justify-center mb-6">
        <a class="text-primary hover:underline" routerLink="/">Home</a>
        <a class="text-primary hover:underline" routerLink="/about">About</a>
        <a class="text-primary hover:underline cursor-pointer" (click)="openLogin()">Login</a>
        <a class="text-primary hover:underline" routerLink="/articles">Articles</a>
      </div>
      <p class="text-center">Developed by <a class="text-blue-500 hover:underline" target="_blank" rel="noopener" rel="noreferrer" href="https://panesar.dev">Sukhpreet Singh</a></p>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private modal = inject(ModalService);

  openLogin() {
    const fn = () => import('./modals/components/login.component').then(c => c.LoginComponent); 
    this.modal.openLazy(fn);
  }
}
