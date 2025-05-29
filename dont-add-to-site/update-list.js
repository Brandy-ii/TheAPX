const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const comicDir = path.join(rootDir, 'media', 'comic-pages');    // ✅ source images
const outputPath = path.join(rootDir, 'pages', 'list.html');

const files = fs.readdirSync(comicDir).filter(file => /\.(png|jpe?g|gif)$/i.test(file));

files.sort();

const gridItems = files.map((file, index) => {
    const pageName = `comic-pages/${file.replace(/\.\w+$/, '.html')}`;
    const imgSrc = `../media/thumbnails/${file}`;
    return `
    <a href="${pageName}">
        <img src="${imgSrc}" alt="Page ${index + 1}">
        <div class="page-label">Page ${index + 1}</div>
    </a>
    `.trim();
}).join('\n');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Comic List</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="icon" href="../../media/logo.png">
</head>
<body>
    <div class="static-logo">
            <a href="index.html">
        <img src="../media/logo.png" alt="The APX Logo">
    </a>
    </div>

    <h1>The APX</h1>

    <div class="menu-buttons">
        <a class="menu-button" href="../index.html">Home</a>
    </div>

    <div class="comic-grid">
        ${gridItems}
    </div>
</body>
</html>
`.trim();

fs.writeFileSync(outputPath, htmlContent, 'utf8');

console.log(`✅ Generated list.html with ${files.length} thumbnails and labels.`);
