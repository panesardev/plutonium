import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'render-markdown',
  standalone: true,
  imports: [
    MarkdownComponent,
  ],
  providers: [
    provideMarkdown(),
  ],
  template: `
    <div class="prose max-w-none">
      <markdown [data]="markdown()"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderMarkdownComponent {
  markdown = input.required<string>();
}
