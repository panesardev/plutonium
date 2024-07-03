import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import { FIREBASE_CONFIG } from './app.constants';
import { routes } from './app.routes';

initializeFirebaseApp(FIREBASE_CONFIG);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withFetch()),
  ],
};
