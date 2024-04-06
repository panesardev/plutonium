import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, firstValueFrom, map, Observable, of, switchMap, zip } from "rxjs";
import { ContentService } from "./content.service";
import { Article } from "../types/article.interface";

@Injectable({ providedIn: 'root' })
export class UserService {
  private auth = inject(AuthService);
  private content = inject(ContentService);
  
  getArticles(): Observable<Article[]> {
    return this.auth.user$.pipe(
      map(user => user.slugs.map(s => this.content.findBySlug(s))),
      switchMap(list => list.length && zip(list)),
      catchError(() => of([] as Article[])),
    );
  }

  async saveArticle(slug: string) {
    const user = await firstValueFrom(this.auth.user$);
    const slugs = [...user.slugs, slug];
    await this.auth.setUser(user.uid, { created: user.created, slugs });
  }

  async removeArticle(slug: string) {
    const user = await firstValueFrom(this.auth.user$);
    const slugs = user.slugs.filter(s => s != slug);
    await this.auth.setUser(user.uid, { created: user.created, slugs });
  }
}
