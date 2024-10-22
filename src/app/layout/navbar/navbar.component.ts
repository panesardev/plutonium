import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '@app/app.constants';
import { ModalService } from '@app/layout/modal/modal.service';
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
    const fn = () => import('./components/search-modal.component').then(c => c.SearchModalComponent);
    await this.modal.open(fn);
  }
  
}
