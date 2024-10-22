import { GithubAuthProvider, GoogleAuthProvider } from "@angular/fire/auth";
import { AdditionalUserData, AuthProviderName } from "./auth.interface";

export function createUserData(): AdditionalUserData {
  return {
    articles: [],
  };
}

export function getAuthProvider(name: AuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}
