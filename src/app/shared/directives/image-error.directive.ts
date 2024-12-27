import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
  selector: 'img[error]',
  standalone: true,
})
export class ImageErrorDirective {
  private host = inject(ElementRef);

  error = input<string>();

  @HostListener('error')
  setErrorImage() {
    this.host.nativeElement.src = this.error();
  }
}
