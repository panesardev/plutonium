import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserButtonComponent, UserButtonPlaceholderComponent } from './components/user-button.component';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    UserButtonComponent,
    UserButtonPlaceholderComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private modal = inject(ModalService);

  panelRef = viewChild<ElementRef>('panelRef');
  panel = signal(false);

  closePanelFromOutside(event: MouseEvent) {
    if (event.target === this.panelRef().nativeElement) {
      this.panel.set(false);
    }
  }

  openSearch() {
    const fn = () => import('../modals/components/search.component').then(c => c.SearchComponent);
    this.modal.open(fn);
  }
}
