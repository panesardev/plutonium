import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, of, switchMap, zip } from "rxjs";
import { Article } from "../interfaces/article";
import { User } from "../interfaces/user";
import { ArticleService } from "./article.service";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {

  private auth = inject(AuthService);
  private articleService = inject(ArticleService);

  findSavedArticles(): Observable<Article[]> {
    return this.auth.user$.pipe(
      map(user => user.saved),
      map(slugs => slugs.map(slug => this.articleService.findBySlug(slug))),
      switchMap(list => list.length ? zip(list) : of([])),
      catchError(() => of([])),
    );
  }

  saveArticle(user: User, slug: string) {
    user.saved.push(slug);
    this.auth.updateUserDoc(user, { isPro: user.isPro, saved: user.saved });
  }

  removeArticle(user: User, slug: string) {
    const saved = user.saved.filter(s => s != slug);
    this.auth.updateUserDoc(user, { isPro: user.isPro, saved });
  }

}
