import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { ImageErrorDirective } from '@shared/directives/image-error.directive';

@Component({
  selector: 'app-user-button',
  standalone: true,
  imports: [
    AsyncPipe,
    ImageErrorDirective,
    RouterLink,
  ],
  template: `
    @if (user$ | async; as user) {
      <div class="flex items-center gap-3" routerLink="/dashboard">
        <button class="btn-primary w-full">Dashboard</button>
        <img class="rounded-full cursor-pointer w-11" [src]="user.photoURL" [alt]="user.displayName" onError="/icons/user.png">
      </div>
    }
    @else {
      <button class="btn-primary w-full" routerLink="/auth/login">Login</button>
    } 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  private auth = inject(AuthService);

  user$ = this.auth.user$;
}
