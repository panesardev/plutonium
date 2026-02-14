import type { User as FirebaseUser } from '@angular/fire/auth';

export interface User extends FirebaseUser, UserDoc {}

export interface UserDoc {
  articles: string[];
}
