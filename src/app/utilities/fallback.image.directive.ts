import { Directive, ElementRef, HostListener, Input, inject } from "@angular/core";

@Directive({
  selector: 'img[fallbackImage]',
  standalone: true,
})
export class FallbackImageDirective {
  private element = inject(ElementRef);

  @Input({ required: true }) fallbackImage: string;

  @HostListener('error')
  onError() {
    this.element.nativeElement.src = this.fallbackImage;
  }
}

