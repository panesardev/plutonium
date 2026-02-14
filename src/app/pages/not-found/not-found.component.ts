import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <section>
      <h1 class="heading my-8 md:my-12">Oops! page not found</h1>
      <p class="text-xl md:text-center my-10">Page you are looking for does not exist or is removed</p>

      <div class="flex justify-center">
        <button class="btn-primary" (click)="back()">Go back</button>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundComponent {
  back() {
    history.back();
  }  
}
