import type { User } from 'firebase/auth';

export interface AuthUser extends User, AdditionalUserData {}

export interface AdditionalUserData {
  slugs: string[];
  created: string;
}

export interface AdminResponse {
  isAdmin: boolean;
}

export interface AuthState {
  user: AuthUser;
  isAdmin: boolean;
}

export type OAuthProviderName = 'GOOGLE' | 'GITHUB';
