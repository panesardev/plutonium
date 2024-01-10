import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.interface';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
  ],
  template: `
    <div class="flex justify-center">
      @if (user$ | async; as user) {
        @if (isArticleSaved$ | async) {
          <button class="btn btn-error rounded md:w-full" (click)="removeArticle(user)">
            Remove saved 
          </button>
        }
        @else {
          <button class="btn btn-primary rounded md:w-full" (click)="saveArticle(user)">
            Save Article
          </button>
        }
      }
      @else {
        <button class="btn btn-primary rounded md:w-full" routerLink="/login">
          Login to save
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveButtonComponent {

  private auth = inject(AuthService);
  private userService = inject(UserService);

  @Input({ required: true }) slug: string;

  user$ = this.auth.user$;
  
  isArticleSaved$ = this.user$.pipe(
    map(user => user.saved.includes(this.slug)),
  );
  
  async saveArticle(user: User) {
    await this.userService.saveArticle(user, this.slug);
  }

  async removeArticle(user: User) {
    await this.userService.removeArticle(user, this.slug);
  }

}
