import { Router } from "express";
import { articlesRoutes } from "./articles/article.routes";

const router = Router();

router.get('/', (request, response) => {
  response.json({
    message: 'hello world',
  });
});

router.use('/articles', articlesRoutes);

export { router as apiRoutes };

