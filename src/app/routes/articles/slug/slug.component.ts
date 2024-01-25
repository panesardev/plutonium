import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, afterRender, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { computedAsync } from 'ngxtension/computed-async';
import { HashtagListComponent } from '../../../layout/components/hashtag-list.component';
import { SaveButtonComponent } from '../../../layout/components/save-button.component';
import { ContentService } from '../../../services/content.service';
import { Toc, slugify } from '../../../types/article.interface';
import { FallbackImageDirective } from '../../../utilities/image.directive';

@Component({
  selector: 'app-slug',
  standalone: true,
  imports: [
    FallbackImageDirective,
    HashtagListComponent,
    NgOptimizedImage,
    MarkdownComponent,
    RouterLink,
    SaveButtonComponent,
  ],
  templateUrl: './slug.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SlugComponent {
  private content = inject(ContentService);
  private document = inject(DOCUMENT);

  @ViewChild('markdown') markdownRef: ElementRef<HTMLDivElement>;

  slug = input.required<string>();
  article = computedAsync(() => 
    this.content.findBySlug(this.slug()),
  );
  tableOfContents = signal<Toc[]>([]);

  constructor() {
    afterRender(() => {
      if (this.markdownRef) {
        const headings = this.markdownRef.nativeElement.getElementsByTagName('h2');
        const list: Toc[] = [];
        for (let i = 0; i < headings.length; i++) {
          headings.item(i).id = slugify(headings.item(i).innerText);
          list.push({ 
            id: headings.item(i).id, 
            text: headings.item(i).innerText,
          });
        }
        // fix expression has changed after it was checked
        setTimeout(() => this.tableOfContents.set(list), 0);
      }
    });
  }

  scroll(id: string): void {
    this.document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', 
    });
  }
  
}

