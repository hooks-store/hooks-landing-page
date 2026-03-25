import React, { useMemo } from 'react';

export default function WorldMap() {
  const dots = useMemo(() => generateAllDots(), []);

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes dashFlow {
            to { stroke-dashoffset: -40; }
          }
          .arc-flow {
            animation: dashFlow 3s linear infinite;
          }
        `}</style>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8930C" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E8930C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Arc connections - orange curved lines with flowing animation */}
      <path d="M200,170 Q350,60 550,180" fill="none" stroke="#E8930C" strokeWidth="1.5" opacity="0.5" strokeDasharray="8,6" className="arc-flow" />
      <path d="M250,150 Q450,30 650,160" fill="none" stroke="#E8930C" strokeWidth="1.2" opacity="0.35" strokeDasharray="6,8" className="arc-flow" style={{ animationDelay: '-1s' }} />
      <path d="M180,200 Q380,100 580,220" fill="none" stroke="#E8930C" strokeWidth="1" opacity="0.25" strokeDasharray="4,10" className="arc-flow" style={{ animationDelay: '-2s' }} />

      {/* Hotspot glows */}
      <circle cx="200" cy="130" r="12" fill="url(#dotGlow)" opacity="0.6" />
      <circle cx="380" cy="90" r="10" fill="url(#dotGlow)" opacity="0.5" />
      <circle cx="550" cy="130" r="14" fill="url(#dotGlow)" opacity="0.4" />
      <circle cx="620" cy="290" r="8" fill="url(#dotGlow)" opacity="0.4" />

      {/* Continent dots */}
      {dots}
    </svg>
  );
}

function generateAllDots() {
  const allDots: React.JSX.Element[] = [];
  const spacing = 6;

  // North America
  addRegionDots(allDots, 100, 60, 220, 160, 0.65, spacing);
  // South America
  addRegionDots(allDots, 200, 210, 100, 160, 0.55, spacing);
  // Europe
  addRegionDots(allDots, 340, 55, 120, 100, 0.75, spacing);
  // Africa
  addRegionDots(allDots, 360, 165, 90, 150, 0.5, spacing);
  // Asia
  addRegionDots(allDots, 460, 55, 230, 170, 0.55, spacing);
  // Australia
  addRegionDots(allDots, 590, 270, 100, 70, 0.5, spacing);

  return allDots;
}

function addRegionDots(
  dots: React.JSX.Element[],
  startX: number,
  startY: number,
  width: number,
  height: number,
  density: number,
  spacing: number
) {
  for (let x = startX; x < startX + width; x += spacing) {
    for (let y = startY; y < startY + height; y += spacing) {
      const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const val = hash - Math.floor(hash);
      if (val < density) {
        const opacity = 0.3 + val * 0.5;
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={1.5}
            fill="#E8930C"
            opacity={opacity}
          />
        );
      }
    }
  }
}
