import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Article } from "../types/article.interface";
import { OAuthProviderName } from "../types/auth.interface";

export function sortArticles(articles: Article[]) {
  return articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function slugify(heading: string) {
  return heading.toLowerCase().replace(' ', '-');
}

export function getAuthProvider(providerName: OAuthProviderName): AuthProvider {
  switch (providerName) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}
