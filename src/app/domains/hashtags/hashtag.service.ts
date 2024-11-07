import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Article } from "@app/domains/articles/article.interface";
import { ArticleService } from "@app/domains/articles/article.service";

@Injectable({ providedIn: 'root' })
export class HashtagService {
  private articleService = inject(ArticleService);

  hashtags$ = this.articleService.articles$.pipe(
    map(articles => [].concat(...articles.map(a => a.hashtags)) as string[]),
    map(hashtags => Array.from(new Set(hashtags)).sort()),
  );

  findByHashtag(hashtag: string): Observable<Article[]> {
    return this.articleService.articles$.pipe(
      map(articles => articles.filter(a => a.hashtags.includes(hashtag))),
    );
  }
}
