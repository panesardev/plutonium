import { AuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from "@angular/fire/auth";

export function getAuthProvider(providerId: string): AuthProvider {
  if (providerId === 'google.com') {
    return new GoogleAuthProvider();
  }
  if (providerId === 'github.com') {
    return new GithubAuthProvider();
  }
  if (providerId === 'facebook.com') {
    return new FacebookAuthProvider();
  }
  return null;
}
