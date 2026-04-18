const https = require('https');
const fs = require('fs');

https.get('https://raw.githubusercontent.com/djaiss/mapsicon/master/all/de/vector.svg', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    let match = data.match(/d="([^"]+)"/);
    if(match) {
      let path = match[1].replace(/\n/g, ' ');
      // Apply the mapsicon transform: transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
      // This means x' = 0 + 0.1 * x, y' = 1024 - 0.1 * y
      // Let's just create a raw SVG string that puts this path inside a <g> with transform.
      // Wait, we want to fit it in a 400x500 box without manual tweaking.
      // The mapsicon bounds are roughly: it's a 102.4 x 102.4 mapped icon.
      
      const component = `
/**
 * Decorative SVG map of Germany with premium glassmorphic styling
 * and glowing pins used as a background element.
 */
export function GermanyMapSvg({ className = "" }: { className?: string }) {
  // Dots for major cities, mapped against the 102.4x102.4 internal coordinates, scaled to fit.
  // We'll figure out a way to place them nicely or just use random ones within the path bounds.
  // For aesthetic value, we will just use the bounding box coordinates to position dots approximately.
  const dots = [
    { cx: 360, cy: 150, delay: "0s" },   // Berlin ish
    { cx: 200, cy: 180, delay: "0.5s" },
    { cx: 380, cy: 300, delay: "1.2s" },
    { cx: 160, cy: 260, delay: "0.2s" },
    { cx: 300, cy: 400, delay: "1.5s" }, // Munich ish
    { cx: 140, cy: 360, delay: "0.8s" }, // Stuttgart ish
    { cx: 200, cy: 300, delay: "1.0s" }, // Frankfurt ish
    { cx: 250, cy: 120, delay: "0.4s" }, // Hamburg ish
  ];

  return (
    <svg
      viewBox="0 0 500 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Premium Dark & Gold Fill */}
        <linearGradient id="germany-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(15, 23, 42, 0.7)" />
          <stop offset="50%" stopColor="rgba(251, 191, 36, 0.08)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0.4)" />
        </linearGradient>

        <linearGradient id="germany-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.4" />
        </linearGradient>

        {/* Glow effect for pins */}
        <filter id="glow-pin" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* CSS Animation for pulsing pins */}
        <style>
          {\`
            @keyframes pulse-dot {
              0% { r: 1.5; opacity: 1; fill: #FBBF24; drop-shadow: 0 0 8px #FBBF24; }
              50% { r: 3; opacity: 0.6; fill: #FDE68A; drop-shadow: 0 0 15px #FDE68A; }
              100% { r: 1.5; opacity: 1; fill: #FBBF24; drop-shadow: 0 0 8px #FBBF24; }
            }
            .pin-pulse {
              animation: pulse-dot 3s ease-in-out infinite;
            }
            @keyframes map-float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0px); }
            }
            .animate-float {
              animation: map-float 8s ease-in-out infinite;
            }
          \`}
        </style>
      </defs>

      <g className="animate-float">
        <g transform="translate(45, 25) scale(0.42, 0.42)">
          {/* Main map body with glass effect */}
          <path
            d="${path}"
            fill="url(#germany-gradient)"
            stroke="url(#germany-stroke)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]"
            transform="translate(0, 1024) scale(1, -1)"
          />
        </g>

        {/* Glowing city pins */}
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="1.5"
            fill="#FBBF24"
            filter="url(#glow-pin)"
            className="pin-pulse"
            style={{ animationDelay: dot.delay }}
          />
        ))}
      </g>
    </svg>
  );
}
`;
      fs.writeFileSync('./src/components/locations/germany-map-svg.tsx', component);
      console.log('Successfully updated component.');
    }
  });
});
