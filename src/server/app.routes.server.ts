import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { HashtagService } from '../app/domains/hashtags/hashtag.service';
import { SLUGS } from '@app/app.constants';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SLUGS.map(slug => ({ slug }));
    },
  },
  { 
    path: 'hashtags/:hashtag',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const hashtagService = inject(HashtagService);
      const hashtags = await firstValueFrom(hashtagService.hashtags$);
      return hashtags.map(hashtag => ({ hashtag }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
