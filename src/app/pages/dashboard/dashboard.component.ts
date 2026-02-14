import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { ArticleService } from '@app/domains/articles/article.service';
import { ArticleListComponent } from '@app/domains/articles/components/article-list.component';
import { ModalService } from '@app/layout/modal/modal.service';
import { ImageErrorDirective } from '@app/shared/directives/image-error.directive';
import { startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    ImageErrorDirective,
    RouterLink,
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
    switchMap(user => this.articleService.findBySlugs(user.articles)),
    startWith([]),
  );

  getLocaleDate(dateString: string) {
    return new Date(dateString).toLocaleDateString();
  }

  async openLogoutModal() {
    const fn = () => import('../../auth/components/logout-modal.component').then(c => c.LogoutModalComponent);
    await this.modal.open(fn);
  }
  
  async openDeleteModal() {
    const fn = () => import('../../auth/components/delete-account-modal.component').then(c => c.DeleteAccountModalComponent);
    await this.modal.open(fn);
  }
}
