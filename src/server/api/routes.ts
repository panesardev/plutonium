import { Router } from "express";
import { articlesRoutes } from "./articles.routes";
import { readdirSync } from "fs";

const router = Router();

router.get('/', (request, response) => {
  const files = readdirSync('.');

  const dirname = __dirname;

  response.json({
    dirname,
    files,
  });
});

router.use('/articles', articlesRoutes);

export { router as apiRoutes };
