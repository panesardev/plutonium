import { Article } from "@app/domains/articles/article.interface";
import frontmatter from 'front-matter';
import { readdirSync, readFileSync } from "fs";

export function getPath(): string {
  const local = process.env['NODE_ENV'] === 'development' || process.env['BUILD_MODE'] === 'true';
  return local ? 'src/content/articles' : './dist/plutonium/browser/content/articles';
}

export function getSlugs(): string[] {
  const files = readdirSync(getPath());
  return files.filter(file => file !== 'index.html');
}

export function getMarkdown(slug: string): string {
  return readFileSync(`${getPath()}/${slug}/index.md`).toString();
}

export function getArticles(): Article[] {
  return getSlugs()
    .map(slug => getArticle(slug))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(a => a.published);
}

export function getArticle(slug: string): Article {
  const markdown = getMarkdown(slug);
  const output = frontmatter<Article>(markdown);

  const article: Article = {
    ...output.attributes,
    markdown: output.body,
  };
  return article.published ? article : null;
}