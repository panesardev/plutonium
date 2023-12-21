import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="flex justify-center">
      @if (user() && isArticleSaved()) {
        <button class="btn btn-error rounded md:w-full" (click)="removeArticle()">
          Remove saved 
        </button>
      } 
      @if (user() && !isArticleSaved()) {
        <button class="btn btn-primary rounded md:w-full" (click)="saveArticle()">
          Save Article
        </button>
      }
      @if (!user()) {
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

  user = toSignal(this.auth.user$, { initialValue: null });
  
  isArticleSaved = computed(() => {
    return this.user().saved.includes(this.slug);
  });
  
  saveArticle() {
    this.userService.saveArticle(this.user(), this.slug);
  }

  removeArticle() {
    this.userService.removeArticle(this.user(), this.slug);
  }

}
