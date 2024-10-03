import type { User } from '@angular/fire/auth';

export interface AuthUser extends User, AdditionalUserData {}

export interface AdditionalUserData {
  created: string;
  articles: string[];
}

export type AuthProviderName = 'google' | 'github';

export interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}
