import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { AuthService } from '../../shared/services/auth.service';
import { ModalService } from '../../features/modals/services/modal.service';
import { UserService } from '../../shared/services/user.service';
import { FallbackImageDirective } from '../../shared/utilities/fallback.image.directive';

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
    articles: this.userService.getArticles(),
    isAdmin: this.auth.isAdmin$,
  });

  openLogout() {
    const fn = () => import('../../features/modals/logout.component').then(c => c.LogoutComponent); 
    this.modal.openLazy(fn);
  }
}
