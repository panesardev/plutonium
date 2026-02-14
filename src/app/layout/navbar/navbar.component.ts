import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '@app/app.constants';
import { ModalService } from '@app/layout/modal/modal.service';
import { LoginButtonComponent } from '../../auth/components/login-button.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LoginButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private modal = inject(ModalService);

  panel = signal(false);
  BRAND = BRAND;

  async openSearchModal() {
    const fn = () => import('./components/search-modal.component').then(c => c.SearchModalComponent);
    await this.modal.open(fn);
  }

  async openLoginModal() {
    const fn = () => import('@app/auth/components/login-modal.component').then(c => c.LoginModalComponent);
    await this.modal.open(fn);
  }
  
}
