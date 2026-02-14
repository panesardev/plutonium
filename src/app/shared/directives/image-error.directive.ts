import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: 'img[error]',
  host: {
    '(error)': 'setErrorImage()',
  },
})
export class ImageErrorDirective {
  private host = inject(ElementRef);

  error = input<string>();

  setErrorImage() {
    this.host.nativeElement.src = this.error();
  }
}
