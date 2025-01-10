import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { ArticleService } from '../app/domains/articles/article.service';
import { HashtagService } from '../app/domains/hashtags/hashtag.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const articleService = inject(ArticleService);
      const slugs = await firstValueFrom(articleService.slugs$);
      return slugs.map(slug => ({ slug }));
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
