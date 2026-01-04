/**
 * Genera tutte le favicon necessarie da un'immagine sorgente.
 *
 * ISTRUZIONI:
 * 1. Posiziona la nuova immagine in: src/assets/favicon/source.png
 *    - Formato: PNG, minimo 512x512px, quadrata
 * 2. Esegui: npm run favicon
 *
 * FILE GENERATI:
 * - favicon.ico (32x32) - Browser legacy
 * - apple-touch-icon.png (180x180) - iOS home screen
 * - icon-192.png (192x192) - Android/PWA
 * - icon-512.png (512x512) - Android/PWA splash screen
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE = path.join(__dirname, '../src/assets/favicon/source.png');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/favicon');

async function generate() {
  // Verifica che il file sorgente esista
  if (!fs.existsSync(SOURCE)) {
    console.error('Errore: file sorgente non trovato!');
    console.error('Posiziona la nuova immagine in: src/assets/favicon/source.png');
    process.exit(1);
  }

  // Verifica dimensioni minime
  const metadata = await sharp(SOURCE).metadata();
  if (metadata.width < 512 || metadata.height < 512) {
    console.error(`Errore: immagine troppo piccola (${metadata.width}x${metadata.height})`);
    console.error('Dimensione minima richiesta: 512x512px');
    process.exit(1);
  }

  console.log(`Sorgente: ${metadata.width}x${metadata.height} ${metadata.format}\n`);

  // Configurazione delle favicon da generare
  const sizes = [
    { name: 'favicon.ico', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const outputPath = path.join(OUTPUT_DIR, name);
    await sharp(SOURCE)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 90 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ ${name} (${size}x${size}) - ${(stats.size / 1024).toFixed(1)}KB`);
  }

  console.log('\nFavicon generate con successo!');
}

generate().catch((err) => {
  console.error('Errore:', err.message);
  process.exit(1);
});
