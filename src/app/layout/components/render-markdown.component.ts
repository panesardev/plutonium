import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Toc } from '../../interfaces/article.interface';

@Component({
  selector: 'app-render-markdown',
  standalone: true,
  imports: [MarkdownComponent],
  template: `
    <div #container>
      <markdown class="markdown" [data]="markdown" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderMarkdownComponent {

  private cdr = inject(ChangeDetectorRef);

  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @Input() markdown: string;
  @Output() tableOfContents = new EventEmitter<Toc[]>();

  ngAfterViewInit(): void {
    if (this.container) {
      const headings = this.container.nativeElement.getElementsByTagName('h2');
      // fix: expression has changed after view was checked
      setTimeout(() => {
        let tableOfContents: Toc[] = [];
        for (let i = 0; i < headings.length; i++) {
          headings.item(i).id = slugify(headings.item(i).innerText);
          tableOfContents.push({ 
            id: headings.item(i).id, 
            text: headings.item(i).innerText 
          });
        }
        this.tableOfContents.emit(tableOfContents);
        this.cdr.detectChanges();
      }, 0);
    }
  }

}

function slugify(heading: string): string {
  return heading.toLowerCase().replace(' ', '-');
}