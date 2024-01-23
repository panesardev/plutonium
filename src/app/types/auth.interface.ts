import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
}

export interface LoginFormState {
  credentials: Credentials;
  type: LoginFormType;
}

export const initialState: LoginFormState = {
  type: 'LOGIN',
  credentials: {
    displayName: '',
    email: '',
    password: '',
  },
};

export type LoginFormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export type OAuthProviderName = 'google' | 'github';

export function getAuthProvider(providerName: OAuthProviderName): AuthProvider {
  switch (providerName) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}
