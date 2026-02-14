import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { User } from '@app/auth/auth.interface';
import { AuthService } from '@app/auth/auth.service';
import { ModalService } from '@app/layout/modal/modal.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-save-button',
  imports: [
    AsyncPipe,
  ],
  template: `
    <div class="flex justify-center">
      @if (user$ | async; as user) {
        @if (isArticleSaved$ | async) {
          <button class="btn-danger" (click)="removeArticle(user)">Remove from saved</button>
        }
        @else {
          <button class="btn-primary" (click)="saveArticle(user)">Save this Article</button>
        }
      }
      @else {
        <button class="btn-primary" (click)="openLoginModal()">Save this Article</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);
  private toast = inject(HotToastService);

  slug = input.required<string>();

  user$ = this.auth.user$;

  isArticleSaved$ = this.auth.user$.pipe(
    filter(user => !!user.articles),
    map(user => user.articles.includes(this.slug())),
  );

  async saveArticle(user: User) {
    try {
      const articles = [...user.articles, this.slug()];
      await this.auth.setUserDoc(user.uid, { articles });
      this.toast.success('Article saved!', { duration: 1500 });
    } catch (e) {
      this.toast.error('Failed to save article!');
    }
  }

  async removeArticle(user: User) {
    try {
      const articles = user.articles.filter(slug => slug != this.slug());
      await this.auth.setUserDoc(user.uid, { articles });
      this.toast.error('Article removed from saved!', { duration: 3000 });
    } catch (e) {
      this.toast.error('Failed to remove article!');
    }
  }

  async openLoginModal() {
    const fn = () => import('@app/auth/components/login-modal.component').then(c => c.LoginModalComponent);
    await this.modal.open(fn);
  }
}
