import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { mapArray } from 'ngxtension/map-array';
import { map, switchMap, zip } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ArticleService } from '../../domain/articles/article.service';
import { ArticleListComponent } from '../../domain/articles/components/article-list.component';
import { ModalService } from '../../layout/modals/modal.service';
import { ProfileCardComponent } from './components/profile-card.component';

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

  user = derivedAsync(() => this.auth.user$);
  
  articles = derivedAsync(() => 
    this.auth.user$.pipe(
      map(user => user.slugs),
      mapArray(slug => this.articleService.findBySlug(slug)),
      switchMap(array => zip(array)),
    ),
  );

  openLogout() {
    const fn = () => import('../../layout/modals/components/logout.component').then(c => c.LogoutComponent);
    this.modal.open(fn);
  }

}
