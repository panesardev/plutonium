import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]' // The selector to use the directive in HTML
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // Focus the element after the view has been initialized
    this.element.nativeElement.focus();
  }
}
