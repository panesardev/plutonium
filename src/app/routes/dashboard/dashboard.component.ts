import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ResolveFn, RouterLink } from '@angular/router';
import { LogoutModalComponent } from '../../layout/modals/logout-modal.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { Article } from '../../types/article.interface';
import { User } from '../../types/user.interface';
import { combineLatestObject } from '../../utilities/custom.operators';

interface DashboardView {
  user: User;
  articles: Article[];
}

export const dashboardViewResolver: ResolveFn<DashboardView> = () => {
  const auth = inject(AuthService);
  const userService = inject(UserService);
  return combineLatestObject({
    user: auth.user$,
    articles: userService.articles$,
  });
}

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
  private modal = inject(ModalService);

  view = input.required<DashboardView>();

  openLogoutModal() {
    this.modal.open(LogoutModalComponent);
  }

  openProModal() {
    
  }
}
