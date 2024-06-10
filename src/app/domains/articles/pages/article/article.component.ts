import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '../../article.interface';
import { RenderMarkdownComponent } from '../../components/render-markdown.component';

@Component({
  selector: 'article',
  standalone: true,
  imports: [
    RenderMarkdownComponent,
  ],
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleComponent {

  article = input.required<Article>();

}
