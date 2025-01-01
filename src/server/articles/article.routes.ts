import { Router } from "express";
import { getArticle, getArticles, getSlugs } from "./article.util";

const router = Router();

router.get('/', (request, response) => {
  try {
    const articles = getArticles();
    response.json(articles);
  }
  catch (e) {
    console.error(e);
    response.json([]);
  }
});

router.get('/slugs', (request, response) => {
  try {
    const slugs = getSlugs();
    response.json(slugs);
  }
  catch (e) {
    console.error(e);
    response.json([]);
  }
});

router.get('/:slug', (request, response) => {
  try {
    const article = getArticle(request.params.slug);
    response.json(article);
  } 
  catch (e) {
    console.error(e);
    response.json(null);
  }
});

export { router as articlesRoutes };
