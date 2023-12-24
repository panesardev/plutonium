export interface AuthData extends LoginData, SignUpData, ResetPasswordData {}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  displayName: string;
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export type OAuthProviderName = 'google' | 'github';


