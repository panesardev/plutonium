import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FallbackImageDirective } from '../../utilities/image.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [
    AsyncPipe,
    FallbackImageDirective,
    RouterLink,
  ],
  template: `
    @if (auth.user$ | async; as user) {
      <a routerLink="/dashboard">
        <img class="rounded-full w-8 md:w-10" 
          [src]="user.photoURL" 
          alt="user" 
          height="33" 
          width="33" 
          fallbackImage="/assets/img/user.png">
      </a>
    }
    @else {
      <button class="btn btn-sm btn-primary text-md" routerLink="/login">Login</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUserComponent {
  readonly auth = inject(AuthService);
}
