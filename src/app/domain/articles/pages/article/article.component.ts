import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ErrorImageDirective } from '../../../../shared/error-image.directive';
import { HashtagListComponent } from '../../../../domain/hashtags/components/hashtag-list.component';
import { CommentBoxComponent } from '../../../../domain/comments/components/comment-box.component';
import { ArticleHeaderComponent } from '../../components/article-header.component';
import { RenderMarkdownComponent } from '../../components/render-markdown.component';
import { SaveButtonComponent, SaveButtonPlaceholderComponent } from '../../components/save-button.component';
import { Article } from '../../article.interface';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ErrorImageDirective,
    HashtagListComponent,
    CommentBoxComponent,
    ArticleHeaderComponent,
    RenderMarkdownComponent,
    SaveButtonComponent,
    SaveButtonPlaceholderComponent,
  ],
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleComponent {
  article = input.required<Article>();
}
