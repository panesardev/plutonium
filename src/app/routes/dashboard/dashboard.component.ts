import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleListComponent } from '../../layout/components/article-list.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { combineLatestObject } from '../../utilities/rxjs.operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ArticleListComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private modal = inject(ModalService);

  view$ = combineLatestObject({
    user: this.auth.user$,
    articles: this.userService.getArticles(),
  });

  parseDate(milliseconds: number) {
    return new Date(milliseconds).toDateString();
  }

  openLogout() {
    this.modal.openLazy(() => import('../../layout/modals/logout.component').then(c => c.LogoutComponent));
  }

}
