import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserButtonComponent, UserButtonPlaceholderComponent } from './components/user-button.component';
import { BRAND } from '../../app.constants';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'navbar',
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

  panelRef = viewChild.required<ElementRef>('panelRef');
  
  panel = signal(false);
  brand = BRAND;

  openPanel() {
    this.panel.set(true);
  }

  closePanel() {
    this.panel.set(false);
  }

  closePanelFromOutside(event: MouseEvent) {
    if (event.target === this.panelRef().nativeElement) {
      this.panel.set(false);
    }
  }

  openSearchModal() {
    const fn = () => import('../modals/components/search.component').then(c => c.SearchComponent);
    this.modal.open(fn);
  }
}
