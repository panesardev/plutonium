import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { SLUGS } from '@app/app.constants';
import { HashtagService } from '@app/domains/hashtags/hashtag.service';
import { firstValueFrom } from 'rxjs';

export const routes: ServerRoute[] = [
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SLUGS.map(slug => ({ slug })),
  },
  { 
    path: 'hashtags/:hashtag',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const hashtagService = inject(HashtagService);
      const hashtags = await firstValueFrom(hashtagService.hashtags$);
      return hashtags.map(hashtag => ({ hashtag }));
    },
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
