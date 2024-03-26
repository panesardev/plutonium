import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  template: `
    <div class="flex justify-center">
      @if (user$ | async; as user) {
        @if (isArticleSaved$ | async) {
          <button class="btn red md:w-full" (click)="removeArticle()">
            Remove saved
          </button>
        }
        @else {
          <button class="btn primary md:w-full" (click)="saveArticle()">
            Save Article
          </button>
        }
      }
      @else {
        <button class="btn primary md:w-full" (click)="onLogin.emit()">
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

  slug = input.required<string>();
  onLogin = output<void>();

  user$ = this.auth.user$;

  isArticleSaved$ = this.user$.pipe(
    map(user => user.slugs.includes(this.slug())),
  );
  
  async saveArticle() {
    await this.userService.saveArticle(this.slug());
  }

  async removeArticle() {
    await this.userService.removeArticle(this.slug());
  }
}
