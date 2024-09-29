import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[navbar-shadow]',
})
export class NavbarShadowDirective {
  private element = inject(ElementRef);

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 0) {
      this.element.nativeElement.classList.add('navbar-shadow');
    } else {
      this.element.nativeElement.classList.remove('navbar-shadow');
    }
  }
}
