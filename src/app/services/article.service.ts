import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import frontmatter from 'front-matter';
import { Observable, map, zip } from "rxjs";
import { sortArticles } from "../utilities/functions";
import { environment } from "../../environments/environment";
import { SLUGS, FEATURED_SLUG } from '../app.constants';
import { Article } from "../types/article.interface";

@Injectable({ providedIn: 'root' })
export class ArticleService {

  private http = inject(HttpClient);
   
  articles$ = zip(SLUGS.map(s => this.findBySlug(s))).pipe(map(sortArticles));
  featured$ = this.findBySlug(FEATURED_SLUG);
  hashtags$ = this.articles$.pipe(
    // extract hashtags from all articles into a single array
    map(articles => [].concat(...articles.map(a => a.hashtags))),
    // remove duplicates and then sort hashtags 
    map(hashtags => Array.from(new Set(hashtags)).sort()),
  );

  private fetchMarkdown(slug: string): Observable<string> {
    return this.http.get(`${environment.baseUrl}/content/${slug}/index.md`, {
      responseType: 'text',
    });
  }

  findBySlug(slug: string): Observable<Article> {
    return this.fetchMarkdown(slug).pipe(
      map(markdown => {
        const result = frontmatter<Article>(markdown);
        return {
          ...result.attributes,
          markdown: result.body,
          coverUrl: `${environment.baseUrl}/content/${slug}/img/cover.png`,
          url: `${environment.baseUrl}/articles/${slug}`,
        };
      }),
    );
  }

  findAllByHashtag(hashtag: string): Observable<Article[]> {
    return this.articles$.pipe(
      map(articles => articles.filter(a => a.hashtags.includes(hashtag))),
    );
  }

}


