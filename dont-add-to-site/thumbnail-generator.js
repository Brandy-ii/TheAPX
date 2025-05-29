const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'media', 'comic-pages-large');
const outputDir = path.join(__dirname, '..', 'media', 'comic-pages');

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(file =>
    /\.(png|jpe?g)$/i.test(file)
);

files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
        .resize({ width: 580 })
        .toFile(outputPath)
        .then(() => console.log(`✅ Thumbnail created: ${file}`))
        .catch(err => console.error(`❌ Error processing ${file}:`, err));
});
