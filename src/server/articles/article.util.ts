import { readdirSync, readFileSync } from "fs";

export function getSlugs() {
  const local = process.env['NODE_ENV'] === 'development' || process.env['BUILD_MODE'] === 'true';
  const files = readdirSync(local ? 'src/content/articles' : './dist/plutonium/browser/content/articles');
  return files.filter(file => file !== 'index.html');
}

export function getMarkdown(slug: string) {
  const local = process.env['NODE_ENV'] === 'development' || process.env['BUILD_MODE'] === 'true';
  const path = local ? `src/content/articles` : `./dist/plutonium/browser/content/articles`;
  const markdown = readFileSync(`${path}/${slug}/index.md`).toString();
  return markdown;
}
