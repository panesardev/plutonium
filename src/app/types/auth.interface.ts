import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
}

export type OAuthProviderName = 'google' | 'github';

export const getAuthProvider = (name: OAuthProviderName) => {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}