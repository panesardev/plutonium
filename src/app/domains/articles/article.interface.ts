export interface Article {
  title: string;
  description: string;
  hashtags: string[];
  createdAt: string;
  source: string;
  authorName: string;
  authorImage: string;
  authorLink: string;
  published: boolean;
  slug: string;
  markdown: string;
  coverUrl: string;
  url: string;
}

export interface Toc {
  id: string;
  text: string;
}
