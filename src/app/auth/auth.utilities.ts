import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AdditionalUserData, AuthState, OAuthProviderName } from "./auth.interface";

export const initialState: AuthState = {
  user: null,
  isAdmin: false,
};

export function createUserData(): AdditionalUserData {
  return {
    created: new Date().toDateString().slice(3),
    slugs: [],
  };
}

export function getAuthProvider(name: OAuthProviderName) {
  switch (name) {
    case 'GOOGLE': return new GoogleAuthProvider();
    case 'GITHUB': return new GithubAuthProvider();
  }
}
