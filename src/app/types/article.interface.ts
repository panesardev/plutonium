export interface Article {
  title: string;
  description: string;
  hashtags: string[];
  createdAt: string;
  source: string;
  authorName: string;
  authorImage: string;
  authorLink: string;
  slug: string;
  markdown: string;
  coverUrl: string;
  url: string;
}

export interface Toc {
  id: string;
  text: string;
}

export function sortArticles(articles: Article[]): Article[] {
  return articles.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function slugify(heading: string): string {
  return heading.toLowerCase().replaceAll(' ', '-');
}
