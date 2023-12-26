import { ChangeDetectionStrategy, Component, inject, Input as RouteInput } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { HashtagListComponent } from '../../components/hashtag-list.component';
import { LoadingComponent } from '../../layout/loading.component';
import { ArticleService } from '../../services/article.service';

export const prefetchHashtags: ResolveFn<string[]> = (route: ActivatedRouteSnapshot) => {
  return inject(ArticleService).hashtags$;
}

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [
    HashtagListComponent,
    LoadingComponent,
    RouterLink,
  ],
  templateUrl: './hashtags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HashtagsComponent {

  @RouteInput() hashtags: string[];

}
