const fs = require('fs');
let code = fs.readFileSync('src/components/locations/germany-map-svg.tsx', 'utf-8');

code = code.replace(/<g transform="translate\(45, 25\) scale\(0.42, 0.42\)">/, '');
code = code.replace(/transform="translate\(0, 1024\) scale\(1, -1\)"/, 'transform="translate(0, 1024) scale(0.1, -0.1)"');
code = code.replace(/<\/g>\s+{\/\* Glowing city pins/, '  {/* Glowing city pins');

// Also update the viewBox
code = code.replace(/viewBox="0 0 500 650"/, 'viewBox="0 -100 1024 1200"');

// And update the dots to the new coordinate system (approx 1024x1024)
// Previously: cx: 360, cy: 150 (roughly inside 0-500 x 0-650 mapped to 1024x1024)
// Now x -> x * 2.05 + 0, y -> y * 1.5 + (-100). Or manually:
code = code.replace(/cx: 360, cy: 150/g, 'cx: 740, cy: 200'); // Berlin
code = code.replace(/cx: 200, cy: 180/g, 'cx: 410, cy: 270');
code = code.replace(/cx: 380, cy: 300/g, 'cx: 780, cy: 450');
code = code.replace(/cx: 160, cy: 260/g, 'cx: 330, cy: 390');
code = code.replace(/cx: 300, cy: 400/g, 'cx: 620, cy: 600'); // Munich ish
code = code.replace(/cx: 140, cy: 360/g, 'cx: 290, cy: 540');
code = code.replace(/cx: 200, cy: 300/g, 'cx: 410, cy: 450'); // Frankfurt ish
code = code.replace(/cx: 250, cy: 120/g, 'cx: 510, cy: 180'); // Hamburg ish

// Update stroke widths to match new coordinate scaling
code = code.replace(/strokeWidth="3.5"/, 'strokeWidth="10"');
code = code.replace(/r="1.5"/g, 'r="6"');
code = code.replace(/@keyframes pulse-dot \{\n\s+0% \{ r: 1.5; opacity: 1; fill: #FBBF24; drop-shadow: 0 0 8px #FBBF24; \}\n\s+50% \{ r: 3; opacity: 0.6; fill: #FDE68A; drop-shadow: 0 0 15px #FDE68A; \}\n\s+100% \{ r: 1.5; opacity: 1; fill: #FBBF24; drop-shadow: 0 0 8px #FBBF24; \}/, 
'@keyframes pulse-dot {\n              0% { r: 6; opacity: 1; fill: #FBBF24; drop-shadow: 0 0 12px #FBBF24; }\n              50% { r: 12; opacity: 0.6; fill: #FDE68A; drop-shadow: 0 0 25px #FDE68A; }\n              100% { r: 6; opacity: 1; fill: #FBBF24; drop-shadow: 0 0 12px #FBBF24; }');

// Add fill to the pulse dots keyframe logic
code = code.replace(/drop-shadow-\[0_0_20px_rgba\(251,191,36,0.15\)\]\"/, 'drop-shadow-[0_0_40px_rgba(251,191,36,0.15)]"');

fs.writeFileSync('src/components/locations/germany-map-svg.tsx', code);
