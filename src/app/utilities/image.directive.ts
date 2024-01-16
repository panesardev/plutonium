import { Directive, ElementRef, HostListener, Input, inject } from "@angular/core";

@Directive({
  selector: 'img[fallbackImage]',
  standalone: true,
})
export class FallbackImageDirective {
  private hostRef = inject(ElementRef);

  @Input({ required: true }) fallbackImage: string;

  @HostListener('error')
  onError() {
    this.hostRef.nativeElement.src = this.fallbackImage;
  }
}

