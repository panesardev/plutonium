import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { afterRender, ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { tap } from 'rxjs';
import { BRAND } from '../../../app.constants';
import { CommentBoxComponent } from '../../../features/comments/comment-box.component';
import { HashtagListComponent } from '../../../layout/components/hashtag-list.component';
import { SaveButtonComponent } from '../../../layout/deferred/save-button.component';
import { ContentService } from '../../../shared/services/content.service';
import { ModalService } from '../../../features/modals/services/modal.service';
import { Article, slugify, Toc } from '../../../shared/types/article.interface';
import { FallbackImageDirective } from '../../../shared/utilities/fallback.image.directive';

export const ArticleResolver: ResolveFn<Article> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  const content = inject(ContentService);
  const title = inject(Title);
  return content.findBySlug(slug).pipe(
    tap(article => title.setTitle(`${article.title} - ${BRAND}`)),
  );
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
    this.modal.openLazy(() => import('../../../features/modals/login.component').then(c => c.LoginComponent));
  }
}
