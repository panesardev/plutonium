const sharp = require('sharp');
const fs = require('fs-extra');

const SLUGS = [
  'deploy-docker-image-on-heroku',
  'integrating-firebase-into-angular',
  'server-side-rendering-in-angular',
  'simple-redux-pattern-in-angular',
  'simplified-http-services-with-typescript',
  'using-rxjs-with-react',
  'using-typescript-with-express',
  'deploy-angular-universal-to-vercel'
];

const paths = SLUGS.map(slug => `./src/content/${slug}/img`);

// aspect ratio: 16/9
const sizes = [
  { width: 400, height: 225 },
  { width: 800, height: 450 },
];

async function main() {
  await remove();
  await generate();
}

async function generate() {
  for (const path of paths) {
    for (const { width, height } of sizes) {
      const selectPath = `${path}/cover.png`;
      const exportPath = `${path}/cover_${width}x${height}.webp`;
      
      await sharp(selectPath)
        .resize({ width, height })
        .webp({ lossless: true })
        .toFile(exportPath);
      
      console.log(`Image generated: ${exportPath}`);
    }
  }
}

async function remove() {
  for (const path of paths) {
    for (const size of sizes) {
      const removeImagePath = `${path}/cover_${size.width}x${size.height}.webp`;
      await fs.remove(removeImagePath);
    }
  }
}

main();