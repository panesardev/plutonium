import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { ModalService } from '../../layout/modals/modal.service';
import { firstValueFrom, tap } from 'rxjs';

@Component({
  selector: 'dashboard',
  standalone: true,
  providers: [AuthService],
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

  redirect = firstValueFrom(this.user$).then(user => !user && this.openAccessDenied());
  
  openLogout() {
    const fn = () => import('../../layout/modals/components/logout.component').then(c => c.LogoutComponent);
    this.modal.open(fn);
  }

  openAccessDenied() {
    const fn = () => import('../../layout/modals/components/access-denied.component').then(c => c.AccessDeniedComponent);
    this.modal.open(fn);
  }
}
