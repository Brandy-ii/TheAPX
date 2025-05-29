const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const comicDir = path.join(rootDir, 'media', 'comic-pages');
const outputDir = path.join(rootDir, 'pages', 'comic-pages');
const relativeImgPath = '../../media/comic-pages/';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(comicDir).filter(file => /\.(png|jpe?g|gif)$/i.test(file));
files.sort();

files.forEach((file, index) => {
    const prevFile = index > 0 ? files[index - 1].replace(/\.\w+$/, '.html') : null;
    const nextFile = index < files.length - 1 ? files[index + 1].replace(/\.\w+$/, '.html') : null;
    const preloadImagePath = `${relativeImgPath}${file}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The APX - Page ${index + 1}</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="icon" href="../../media/logo.png">
    <link rel="preload" as="image" href="${preloadImagePath}">
</head>
<body>
    <div class="mobile-header">
        <a href="../../index.html" class="logo">
            <img src="../../media/logo.png" alt="The APX Logo">
        </a>
        <h1 class="mobile-title">The APX</h1>
        <p class="mobile-author">by: simulacrum</p>
    </div>

    <div class="comic-container">
        <img src="${preloadImagePath}" alt="Comic Page ${index + 1}">
    </div>

    <div class="nav-buttons">
        <div class="nav-col nav-empty"></div>

        <div class="nav-col nav-arrow">
            ${prevFile ? `<a class="nav-button" href="${prevFile}">◁</a>` : '<span class="nav-placeholder">◁</span>'}
        </div>

        <div class="nav-col nav-arrow">
            ${nextFile ? `<a class="nav-button" href="${nextFile}">▷</a>` : '<span class="nav-placeholder">▷</span>'}
        </div>

        <div class="nav-col nav-home">
            <a class="nav-button" href="../../index.html">Home</a>
        </div>
    </div>
</body>
</html>
    `.trim();

    const outputFileName = file.replace(/\.\w+$/, '.html');
    const outputFilePath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputFilePath, htmlContent, 'utf8');
});

console.log(`✅ Generated ${files.length} comic pages in /pages/comic-pages`);
