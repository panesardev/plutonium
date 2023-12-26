import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { SearchModalComponent } from './modals/search-modal.component';
import { NavModalComponent } from './modals/nav-modal.component';
import { NavUserComponent } from '../components/nav-user.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NavUserComponent,
  ],
  template: `
    <header class="fixed z-10 top-0 w-full h-16 md:h-20 px-4 md:px-6 bg-neutral custom-shadow">
      <nav class="h-full max-width flex lg:grid lg:grid-cols-3 justify-between items-center gap-4 lg:gap-6 mx-auto">
        <div class="flex justify-start items-center gap-6">
          <div class="block lg:hidden" (click)="openNavModal()">
            <i class="menu-icon"></i>
          </div>
          <div class="block lg:hidden" (click)="openSearchModal()">
            <i class="search-icon"></i>
          </div>
          <a routerLink="/" class="hidden lg:block brand text-2xl lg:text-3xl">Plutonium</a>
        </div>
        <div class="hidden lg:block">
          <div (click)="openSearchModal()" 
            class="bg-base-200 hover:bg-base-300 text-primary w-full px-5 py-2 rounded-full transition-colors cursor-pointer">
            Search articles
          </div>
        </div>
        <div class="flex justify-end items-center gap-4 lg:gap-6">
          <div class="hidden lg:flex items-center gap-3">
            <a routerLink="/articles" routerLinkActive="bg-base-200" 
              class="px-4 py-1 rounded-full">
              Articles
            </a>
            <a routerLink="/hashtags" routerLinkActive="bg-base-200"
              class="px-4 py-1 rounded-full">
              Hashtags
            </a>
          </div>
          <app-nav-user />
        </div>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  
  private modalService = inject(ModalService);
  
  openSearchModal(): void {
    this.modalService.open(SearchModalComponent);
  }

  openNavModal(): void {
    this.modalService.open(NavModalComponent);
  }
}
