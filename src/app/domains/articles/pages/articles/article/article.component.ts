import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BASE_URL } from '@app/app.constants';
import { Article } from '@app/domains/articles/article.interface';
import ArticleHeaderComponent from '@app/domains/articles/components/article-header.component';
import RenderMarkdownComponent from '@app/domains/articles/components/render-markdown.component';
import SaveButtonComponent from '@app/domains/articles/components/save-button.component';
import CommentBoxComponent from '@app/domains/comments/components/comment-box.component';
import HashtagListComponent from '@app/domains/hashtags/components/hashtag-list.component';

@Component({
  selector: 'app-article',
  imports: [
    NgOptimizedImage,
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

  BASE_URL = BASE_URL;
}
