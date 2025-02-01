import { isDevMode } from "@angular/core";

export const BRAND = 'Plutonium';

export const BASE_URL = isDevMode() ? 'http://localhost:4200' : 'https://plutoniumx.vercel.app';

export const FIREBASE_CONFIG = { 
  apiKey: "AIzaSyAhtPk6Z8cs3-pODGzi06ntNstJJhUghWo",
  authDomain: "plutonium-dev.firebaseapp.com",
  projectId: "plutonium-dev",
  storageBucket: "plutonium-dev.appspot.com",
  messagingSenderId: "646715865874",
  appId: "1:646715865874:web:74ec7a6ed2672b672a91cb",
  measurementId: "G-93TF1DSJ0T"
};

export const SLUGS = [
  'deploy-angular-universal-to-vercel',
  'deploy-docker-image-on-heroku',
  'integrating-firebase-into-angular',
  'server-side-rendering-in-angular',
  'signals-rxjs-state-management',
  'simple-redux-pattern-in-angular',
  'simplified-http-services-with-typescript',
  'using-rxjs-with-react',
  'using-typescript-with-express',
];

export const FEATURED_ARTICLE_SLUG = 'signals-rxjs-state-management';

export const SOCIAL = {
  INSTAGRAM: 'https://www.instagram.com/panesar.dev/',
  GITHUB: 'https://github.com/panesardev/plutonium',
  YOUTUBE: 'https://www.youtube.com/@SukhpreetSingh-yz5kz/videos',
  TWITTER: 'https://twitter.com/panesardev',
};
