export const constants = {
  brand: 'Plutonium',
  description: 'Next generation coding tutorials',
  slugs: [
    "deploy-docker-image-on-heroku",
    "integrating-firebase-into-angular",
    "server-side-rendering-in-angular",
    "simple-redux-pattern-in-angular",
    "simplified-http-services-with-typescript",
    "using-rxjs-with-react",
    "using-typescript-with-express",
    "deploy-angular-universal-to-vercel"
  ],
  get featuredArticleSlug(): string {
    return this.slugs[1];
  },
  social: {
    instagram: 'https://www.instagram.com/panesarpbx8/',
    github: 'https://github.com/panesarpbx8/plutonium',
    youtube: 'https://www.youtube.com/channel/UC5-cUtWK5_P3UoV4qfB6SCg',
    twitter: 'https://twitter.com/panesarpbx8',
  },
};