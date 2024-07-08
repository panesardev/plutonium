import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ErrorImageDirective } from '../../../shared/error-image.directive';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-button-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <button class="px-4 py-1" routerLink="/login">Login</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonPlaceholderComponent {}

@Component({
  selector: 'app-user-button',
  standalone: true,
  imports: [
    ErrorImageDirective,
    RouterLink,
  ],
  template: `
    @if (user(); as user) {
      <a routerLink="/dashboard">
        <img [src]="user.photoURL" onError="/icons/user.png" class="w-8 rounded-full" [alt]="user.displayName">
      </a>
    }
    @else {
      <button class="px-4 py-1" routerLink="/login">Login</button>
    } 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  private auth = inject(AuthService);

  user = toSignal(this.auth.user$);
}
