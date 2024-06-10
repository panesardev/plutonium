import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { FallbackImageDirective } from '../../../shared/directives/fallback.image.directive';

@Component({
  selector: 'user-button-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <button class="px-4 py-1" routerLink="/auth">Login</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonPlaceholderComponent {}

@Component({
  selector: 'user-button',
  standalone: true,
  providers: [
    AuthService,
  ],
  imports: [
    AsyncPipe,
    FallbackImageDirective,
    RouterLink,
    UserButtonPlaceholderComponent,
  ],
  template: `
    @if (user$ | async; as user) {
      <a routerLink="/dashboard">
        <img [src]="user.photoURL" class="w-8 rounded-full" fallbackImage="/icons/user.png" [alt]="user.displayName">
      </a>
    }
    @else {
      <user-button-placeholder />
    } 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  private auth = inject(AuthService);

  user$ = this.auth.user$;
}
