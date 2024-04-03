import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { tap } from 'rxjs';
import { BRAND } from '../../../app.constants';
import { ArticleListComponent } from '../../../layout/components/article-list.component';
import { ContentService } from '../../../services/content.service';
import { Article } from '../../../types/article.interface';

export const HashtagResolver: ResolveFn<Article[]> = (route: ActivatedRouteSnapshot) => {
  const hashtag = route.paramMap.get('hashtag');
  const content = inject(ContentService);
  const title = inject(Title);
  return content.findByHashtag(hashtag).pipe(
    tap(() => title.setTitle(`${hashtag.charAt(0).toUpperCase() + hashtag.slice(1)} - ${BRAND}`)),
  );
}

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [
    ArticleListComponent,
  ],
  templateUrl: './hashtag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagComponent {
  hashtag = input.required<string>();
  articles = input.required<Article[]>();
}
