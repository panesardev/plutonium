export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
}

export interface LoginFormState {
  credentials: Credentials;
  type: LoginFormType;
}

export type LoginFormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export type OAuthProviderName = 'google' | 'github';
