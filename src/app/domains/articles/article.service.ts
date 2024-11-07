import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, switchMap, zip } from "rxjs";
import { Article } from "./article.interface";
import { createArticle, sortArticles } from "./article.utils";

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  private slugs$ = this.http.get('/articles/slugs.txt', { responseType: 'text' }).pipe(
    map(file => file.replaceAll('\r', '').split('\n')),
  );

  articles$ = this.slugs$.pipe(
    switchMap(slugs => this.findBySlugs(slugs)),
  );

  findBySlug(slug: string): Observable<Article> {
    return this.http.get(`/articles/${slug}/index.md`, { responseType: 'text' }).pipe(
      map(content => createArticle(content, slug)),
    );
  }

  findBySlugs(slugs: string[]): Observable<Article[]> {
    return zip(slugs.map(slug => this.findBySlug(slug))).pipe(
      map(articles => articles.filter(a => a.published)),
      map(articles => sortArticles(articles)),
    );
  }
}
