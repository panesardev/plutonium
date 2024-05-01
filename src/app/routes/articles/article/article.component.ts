import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { afterRender, ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { Article, slugify, Toc } from '../../../domains/articles/article.interface';
import { CommentBoxComponent } from '../../../domains/comments/components/comment-box.component';
import { HashtagListComponent } from '../../../domains/hashtags/components/hashtag-list.component';
import { SaveButtonComponent } from '../../../domains/users/components/save-button.component';
import { ModalService } from '../../../layout/modals/modal.service';
import { FallbackImageDirective } from '../../../utilities/fallback.image.directive';

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
    CommentBoxComponent,
  ],
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleComponent {
  private document = inject(DOCUMENT);
  private modal = inject(ModalService);

  article = input.required<Article>();
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
    setTimeout(() => this.tableOfContents.set(list), 0);
  });

  scroll(id: string): void {
    this.document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', 
    });
  }

  openLogin() {
    this.modal.openLazy(() => import('../../../layout/modals/components/login.component').then(c => c.LoginComponent));
  }
}
