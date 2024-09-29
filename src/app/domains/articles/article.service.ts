import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, switchMap, take, zip } from "rxjs";
import { FEATURED_ARTICLE_SLUG } from '../../app.constants';
import { Article } from "./article.interface";
import { createArticle, sortArticles } from "./article.utilities";

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  slugs$ = this.http.get('/articles/slugs.txt', { responseType: 'text' }).pipe(
    take(1),
    map(file => file.replaceAll('\r', '').split('\n')),
  );

  articles$ = this.slugs$.pipe(
    map(slugs => slugs.map(s => this.findBySlug(s))),
    switchMap(array => zip(array)),
    map(articles => articles.filter(a => a.published)),
    map(articles => sortArticles(articles)),
  );

  featured$ = this.findBySlug(FEATURED_ARTICLE_SLUG);

  findBySlug(slug: string): Observable<Article> {
    return this.http.get(`/articles/${slug}/index.md`, { responseType: 'text' }).pipe(
      take(1),
      map(content => createArticle(content, slug)),
    );
  }

  findRecent(count: number): Observable<Article[]> {
    return this.articles$.pipe(
      map(articles => articles.slice(0, count)),
    );
  }
}
