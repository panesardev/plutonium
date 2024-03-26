import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseModalComponent } from './base-modal.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Modal } from '../../types/modal.class';
import { BRAND } from '../../app.constants';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    BaseModalComponent,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <app-base-modal [heading]="brand" classes="max-w-md">
      <div class="grid gap-2" (click)="modal.close()">
        <div class="text-primary px-5 py-3 rounded" routerLink="/">
          <a>Home</a>
        </div>
        <div class="text-primary px-5 py-3 rounded" routerLink="/articles" routerLinkActive="bg-base-200">
          <a>Articles</a>
        </div>
        <div class="text-primary px-5 py-3 rounded" routerLink="/hashtags" routerLinkActive="bg-base-200">
          <a>Hashtags</a>
        </div>
        <div class="text-primary px-5 py-3 rounded" routerLink="/dashboard" routerLinkActive="bg-base-200">
          <a>Dashboard</a>
        </div>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent extends Modal {
  brand = BRAND;
}
