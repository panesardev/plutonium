import type { User as FirebaseUser } from '@angular/fire/auth';

export interface User extends FirebaseUser, AdditionalUserData {}

export interface AdditionalUserData {
  articles: string[];
}

export type AuthProviderName = 'google' | 'github';

export interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}
