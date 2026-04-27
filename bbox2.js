const fs = require('fs');
const svg = fs.readFileSync('public/images/LOGO-SVG.svg', 'utf8');

// Find all paths
const paths = svg.matchAll(/<path d="([^"]+)"[^>]*transform="([^"]+)"/gi);

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

for (const match of paths) {
    const d = match[1];
    const transform = match[2];
    
    // parse transform
    let tx = 0, ty = 0;
    const translateMatch = transform.match(/translate\(([^,]+),([^\)]+)\)/);
    if (translateMatch) {
        tx = parseFloat(translateMatch[1]);
        ty = parseFloat(translateMatch[2]);
    }
    
    const numbers = d.match(/-?\d+(\.\d+)?/g);
    if (!numbers) continue;
    for (let i = 0; i < numbers.length; i += 2) {
        let x = parseFloat(numbers[i]) + tx;
        let y = parseFloat(numbers[i+1]) + ty;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
}

console.log(`Real Bounding Box: ${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
