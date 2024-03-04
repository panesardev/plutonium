import { Injectable, inject } from "@angular/core";
import { catchError, map, of, switchMap, zip } from "rxjs";
import { User } from "../types/user.interface";
import { AuthService } from "./auth.service";
import { ContentService } from "./content.service";

@Injectable({ providedIn: 'root' })
export class UserService {
  private auth = inject(AuthService);
  private content = inject(ContentService);

  articles$ = this.auth.user$.pipe(
    map(user => user.saved.map(slug => this.content.findBySlug(slug))),
    switchMap(list => list.length && zip(list)),
    catchError(() => of([])),
  );

  async saveArticle(user: User, slug: string) {
    user.saved.push(slug);
    await this.auth.setUser(
      user, 
      { isPro: user.isPro, saved: user.saved },
    );
  }

  async removeArticle(user: User, slug: string) {
    const saved = user.saved.filter(s => s != slug);
    await this.auth.setUser(
      user, 
      { isPro: user.isPro, saved },
    );
  }

}
