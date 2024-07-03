import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, switchMap, zip } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ArticleService } from '../../domains/articles/article.service';
import { ArticleListComponent } from '../../domains/articles/components/article-list.component';
import { ModalService } from '../../layout/modals/modal.service';
import { ProfileCardComponent } from './components/profile-card.component';
import { computedAsync } from '../../shared/computed-async';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ArticleListComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private modal = inject(ModalService);
  private auth = inject(AuthService);
  private articleService = inject(ArticleService);

  user = computedAsync(this.auth.user$);
  articles = computedAsync(this.auth.user$.pipe(
    map(user => user.slugs),
    map(slugs => slugs.map(s => this.articleService.findBySlug(s))),
    switchMap(arr => zip(arr)),
  ));

  openLogout() {
    const fn = () => import('../../layout/modals/components/logout.component').then(c => c.LogoutComponent);
    this.modal.open(fn);
  }

}
