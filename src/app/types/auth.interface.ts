import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

export interface AuthData {
  displayName?: string;
  email?: string;
  password?: string;
  type?: FormType;
}

export type FormType = 'LOGIN' | 'CREATE_ACCOUNT' | 'RESET_PASSWORD';

export type OAuthProviderName = 'google' | 'github';

export const getAuthProvider = (name: OAuthProviderName) => {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}