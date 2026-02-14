import { mergeApplicationConfig } from '@angular/core';
import { appConfig } from '../app/app.config';
import { serverRoutes } from './app.routes.server';
import { provideServerRendering, withRoutes } from '@angular/ssr';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
  ],
});
