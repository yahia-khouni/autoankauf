const fs = require('fs');
const svg = fs.readFileSync('public/images/LOGO-SVG.svg', 'utf8');
const paths = svg.matchAll(/d="([^"]+)"/g);
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const match of paths) {
    const d = match[1];
    const numbers = d.match(/-?\d+(\.\d+)?/g);
    if (!numbers) continue;
    for (let i = 0; i < numbers.length; i += 2) {
        let x = parseFloat(numbers[i]);
        let y = parseFloat(numbers[i+1]);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
}
console.log(`Bounding Box: ${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
console.log(`minX: ${minX}, maxX: ${maxX}, minY: ${minY}, maxY: ${maxY}`);
