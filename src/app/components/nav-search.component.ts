import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-search',
  standalone: true,
  template: `
    <div (click)="openSearchModal.emit()" 
      class="bg-base-200 hover:bg-base-300 text-primary w-full px-5 py-2 rounded-full transition-colors cursor-pointer">
      Search articles
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSearchComponent {

  @Output() openSearchModal = new EventEmitter<void>();

}
