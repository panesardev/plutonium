import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { filter, firstValueFrom, map } from 'rxjs';

@Component({
    selector: 'app-save-button',
    imports: [
        RouterLink,
        AsyncPipe,
    ],
    template: `
    <div class="flex justify-center">
      @if (user$ | async) {
        @if (isArticleSaved$ | async) {
          <button class="btn-danger" (click)="removeArticle()">Remove saved</button>
        }
        @else {
          <button class="btn-primary" (click)="saveArticle()">Save Article</button>
        }
      }
      @else {
        <button class="btn-primary" routerLink="/login">Login</button>
      }
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveButtonComponent {
  private auth = inject(AuthService);

  slug = input.required<string>();

  user$ = this.auth.user$;

  isArticleSaved$ = this.auth.user$.pipe(
    filter(user => !!user.articles),
    map(user => user.articles.includes(this.slug())),
  );

  async saveArticle() {
    const user = await firstValueFrom(this.user$);
    const articles = [...user.articles, this.slug()];

    await this.auth.setUserDoc(user.uid, { articles });
  }

  async removeArticle() {
    const user = await firstValueFrom(this.user$);
    const articles = user.articles.filter(slug => slug != this.slug());

    await this.auth.setUserDoc(user.uid, { articles });
  }
}
