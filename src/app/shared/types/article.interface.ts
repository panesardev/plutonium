import frontmatter from 'front-matter';
import { DOMAIN } from '../../app.constants';

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

export function createArticle(content: string, slug: string): Article {
  const output = frontmatter<Article>(content);
  return {
    ...output.attributes,
    markdown: output.body,
    coverUrl: `/content/${slug}/img/cover.png`,
    url: `${DOMAIN}/articles/${slug}`,
  };
}

export function searchArticle(text: string, article: Article) {
  const searchIn = [
    article.title,
    article.description,
    ...article.hashtags,
  ];
  return searchIn.some(v => v.includes(text));
}

export function sortArticles(articles: Article[]) {
  return articles.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function slugify(text: string) {
  return text.toLowerCase().replaceAll(' ', '-');
}
