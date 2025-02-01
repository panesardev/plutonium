import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable, zip } from "rxjs";
import { Article } from "./article.interface";
import { createArticle, sortArticles } from "./article.utils";
import { SLUGS } from "@app/app.constants";

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  articles$ = this.findBySlugs(SLUGS);

  findBySlug(slug: string): Observable<Article> {
    return this.http.get(`/articles/${slug}/index.md`, { responseType: 'text' }).pipe(
      map(content => createArticle(content)),
    );
  }

  findBySlugs(slugs: string[]): Observable<Article[]> {
    return zip(slugs.map(slug => this.findBySlug(slug))).pipe(
      map(articles => articles.filter(a => a.published)),
      map(articles => sortArticles(articles)),
    );
  }
}
