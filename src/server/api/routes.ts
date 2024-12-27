import { Router } from "express";
import { articlesRoutes } from "./articles.routes";
import { readdirSync } from "fs";

const router = Router();

router.get('/', (request, response) => {
  const files = readdirSync('./dist/plutonium/browser/articles').filter(filename => filename !== 'index.html');

  response.json(files);
});

router.use('/articles', articlesRoutes);

export { router as apiRoutes };
