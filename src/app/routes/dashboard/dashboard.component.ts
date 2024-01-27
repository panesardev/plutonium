import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computedFrom } from 'ngxtension/computed-from';
import { LogoutModalComponent } from '../../layout/modals/logout-modal.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private modalService = inject(ModalService);

  view = computedFrom({
    user: this.auth.user$,
    articles: this.userService.articles$,
  }, { initialValue: null });

  openLogoutModal() {
    this.modalService.open(LogoutModalComponent);
  }

  openProModal() {
    
  }
}
