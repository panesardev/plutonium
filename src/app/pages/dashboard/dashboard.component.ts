import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { ArticleService } from '@app/domains/articles/article.service';
import { ArticleListComponent } from '@app/domains/articles/components/article-list.component';
import { ModalService } from '@app/layout/modal/modal.service';
import { map, startWith, switchMap, zip } from 'rxjs';
import { ProfileCardComponent } from './components/profile-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ProfileCardComponent,
    ArticleListComponent,
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
    switchMap(array => zip(array)),
    startWith([]),
  );

  async openLogout() {
    const fn = () => import('./components/logout-modal.component').then(c => c.LogoutModalComponent);
    await this.modal.open(fn);
  }
  
  async openDelete() {
    const fn = () => import('./components/delete-modal.component').then(c => c.DeleteModalComponent);
    await this.modal.open(fn);
  }
}
