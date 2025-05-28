const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const comicDir = path.join(rootDir, 'media', 'comic-pages');   // Image source
const outputDir = path.join(rootDir, 'pages', 'comic-pages');  // ✅ HTML output
const relativeImgPath = '../../media/comic-pages/';            // ✅ From HTML to image

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });              // ✅ Ensure nested folders
}

const files = fs.readdirSync(comicDir).filter(file => /\.(png|jpe?g|gif)$/i.test(file));

files.sort();

files.forEach((file, index) => {
    const prevFile = index > 0 ? files[index - 1].replace(/\.\w+$/, '.html') : null;
    const nextFile = index < files.length - 1 ? files[index + 1].replace(/\.\w+$/, '.html') : null;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>The APX - Page ${index + 1}</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="icon" href="../../media/logo.png">
</head>
<body>

    <div class="comic-container">
        <img src="${relativeImgPath}${file}" alt="Comic Page ${index + 1}">
    </div>

<div class="nav-buttons">
    <div class="nav-arrows">
        ${prevFile ? `<a href="${prevFile}">◁</a>` : ''}
        ${nextFile ? `<a href="${nextFile}">▷</a>` : ''}
    </div>
    <div class="nav-home">
        <a href="../../index.html">Home</a>
    </div>
</div>

</body>
</html>
    `.trim();

    const outputFileName = file.replace(/\.\w+$/, '.html');
    const outputPath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputPath, htmlContent, 'utf8');
});

console.log(`✅ Generated ${files.length} comic pages in /pages/comic-pages`);
