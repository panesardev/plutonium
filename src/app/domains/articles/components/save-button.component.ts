import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { firstValueFrom, map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'save-button-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <button class="md:w-full" routerLink="/auth">Login to save</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonPlaceholderComponent {}

@Component({
  selector: 'save-button',
  standalone: true,
  imports: [
    AsyncPipe,
    SaveButtonPlaceholderComponent,
  ],
  template: `
    <div class="flex justify-center">
      @if (user$ | async; as user) {
        @if (isArticleSaved$ | async) {
          <button class="red md:w-full" (click)="removeArticle(slug())">Remove saved</button>
        }
        @else {
          <button class="md:w-full" (click)="saveArticle(slug())">Save Article</button>
        }
      }
      @else {
        <save-button-placeholder />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonComponent {
  private auth = inject(AuthService);

  slug = input.required<string>();
  onLogin = output<void>();

  user$ = this.auth.user$;

  isArticleSaved$ = this.user$.pipe(
    map(user => user.slugs.includes(this.slug())),
  );
  
  async saveArticle(slug: string) {
    const user = await firstValueFrom(this.auth.user$);
    const slugs = [...user.slugs, slug];
    await this.auth.setUser(user.uid, { created: user.created, slugs });
  }

  async removeArticle(slug: string) {
    const user = await firstValueFrom(this.auth.user$);
    const slugs = user.slugs.filter(s => s != slug);
    await this.auth.setUser(user.uid, { created: user.created, slugs });
  }
}
