import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { AuthService } from '../../../auth/auth.service';
import { ErrorImageDirective } from '../../../shared/error-image.directive';
import { ModalService } from '../../modals/modal.service';

@Component({
  selector: 'app-user-button-placeholder',
  standalone: true,
  template: `
    <button class="px-4 py-1" (click)="openLogin()">Login</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonPlaceholderComponent {
  private modal = inject(ModalService);

  openLogin() {
    const fn = () => import('../../modals/components/login.component').then(c => c.LoginComponent);
    this.modal.open(fn); 
  }
}

@Component({
  selector: 'app-user-button',
  standalone: true,
  imports: [
    ErrorImageDirective,
    RouterLink,
    UserButtonPlaceholderComponent,
  ],
  template: `
    @if (user(); as user) {
      <a routerLink="/dashboard">
        <img [src]="user.photoURL" onError="/icons/user.png" class="w-8 rounded-full" [alt]="user.displayName">
      </a>
    }
    @else {
      <app-user-button-placeholder />
    } 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  private auth = inject(AuthService);

  user = derivedAsync(() => this.auth.user$);
}
