import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computedFrom } from 'ngxtension/computed-from';
import { ArticleListComponent } from '../../components/article-list.component';
import { LoadingComponent } from '../../layout/loading.component';
import { LogoutModalComponent } from '../../layout/modals/logout-modal.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ArticleListComponent,
    LoadingComponent,
    RouterLink,
    FallbackImageDirective,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {

  private auth = inject(AuthService);
  private userService = inject(UserService);
  private modalService = inject(ModalService);

  view = computedFrom({ 
    user: this.auth.user$,
    articles: this.userService.savedArticles$,
  }, { initialValue: null });

  openLogoutModal() {
    this.modalService.open(LogoutModalComponent);
  }

  openProModal() {
    
  }
}
