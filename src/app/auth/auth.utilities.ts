import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AdditionalUserData, OAuthProviderName } from "./auth.interface";

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
