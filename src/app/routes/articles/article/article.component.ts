import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, afterRender, effect, inject, input, signal, viewChild } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { HashtagListComponent } from '../../../layout/components/hashtag-list.component';
import { SaveButtonComponent } from '../../../layout/deferred/save-button.component';
import { ContentService } from '../../../services/content.service';
import { Article, Toc, slugify } from '../../../types/article.interface';
import { FallbackImageDirective } from '../../../utilities/image.directive';
import { combineLatestObject } from '../../../utilities/custom.operators';

interface ArticleView {
  article: Article;
}

export const articleViewResolver: ResolveFn<ArticleView> = (route: ActivatedRouteSnapshot) => {
  const content = inject(ContentService);
  const slug = route.paramMap.get('slug');
  return combineLatestObject({ 
    article: content.findBySlug(slug) 
  });
}

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    FallbackImageDirective,
    HashtagListComponent,
    NgOptimizedImage,
    MarkdownComponent,
    RouterLink,
    SaveButtonComponent,
  ],
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleComponent {
  private document = inject(DOCUMENT);

  view = input.required<ArticleView>();
  markdownRef = viewChild.required<ElementRef>('markdown');
  tableOfContents = signal<Toc[]>([]);

  afterRenderRef = afterRender(() => {
    const headings = this.markdownRef().nativeElement.getElementsByTagName('h2');
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
  });

  scroll(id: string): void {
    this.document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', 
    });
  }

}