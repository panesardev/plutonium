import type { User as FirebaseUser } from '@angular/fire/auth';

export interface User extends FirebaseUser, AdditionalUserData {}

export interface AdditionalUserData {
  articles: string[];
}

export type AuthFormType = 'login' | 'create-account' | 'reset-password';
