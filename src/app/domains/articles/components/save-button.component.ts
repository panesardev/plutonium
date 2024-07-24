import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { AuthService } from '../../../auth/auth.service';
import { ModalService } from '../../../layout/modals/modal.service';

@Component({
  selector: 'app-save-button-placeholder',
  standalone: true,
  template: `
    <button (click)="openLogin()">Login to save</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonPlaceholderComponent {
  private modal = inject(ModalService);

  openLogin() {
    const fn = () => import('../../../layout/modals/components/login.component').then(c => c.LoginComponent);
    this.modal.open(fn); 
  }
}

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [
    SaveButtonPlaceholderComponent,
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
        <app-save-button-placeholder />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonComponent {
  private auth = inject(AuthService);

  slug = input.required<string>();

  user = derivedAsync(() => this.auth.user$);
  
  isArticleSaved = derivedAsync(() => this.user() && this.user().slugs.includes(this.slug()));
  
  async saveArticle(slug: string) {
    const slugs = [...this.user().slugs, slug];
    await this.auth.setUser(this.user().uid, { created: this.user().created, slugs });
  }

  async removeArticle(slug: string) {
    const slugs = this.user().slugs.filter(s => s != slug);
    await this.auth.setUser(this.user().uid, { created: this.user().created, slugs });
  }
}
