import { Router } from "express";
import { articlesRoutes } from "./articles/article.routes";
import { readdirSync } from "fs";

const router = Router();

router.get('/', (request, response) => {
  const files = readdirSync('./dist/plutonium/browser/content/articles');

  response.json({
    files,
  });
});

router.use('/articles', articlesRoutes);

export { router as apiRoutes };
