import { Router } from "express";
import { getArticle, getArticles, getSlugs } from "./article.util";
import { FEATURED_ARTICLE_SLUG } from "@app/app.constants";

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

router.get('/featured', (request, response) => {
  try {
    const article = getArticle(FEATURED_ARTICLE_SLUG);
    response.json(article);
  } 
  catch (e) {
    console.error(e);
    response.json(null);
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
