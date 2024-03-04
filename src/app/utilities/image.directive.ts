import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
  selector: 'img[fallbackImage]',
  standalone: true,
})
export class FallbackImageDirective {
  private hostRef = inject(ElementRef);

  fallbackImage = input<string>();

  @HostListener('error')
  onError() {
    this.hostRef.nativeElement.src = this.fallbackImage();
  }
}

