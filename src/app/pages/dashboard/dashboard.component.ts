import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { ModalService } from '@layout/modals/modal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  user$ = this.auth.user$;

  articles$ = this.user$.pipe(

  );

  openLogout() {
    const fn = () => import('@layout/modals/components/logout.component').then(c => c.LogoutComponent);
    this.modal.open(fn);
  }
}
