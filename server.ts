import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import compression from 'compression';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(compression());

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  server.get('/api/**', (req, res) => res.json({ message: 'Hello world' }));
  
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (request, response, next) => {
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${request.protocol}://${request.headers.host}${request.originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: request.baseUrl },
        ],
      })
      .then(html => response.send(html))
      .catch(err => next(err));
  });

  return server;
}

function run(): void {
  const PORT = process.env['PORT'] || 4200;

  app().listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

run();
