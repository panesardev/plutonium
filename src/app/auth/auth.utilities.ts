import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AdditionalUserData, AuthProviderName } from "./auth.interface";

export function createUserData(): AdditionalUserData {
  return {
    created: new Date().toDateString(),
  };
}

export function getAuthProvider(name: AuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
    default: throw Error('Auth provider not supported');
  }
}
