import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <footer class="mb-20">
      <div class="flex gap-4 md:gap-6 items-center justify-center mb-6">
        <a routerLink="/">Home</a>
        <a routerLink="/about">About</a>
        <a routerLink="/login">Login</a>
        <a routerLink="/articles">Articles</a>
      </div>
      <p class="text-center">Developed by <a target="_blank" rel="noopener" rel="noreferrer" href="https://panesarpbx8.vercel.app">Sukhpreet Singh</a></p>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
