import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, zip } from "rxjs";
import { Article } from "./article.interface";

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  slugs$ = this.http.get<string[]>('/api/articles/slugs');

  articles$ = this.http.get<Article[]>('/api/articles');

  findBySlug(slug: string): Observable<Article> {
    return this.http.get<Article>(`/api/articles/${slug}`);
  }

  findBySlugs(slugs: string[]): Observable<Article[]> {
    return zip(slugs.map(slug => this.findBySlug(slug)));
  }
}
