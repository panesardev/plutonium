import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
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

const firebase = initializeFirebaseApp(FIREBASE_CONFIG);

export const Auth = new InjectionToken('firebase auth', {
  providedIn: 'root',
  factory: () => getAuth(firebase),
}); 

export const Firestore = new InjectionToken('firebase firestore', {
  providedIn: 'root',
  factory: () => getFirestore(firebase),
}); 
