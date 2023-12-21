import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import frontmatter from 'front-matter';
import { Observable, map, zip } from "rxjs";
import { constants } from "../app.constants";
import { Article } from "../interfaces/article";
import { PlatformService } from "./platform.service";

@Injectable({ providedIn: 'root' })
export class ArticleService {

  private platform = inject(PlatformService);
  private http = inject(HttpClient);
  
  // bfbrhjvhjer vhjw hjrw
  private fetchMarkdown(slug: string): Observable<string> {
    return this.http.get(`${this.platform.baseUrl}/content/${slug}/index.md`, {
      responseType: 'text',
    });
  }

  findBySlug(slug: string): Observable<Article> {
    return this.fetchMarkdown(slug).pipe(
      map(markdown => {
        const article = mapArticle(markdown);
        article.coverUrl = this.findCoverUrl(slug);
        article.url = this.findArticleUrl(slug);
        return article;
      }),
    );
  }

  findAll(): Observable<Article[]> {
    const list = constants.slugs.map(s => this.findBySlug(s));
    return zip(list).pipe(
      map(articles => sortArticles(articles)),
    );
  }

  findFeatured(): Observable<Article> {
    return this.findBySlug(constants.featuredArticleSlug);
  }

  findAllByHashtag(hashtag: string): Observable<Article[]> {
    return this.findAll().pipe(
      map(articles => articles.filter(a => a.hashtags.includes(hashtag))),
    );
  }

  findAllHashtags(): Observable<string[]> {
    return this.findAll().pipe(
      // extract hashtags from all articles into a single array
      map(articles => [].concat(...articles.map(a => a.hashtags))),
      // remove duplicate and sort hashtags 
      map(hashtags => Array.from(new Set(hashtags)).sort()),
    );
  }

  private findArticleUrl(slug: string): string {
    return `${this.platform.baseUrl}/articles/${slug}`; 
  }

  private findCoverUrl(slug: string): string {
    return `${this.platform.baseUrl}/content/${slug}/img/cover.png`;
  }

}

function sortArticles(articles: Article[]): Article[] {
  return articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function mapArticle(markdown: string): Article {
  const result = frontmatter<Article>(markdown);
  return {
    ...result.attributes,
    markdown: result.body,
  };
}
