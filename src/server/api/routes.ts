import { Router } from "express";
import { articlesRoutes } from "./articles.routes";
import { readdirSync } from "fs";

const router = Router();

router.get('/', async (request, response) => {
  const slugs = readdirSync('./dist/plutonium/browser/articles').filter(filename => filename !== 'index.html');

  const articles = await Promise.all([
    ...slugs.map(slug => fetch(`/articles/${slug}/index.md`).then(res => res.text())),
  ]);

  response.json(articles);
});

router.use('/articles', articlesRoutes);

export { router as apiRoutes };
