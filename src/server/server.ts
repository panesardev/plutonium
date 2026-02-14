import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const server = express();
const angularApp = new AngularNodeAppEngine();

server.get('/api/{*splat}', (request, response) => {
  response.json({
    message: request.path,
  });
});

server.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false,
}));

server.use((request, response, next) =>
  angularApp
    .handle(request)
    .then(res => res ? writeResponseToNodeResponse(res, response) : next())
    .catch(next),
);

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4200;
  
  server.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`),
  );
}

export const reqHandler = createNodeRequestHandler(server);
