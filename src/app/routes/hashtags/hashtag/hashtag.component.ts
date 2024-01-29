import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { ArticleListComponent } from '../../../layout/components/article-list.component';
import { ContentService } from '../../../services/content.service';
import { view } from '../../../utilities/view.operator';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Article } from '../../../types/article.interface';
import { of } from 'rxjs';

interface HashtagView {
  hashtag: string;
  articles: Article[];
}

export const hashtagViewResolver: ResolveFn<HashtagView> = (route: ActivatedRouteSnapshot) => {
  const content = inject(ContentService);
  const hashtag = route.paramMap.get('hashtag');
  return view<HashtagView>({ 
    hashtag: of(hashtag),
    articles: content.findAllByHashtag(hashtag),
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
