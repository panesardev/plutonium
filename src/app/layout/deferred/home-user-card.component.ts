import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-user-card',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
  ],
  template: `
    @if (auth.user$ | async; as user) {
      <div class="bg-neutral max-w-md mx-auto p-6 md:p-8 mb-20 md:rounded-md custom-shadow">
        <h1 class="font-bold text-center text-2xl flex gap-2 mb-4">
          <span>Hello</span>
          <span class="text-primary">{{ user.displayName }}</span>
        </h1>
        <p class="mb-4">See your saved articles</p>
        <button class="btn bg-secondary text-primary" routerLink="/dashboard">Go to dashboard</button>
      </div>
    }
    @else {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeUserCardComponent {
  readonly auth = inject(AuthService);
}
