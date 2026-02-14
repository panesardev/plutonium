import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private modal = inject(ModalService);
  
  async openLoginModal() {
    const fn = () => import('@app/auth/components/login-modal.component').then(c => c.LoginModalComponent);
    await this.modal.open(fn);
  }
}
