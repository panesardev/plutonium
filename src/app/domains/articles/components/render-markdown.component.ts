import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import { ClipboardButtonComponent } from './clipboard-button.component';

@Component({
  selector: 'app-render-markdown',
  providers: [
    provideMarkdown(),
  ],
  imports: [
    MarkdownComponent,
  ],
  template: `
    <markdown class="markdown" [data]="markdown()" clipboard [clipboardButtonComponent]="clipboardButton"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderMarkdownComponent {
  markdown = input.required<string>();

  clipboardButton = ClipboardButtonComponent;
}
