import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Toc } from '../interfaces/article';

@Component({
  selector: 'app-render-markdown',
  standalone: true,
  imports: [
    MarkdownComponent,
  ],
  template: `
    <div #ref>
      <markdown class="markdown">{{ markdown }}</markdown>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderMarkdownComponent {

  private cdr = inject(ChangeDetectorRef);

  @Input() markdown: string;
  @Output() tableOfContents = new EventEmitter<Toc[]>();
  @ViewChild('ref') ref: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.ref) {
      const h2s = this.ref.nativeElement.getElementsByTagName('h2');
      // fix: expression has changed after view was checked
      setTimeout(() => {
        let tocs: Toc[] = [];
        for (let i = 0; i < h2s.length; i++) {
          h2s[i].id = slugify(h2s[i].innerText);
          tocs.push({ id: h2s[i].id, text: h2s[i].innerText });
        }
        this.tableOfContents.emit(tocs);

        this.cdr.detectChanges();
      }, 0);
    }
  }

}

function slugify(heading: string): string {
  return heading.toLowerCase().replace(' ', '-');
}