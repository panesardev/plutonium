import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '@app/app.constants';
import { ModalService } from '@app/layout/modals/modal.service';
import { UserButtonComponent } from './components/user-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    UserButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private modal = inject(ModalService);

  drawer = signal(false);

  BRAND = BRAND;
  
  async openSearch() {
    const fn = () => import('../modals/components/search.component').then(c => c.SearchComponent);
    await this.modal.open(fn);
  }
  
}
