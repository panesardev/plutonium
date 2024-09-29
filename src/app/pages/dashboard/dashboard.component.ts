import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { ArticleService } from '@domains/articles/article.service';
import { HashtagListComponent } from '@domains/hashtags/components/hashtag-list.component';
import { ModalService } from '@layout/modals/modal.service';
import { ImageErrorDirective } from '@shared/directives/image-error.directive';
import { map, startWith, switchMap, zip } from 'rxjs';
import { ProfileCardComponent } from './components/profile-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ImageErrorDirective,
    ProfileCardComponent,
    HashtagListComponent,
],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private articleService = inject(ArticleService);
  private modal = inject(ModalService);

  user$ = this.auth.user$;

  articles$ = this.user$.pipe(
    map(user => user.articles.map(s => this.articleService.findBySlug(s))),
    switchMap(list => zip(list)),
    startWith([]),
  );

  async openLogout() {
    const fn = () => import('@layout/modals/components/logout.component').then(c => c.LogoutComponent);
    await this.modal.open(fn);
  }
}
