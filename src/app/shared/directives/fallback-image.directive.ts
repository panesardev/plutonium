import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
  selector: 'img[fallback]',
  standalone: true,
})
export class FallbackImageDirective {
  private hostRef = inject(ElementRef);

  fallback = input.required<string>();

  @HostListener('error')
  setFallbackImage() {
    this.hostRef.nativeElement.src = this.fallback();
  }
}
