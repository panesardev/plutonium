import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { FIREBASE_CONFIG } from './app.constants';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ),
    provideMarkdown(),
  ],
};
