import { Article } from "@app/domains/articles/article.interface";
import { Router } from "express";
import frontmatter from 'front-matter';
import { getMarkdown, getSlugs } from "./article.util";

const router = Router();

router.get('/', (request, response) => {
  const slugs = getSlugs();

  const articles: Article[] = slugs
    .map(slug => {
      const markdown = getMarkdown(slug);
      const output = frontmatter<Article>(markdown);

      return {
        ...output.attributes,
        markdown: output.body,
      };
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .filter(a => a.published);

  response.json(articles);
});

router.get('/slugs', (request, response) => {
  const slugs = getSlugs();
  response.json(slugs);
});

router.get('/:slug', (request, response) => {
  try {
    const slug = request.params.slug;
    const markdown = getMarkdown(slug);
    const output = frontmatter<Article>(markdown);
  
    const article: Article = {
      ...output.attributes,
      markdown: output.body,
    };
  
    if (article.published) {
      response.json(article);
    } 
    else {
      response.json(null);
    }
  } catch {
    response.json(null);
  }
});

export { router as articlesRoutes };
