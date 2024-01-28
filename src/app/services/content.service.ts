import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import frontmatter from 'front-matter';
import { Observable, map, take, zip } from "rxjs";
import { environment } from "../../environments/environment";
import { SLUGS, FEATURED_SLUG } from '../app.constants';
import { Article, Toc, sortArticles } from "../types/article.interface";

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
   
  articles$ = zip(SLUGS.map(s => this.findBySlug(s))).pipe(
    map(articles => sortArticles(articles)),
  );

  featured$ = this.findBySlug(FEATURED_SLUG);
  
  hashtags$ = this.articles$.pipe(
    // extract hashtags from all articles into a single array
    map(articles => [].concat(...articles.map(a => a.hashtags))),
    // remove duplicates and then sort hashtags 
    map(hashtags => Array.from(new Set(hashtags)).sort() as string[]),
  );

  private fetchContent(slug: string): Observable<string> {
    return this.http.get(`${environment.baseUrl}/content/${slug}/index.md`, {
      responseType: 'text',
    });
  }

  findBySlug(slug: string): Observable<Article> {
    return this.fetchContent(slug).pipe(
      take(1),
      map(content => {
        const output = frontmatter<Article>(content);
        return {
          ...output.attributes,
          markdown: output.body,
          coverUrl: `${environment.baseUrl}/content/${slug}/img/cover.png`,
          url: `${environment.baseUrl}/articles/${slug}`,
        };
      }),
    );
  }

  findTableOfContents(markdown: string) {
    markdown.split('\n').forEach(console.log);
  }

  findAllByHashtag(hashtag: string): Observable<Article[]> {
    return this.articles$.pipe(
      map(articles => articles.filter(a => a.hashtags.includes(hashtag))),
    );
  }

}


