import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SLUGS } from "@app/app.constants";
import frontmatter from 'front-matter';
import { map, Observable, zip } from "rxjs";
import { Article } from "./article.interface";

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  articles$ = this.findBySlugs(SLUGS);

  findBySlug(slug: string): Observable<Article> {
    return this.http.get(`/articles/${slug}/index.md`, { responseType: 'text' }).pipe(
      map(markdown => {
        const output = frontmatter<Article>(markdown);
        return {
          ...output.attributes,
          markdown: output.body,
        };
      }),
    );
  }

  findBySlugs(slugs: string[]): Observable<Article[]> {
    return zip(slugs.map(slug => this.findBySlug(slug))).pipe(
      map(articles => articles.filter(a => a.published)),
      map(articles => articles.sort((a1, a2) =>
        new Date(a2.createdAt).getTime() - new Date(a1.createdAt).getTime(),
      )),
    );
  }
}
