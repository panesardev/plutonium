import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';

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
  });

  openLogout() {
    const fn = () => import('../../layout/modals/logout.component').then(c => c.LogoutComponent); 
    this.modal.openLazy(fn);
  }
}
