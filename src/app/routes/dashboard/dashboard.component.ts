import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CanActivateFn, ResolveFn, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { LogoutModalComponent } from '../../layout/modals/logout-modal.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { Article } from '../../types/article.interface';
import { User } from '../../types/user.interface';
import { view } from '../../utilities/view.operator';

interface DashboardView {
  user: User;
  articles: Article[];
}

export const dashboardGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.user$.pipe(
    map(user => !!user),
    tap(isLoggedIn => !isLoggedIn && router.navigateByUrl('/login')),
  );
}

export const dashboardViewResolver: ResolveFn<DashboardView> = () => {
  const auth = inject(AuthService);
  const userService = inject(UserService);
  return view<DashboardView>({
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
