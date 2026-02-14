import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BRAND, SOCIAL } from '@app/app.constants';

@Component({
  selector: 'app-about',
  template: `
    <section>
      <div class="mb-10">
        <img src="/icons/app.png" class="w-24 mx-auto" alt="LOGO">
      </div>

      <h1 class="heading mb-8 md:mb-12">About {{ BRAND }}</h1>
      
      <div class="max-w-2xl md:text-center mx-auto">
        <p class="mb-6">Plutonium is web-based blog platform where you can learn reactive and declarative programming in <a href="https://angular.dev" target="_blank" rel="noopener" rel="noreferrer">Angular</a> and some other frameworks.</p>

        <div class="flex items-center justify-center gap-6">
          <a class="text-primary hover:underline" [href]="SOCIAL.TWITTER" target="_blank" rel="noopener" rel="noreferrer">Twitter</a>
          <a class="text-primary hover:underline" [href]="SOCIAL.GITHUB" target="_blank" rel="noopener" rel="noreferrer">Github</a>
          <a class="text-primary hover:underline" [href]="SOCIAL.INSTAGRAM" target="_blank" rel="noopener" rel="noreferrer">Instagram</a>
          <a class="text-primary hover:underline" [href]="SOCIAL.YOUTUBE" target="_blank" rel="noopener" rel="noreferrer">Youtube</a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent {
  BRAND = BRAND;
  SOCIAL = SOCIAL;
}
