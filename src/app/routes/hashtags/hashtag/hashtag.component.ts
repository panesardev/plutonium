import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { ArticleListComponent } from '../../../layout/components/article-list.component';
import { ContentService } from '../../../services/content.service';
import { Article } from '../../../types/article.interface';
import { combineLatestObject } from '../../../utilities/custom.operators';

interface HashtagView {
  hashtag: string;
  articles: Article[];
}

export const hashtagViewResolver: ResolveFn<HashtagView> = (route: ActivatedRouteSnapshot) => {
  const content = inject(ContentService);
  const hashtag = route.paramMap.get('hashtag');
  return combineLatestObject({ 
    hashtag: of(hashtag),
    articles: content.findByHashtag(hashtag),
  });
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
  view = input.required<HashtagView>();
}
