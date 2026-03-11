/**
 * Image compression script for Billy & Sarah wedding site
 * 
 * HOW TO USE:
 * 1. Copy this file to your project root
 * 2. Run: npm install sharp
 * 3. Run: node compress-images.js
 * 4. Compressed images will be saved to public/images/
 * 
 * This will reduce each photo from ~4-8MB down to ~150-400KB
 * while keeping them looking beautiful on screen.
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

const INPUT_DIR  = './src/assets/images';
const OUTPUT_DIR = './public/images';

// Create output dir if it doesn't exist
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(extname(f))
);

console.log(`\n🖼️  Found ${files.length} images to compress...\n`);

let totalBefore = 0;
let totalAfter  = 0;

for (const file of files) {
  const inputPath  = join(INPUT_DIR, file);
  const outputName = basename(file, extname(file)).toLowerCase() + '.jpg';
  const outputPath = join(OUTPUT_DIR, outputName);

  const beforeSize = statSync(inputPath).size;
  totalBefore += beforeSize;

  try {
    await sharp(inputPath)
      .resize({
        width: 1920,        // Max width — enough for full-screen hero
        height: 1280,       // Max height
        fit: 'inside',      // Never upscale, maintain aspect ratio
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 82,        // 82% = visually near-identical, ~70% smaller file
        progressive: true,  // Progressive JPEG = appears to load faster
        mozjpeg: true,      // Best compression algorithm
      })
      .toFile(outputPath);

    const afterSize = statSync(outputPath).size;
    totalAfter += afterSize;

    const saved = Math.round((1 - afterSize / beforeSize) * 100);
    const beforeMB = (beforeSize / 1024 / 1024).toFixed(1);
    const afterKB  = Math.round(afterSize / 1024);

    console.log(`✅ ${file}`);
    console.log(`   ${beforeMB}MB → ${afterKB}KB  (${saved}% smaller) → ${outputName}`);
  } catch (err) {
    console.error(`❌ Failed: ${file}`, err.message);
  }
}

const totalBeforeMB = (totalBefore / 1024 / 1024).toFixed(1);
const totalAfterMB  = (totalAfter  / 1024 / 1024).toFixed(1);
const totalSaved    = Math.round((1 - totalAfter / totalBefore) * 100);

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`📦 Total before: ${totalBeforeMB}MB`);
console.log(`📦 Total after:  ${totalAfterMB}MB`);
console.log(`🚀 Total saved:  ${totalSaved}%`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`\n✨ Done! Images are in: ${OUTPUT_DIR}`);
console.log(`   Image filenames are now lowercase .jpg`);
console.log(`   Update your component imports if needed.\n`);