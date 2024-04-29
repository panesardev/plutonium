import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ModalService } from '../../layout/modals/modal.service';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';
import { ArticleListComponent } from '../../domains/articles/components/article-list.component';
import { AuthService } from '../../domains/auth/auth.service';
import { UserService } from '../../domains/users/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ArticleListComponent,
    FallbackImageDirective,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private modal = inject(ModalService);

  view$ = combineLatest({
    user: this.auth.user$,
    articles: this.userService.articles$,
    isAdmin: this.auth.isAdmin$,
  });

  openLogout() {
    const fn = () => import('../../layout/modals/components/logout.component').then(c => c.LogoutComponent); 
    this.modal.openLazy(fn);
  }
}
