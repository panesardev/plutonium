import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, take, zip } from "rxjs";
import { FEATURED_SLUG, SLUGS } from '../../app.constants';
import { Article, createArticle, searchArticle, sortArticles } from "./article.interface";

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  articles$ = zip(SLUGS.map(slug => this.findBySlug(slug))).pipe(
    map(articles => sortArticles(articles)),
  );

  featured$ = this.articles$.pipe(
    map(articles => articles.find(a => FEATURED_SLUG === a.slug)),
  );

  hashtags$ = this.articles$.pipe(
    map(articles => [].concat(...articles.map(a => a.hashtags)) as string[]),
    map(hashtags => Array.from(new Set(hashtags)).sort()),
  );

  findBySlug(slug: string): Observable<Article> {
    return this.http.get(`/content/${slug}/index.md`, { responseType: 'text' }).pipe(
      take(1),
      map(content => createArticle(content, slug)),
    );
  }

  findRecent(count: number): Observable<Article[]> {
    return this.articles$.pipe(
      map(articles => articles.slice(0, count)),
    );
  }

  findByHashtag(hashtag: string): Observable<Article[]> {
    return this.articles$.pipe(
      map(articles => articles.filter(a => a.hashtags.includes(hashtag))),
    );
  }

  search(text: string): Observable<Article[]> {
    return this.articles$.pipe(
      map(articles => articles.filter(a => searchArticle(text, a))),
    );
  }
}
