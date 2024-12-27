import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';

import '../../../../../node_modules/prismjs/prism.js';
import '../../../../../node_modules/prismjs/components/prism-typescript.min.js';

@Component({
  selector: 'app-render-markdown',
  providers: [
    provideMarkdown(),
  ],
  imports: [
    MarkdownComponent,
  ],
  template: `
    <markdown class="markdown" [data]="markdown()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RenderMarkdownComponent {
  markdown = input.required<string>();
}
