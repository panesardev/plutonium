import frontmatter from 'front-matter';
import { BASE_URL } from '@app/app.constants';
import { Article } from './article.interface';

export function createArticle(markdown: string, slug: string): Article {
  const output = frontmatter<Article>(markdown);
  return {
    ...output.attributes,
    markdown: output.body,
    coverUrl: `/articles/${slug}/img/cover.png`,
    url: `${BASE_URL}/articles/${slug}`,
  };
}

export function sortArticles(articles: Article[]) {
  return articles.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
