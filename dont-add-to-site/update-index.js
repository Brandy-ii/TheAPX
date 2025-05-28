const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const comicDir = path.join(rootDir, 'media', 'comic-pages');
const indexPath = path.join(rootDir, 'index.html');

const files = fs.readdirSync(comicDir).filter(file => {
    return /\.(png|jpe?g|gif)$/i.test(file);
});

files.sort();

const listItems = files.map((file, index) => {
    const pageName = file.replace(/\.\w+$/, '.html');
    return `<li><a href="pages/${pageName}">Page ${index + 1}</a></li>`;
}).join('\n');

// Read index.html
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace between markers
const startMarker = '<!-- COMIC LIST START -->';
const endMarker = '<!-- COMIC LIST END -->';

const startIdx = indexHtml.indexOf(startMarker) + startMarker.length;
const endIdx = indexHtml.indexOf(endMarker);

if (startIdx < 0 || endIdx < 0) {
    console.error('Markers not found in index.html!');
    process.exit(1);
}

const newHtml = indexHtml.slice(0, startIdx) + '\n<ul>\n' + listItems + '\n</ul>\n' + indexHtml.slice(endIdx);

fs.writeFileSync(indexPath, newHtml, 'utf8');

console.log(`✅ Updated index.html with ${files.length} comic pages.`);
