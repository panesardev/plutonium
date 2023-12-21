import { DOCUMENT } from "@angular/common";
import { Injectable, inject } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PlatformService {

  private _document = inject(DOCUMENT);

  get document(): Document {
    return this._document;
  }

  get baseUrl(): string {
    return this.document.location.origin;
  }

  get currentUrl(): string {
    return this.document.location.href;
  }

  get pathname(): string {
    return this.document.location.pathname;
  }

}