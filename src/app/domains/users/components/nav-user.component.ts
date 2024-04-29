import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FallbackImageDirective } from '../../../utilities/fallback.image.directive';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [
    AsyncPipe,
    FallbackImageDirective,
    RouterLink,
  ],
  template: `
    @if (user$ | async; as user) {
      <a routerLink="/dashboard">
        <img class="rounded-full w-8" [src]="user.photoURL" [alt]="user.displayName" fallbackImage="/assets/img/user.png" height="33" width="33">
      </a>
    }
    @else {
      <button class="btn sm primary" (click)="onLogin.emit()">Login</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavUserComponent {
  private auth = inject(AuthService);
  
  onLogin = output<void>();

  user$ = this.auth.user$;
}
