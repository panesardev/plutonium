import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { ArticleService } from '@domains/articles/article.service';
import { ArticleListComponent } from '@domains/articles/components/article-list.component';
import { ModalService } from '@layout/modals/modal.service';
import { map, switchMap, zip } from 'rxjs';
import ArticleComponent from "../../domains/articles/pages/articles/article/article.component";
import { ImageErrorDirective } from '@shared/directives/image-error.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    ArticleListComponent,
    ArticleComponent,
    ImageErrorDirective,
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
  );

  async openLogout() {
    const fn = () => import('@layout/modals/components/logout.component').then(c => c.LogoutComponent);
    await this.modal.open(fn);
  }
}
