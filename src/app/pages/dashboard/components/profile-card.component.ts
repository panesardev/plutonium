import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AuthUser } from '../../../auth/auth.interface';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  template: `
    <div class="bg-white grid md:grid-cols-2 rounded-lg gap-4 p-6 md:p-8">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img class="rounded-full w-8" [src]="user().photoURL" [alt]="user().displayName">
          <span class="text-primary text-xl">{{ user().displayName }}</span>
        </div>
        <div class="grid gap-2">
          <span>Email: {{ user().email }}</span>
          <span>Joined: {{ user().created }}</span>
        </div>
      </div>
      <div class="flex justify-end h-fit">
        <button class="bg-red-500 text-red-50" (click)="logout.emit()">Logout</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  user = input.required<AuthUser>();
  logout = output<void>();
}
