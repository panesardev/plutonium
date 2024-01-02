import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleListComponent } from '../../components/article-list.component';
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
    RouterLink,
    FallbackImageDirective,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {

  private auth = inject(AuthService);
  private userService = inject(UserService);
  private modalService = inject(ModalService);

  user$ = this.auth.user$;
  savedArticles$ = this.userService.savedArticles$;

  openLogoutModal() {
    this.modalService.open(LogoutModalComponent);
  }

  openProModal() {
    
  }
}
