import frontmatter from 'front-matter';
import { Article } from './article.interface';

export function createArticle(markdown: string): Article {
  const output = frontmatter<Article>(markdown);
  return {
    ...output.attributes,
    markdown: output.body,
  };
}

export function sortArticles(articles: Article[]) {
  return articles.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}