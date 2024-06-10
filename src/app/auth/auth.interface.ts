import type { User } from 'firebase/auth';

export interface AuthUser extends User, AuthUserData {}

export interface AuthUserData {
  slugs: string[];
  created: string;
}

export interface AdminResponse {
  isAdmin: boolean;
}

export type OAuthProviderName = 'google' | 'github';
