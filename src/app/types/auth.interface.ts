import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
}

export type LoginFormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

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

export type OAuthProviderName = 'google' | 'github';

export const getAuthProvider = (name: OAuthProviderName) => {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}