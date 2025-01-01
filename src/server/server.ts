import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { apiRoutes } from './routes';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const server = express();
const engine = new AngularNodeAppEngine();

server.use(compression());

server.use('/api', apiRoutes);

server.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false,
}));

server.use('/**', (request, response, next) => {
  engine
    .handle(request)
    .then(res => res ? writeResponseToNodeResponse(res, response) : next())
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;

  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  });
}

export const reqHandler = createNodeRequestHandler(server);
