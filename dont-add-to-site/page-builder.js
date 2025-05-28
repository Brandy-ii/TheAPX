const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');  // Go up from /dont-add-to-site
const comicDir = path.join(rootDir, 'media', 'comic-pages');
const outputDir = path.join(rootDir, 'pages');
const relativeImgPath = '../media/comic-pages/';  // From /pages/ to images

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(comicDir).filter(file => {
    return /\.(png|jpe?g|gif)$/i.test(file);
});

files.sort();

files.forEach((file, index) => {
    const prevFile = index > 0 ? files[index - 1].replace(/\.\w+$/, '.html') : null;
    const nextFile = index < files.length - 1 ? files[index + 1].replace(/\.\w+$/, '.html') : null;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TheAPX - Page ${index + 1}</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="icon" href="../media/logo.png">
</head>
<body>
    <div class="comic-container">
        <img src="${relativeImgPath}${file}" alt="Comic Page ${index + 1}">
    </div>
    <div class="nav-buttons">
        ${prevFile ? `<a href="${prevFile}">Previous</a>` : ''}
        ${nextFile ? `<a href="${nextFile}">Next</a>` : ''}
        <a href="../index.html">Home</a>
    </div>
</body>
</html>
    `.trim();

    const outputFileName = file.replace(/\.\w+$/, '.html');
    const outputPath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputPath, htmlContent, 'utf8');
});

console.log(`✅ Generated ${files.length} comic pages in /pages`);
