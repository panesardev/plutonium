import { readdirSync, readFileSync } from "fs";

export function getSlugs() {
  const isBuildTime = process.env['BUILD_MODE'] === 'true';
  const files = readdirSync(isBuildTime ? 'src/content/articles' : './dist/plutonium/browser/content/articles');
  return files.filter(file => file !== 'index.html');
}

export function getMarkdown(slug: string) {
  const isBuildTime = process.env['BUILD_MODE'] === 'true';
  const path = isBuildTime ? `src/content/articles` : `./dist/plutonium/browser/content/articles`;
  const markdown = readFileSync(`${path}/${slug}/index.md`).toString();
  return markdown;
}
