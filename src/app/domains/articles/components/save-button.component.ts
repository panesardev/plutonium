import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { computedAsync } from '../../../shared/computed-async';

@Component({
  selector: 'app-save-button-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <button routerLink="/login">Login to save</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonPlaceholderComponent {}

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="flex justify-center">
      @if (user(); as user) {
        @if (isArticleSaved()) {
          <button class="bg-red-500 text-red-50" (click)="removeArticle(slug())">Remove saved</button>
        }
        @else {
          <button (click)="saveArticle(slug())">Save Article</button>
        }
      }
      @else {
        <button routerLink="/login">Login to save</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonComponent {
  private auth = inject(AuthService);

  slug = input.required<string>();

  user = computedAsync(this.auth.user$);
  isArticleSaved = computedAsync(this.auth.user$.pipe(
    map(user => user.slugs.includes(this.slug())),
  ));
  
  async saveArticle(slug: string) {
    const slugs = [...this.user().slugs, slug];
    await this.auth.setUser(this.user().uid, { created: this.user().created, slugs });
  }

  async removeArticle(slug: string) {
    const slugs = this.user().slugs.filter(s => s != slug);
    await this.auth.setUser(this.user().uid, { created: this.user().created, slugs });
  }
}
