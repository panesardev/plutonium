import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './app.constants';
import { routes } from './app.routes';

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

export const firebase = initializeApp(FIREBASE_CONFIG);

export const FIRESTORE = new InjectionToken('FIRESTORE', {
  providedIn: 'root',
  factory: () => getFirestore(firebase),
});

export const AUTH = new InjectionToken('AUTH', {
  providedIn: 'root',
  factory: () => getAuth(firebase),
});
