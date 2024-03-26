import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FallbackImageDirective } from '../../utilities/fallback.image.directive';
import { LoginComponent } from '../modals/login.component';
import { ModalService } from '../../services/modal.service';

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
        <img class="rounded-full w-8 md:w-10" 
          [src]="user.photoURL" 
          alt="user" 
          height="33" 
          width="33" 
          fallbackImage="/assets/img/user.png">
      </a>
    }
    @else {
      <button class="btn sm primary rounded-full" (click)="openLogin()">Login</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUserComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  user$ = this.auth.user$;

  openLogin() {
    this.modal.open(LoginComponent);
  }
}
