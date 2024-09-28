import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '@domains/articles/article.interface';
import { ArticleHeaderComponent } from '@domains/articles/components/article-header.component';
import { RenderMarkdownComponent } from '@domains/articles/components/render-markdown.component';
import { SaveButtonComponent } from '@domains/articles/components/save-button.component';
import { CommentBoxComponent } from '@domains/comments/components/comment-box.component';
import { HashtagListComponent } from '@domains/hashtags/components/hashtag-list.component';
import { ImageErrorDirective } from '@shared/directives/image-error.directive';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageErrorDirective,
    HashtagListComponent,
    CommentBoxComponent,
    ArticleHeaderComponent,
    RenderMarkdownComponent,
    SaveButtonComponent,
  ],
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleComponent {
  article = input.required<Article>();
}
