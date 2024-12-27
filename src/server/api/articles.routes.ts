import { BASE_URL } from "@app/app.constants";
import { Article } from "@app/domains/articles/article.interface";
import { Router } from "express";
import frontmatter from 'front-matter';

const router = Router();

router.get('/', async (request, response) => {
  const slugs = await fetch(`${BASE_URL}/articles/slugs.txt`).then(res => res.text()).then(slugs => slugs.split('\n'));

  const markdowns = await Promise.all([
    ...slugs.map(slug => fetch(`${BASE_URL}/articles/${slug}/index.md`).then(res => res.text()))
  ]);

  const articles: Article[] = markdowns
    .map(markdown => {
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

router.get('/slugs', async (request, response) => {
  const slugs = await fetch(`${BASE_URL}/articles/slugs.txt`).then(res => res.text()).then(slugs => slugs.split(''));
  response.json(slugs);
});

router.get('/:slug', async (request, response) => {
  try {
    const slug = request.params.slug;
    const markdown = await fetch(`${BASE_URL}/articles/${slug}/index.md`).then(res => res.text());
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

