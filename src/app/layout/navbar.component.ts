import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavUserComponent } from './deferred/nav-user.component';
import { ModalService } from '../services/modal.service';
import { NavComponent } from './modals/nav.component';
import { SearchComponent } from './modals/search.component';
import { BRAND } from '../app.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NavUserComponent,
  ],
  template: `
  <header class="h-16 md:h-20 px-4 lg:px-8 backdrop-filter backdrop-blur-lg bg-opacity-90 bg-neutral/90">
    <nav class="h-full max-width flex lg:grid lg:grid-cols-3 justify-between items-center gap-4 lg:gap-6 mx-auto">
      <div class="flex justify-start items-center gap-7">
        <div class="block lg:hidden" (click)="openNav()">
          <i class="menu-icon"></i>
        </div>
        <div class="block lg:hidden" (click)="openSearch()">
          <i class="search-icon"></i>
        </div>
        <a routerLink="/" class="hidden lg:block inter-tight text-gradient bg-gradient-to-br from-primary to-teal-500 text-primary text-2xl lg:text-3xl">{{ brand }}</a>
      </div>
      <div class="hidden lg:block">
        <div (click)="openSearch()" class="bg-base-200 hover:bg-base-300 text-primary w-full px-5 py-2 rounded-full transition-colors cursor-pointer">
          <span>Search articles</span>
        </div>
      </div>
      <div class="flex justify-end items-center gap-4 lg:gap-6">
        <div class="hidden lg:flex items-center gap-3">
          <a routerLink="/articles" routerLinkActive="bg-base-200" class="text-primary px-4 py-1 rounded-full">Articles</a>
          <a routerLink="/hashtags" routerLinkActive="bg-base-200" class="text-primary px-4 py-1 rounded-full">Hashtags</a>
        </div>
        @defer {
          <app-nav-user (onLogin)="openLogin()"/>
        }
        @placeholder { 
          <button class="btn sm primary" (click)="openLogin()">Login</button>
        }
      </div>
    </nav>
  </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private modal = inject(ModalService);

  brand = BRAND;
  
  openLogout() {
    const fn = () => import('./modals/logout.component').then(c => c.LogoutComponent); 
    this.modal.openLazy(fn);
  }

  openLogin() {
    const fn = () => import('./modals/login.component').then(c => c.LoginComponent); 
    this.modal.openLazy(fn);
  }

  openSearch() {
    this.modal.open(SearchComponent);
  }

  openNav() {
    this.modal.open(NavComponent);
  }
}
