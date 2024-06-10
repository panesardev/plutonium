import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthUserData, OAuthProviderName } from "./auth.interface";

export function createAuthUserData(): AuthUserData {
  return {
    slugs: [],
    created: new Date().toDateString().slice(3),
  };
}

export function getAuthProvider(name: OAuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}
