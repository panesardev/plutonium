import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
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

initializeFirebaseApp({ 
  apiKey: "AIzaSyAhtPk6Z8cs3-pODGzi06ntNstJJhUghWo",
  authDomain: "plutonium-dev.firebaseapp.com",
  projectId: "plutonium-dev",
  storageBucket: "plutonium-dev.appspot.com",
  messagingSenderId: "646715865874",
  appId: "1:646715865874:web:74ec7a6ed2672b672a91cb",
  measurementId: "G-93TF1DSJ0T"
});
