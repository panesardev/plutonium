import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'app-nav-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <app-base-modal width="max-w-4xl">
      <button class="btn btn-sm btn-error float-right" (click)="modal.close()">
        <i class="close-icon"></i>
      </button>
      <h1 class="brand text-2xl text-primary mb-4">Plutonium</h1>

      <div class="border-b-[.1rem] border-slate-200 mb-4"></div>

      <div class="grid gap-2" (click)="modal.close()">
        <div class="px-5 py-2 rounded-md" routerLink="/">
          <a >Home</a>
        </div>
        <div class="px-5 py-2 rounded-full" routerLink="/dashboard" routerLinkActive="bg-base-200">
          <a>Dashboard</a>
        </div>
        <div class="px-5 py-2 rounded-full" routerLink="/articles" routerLinkActive="bg-base-200">
          <a>Articles</a>
        </div>
        <div class="px-5 py-2 rounded-full" routerLink="/hashtags" routerLinkActive="bg-base-200">
          <a>Hashtags</a>
        </div>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalComponent extends Modal {}
