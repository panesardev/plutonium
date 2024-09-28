import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[navbar-shadow]',
})
export class NavbarShadowDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 0) {
      this.renderer.addClass(this.element.nativeElement, 'navbar-shadow');
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'navbar-shadow');
    }
  }
}
