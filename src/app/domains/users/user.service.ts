import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, map, of, switchMap, zip } from "rxjs";
import { Article } from "../articles/article.interface";
import { ArticleService } from "../articles/article.service";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {
  private auth = inject(AuthService);
  private articleService = inject(ArticleService);
  
  articles$ = this.auth.user$.pipe(
    map(user => user.slugs.map(s => this.articleService.findBySlug(s))),
    switchMap(list => list.length && zip(list)),
    catchError(() => of([] as Article[])),
  );

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
