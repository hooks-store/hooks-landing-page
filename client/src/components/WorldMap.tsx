import React, { useEffect, useMemo, useRef, useState } from 'react';

interface SaleActivity {
  id: string;
  creator: string;
  handle: string;
  city: string;
  amount: string;
  channel: string;
  flag: string;
  lat: number;
  lon: number;
}

interface GlobeDot {
  lat: number;
  lon: number;
  opacity: number;
  size: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  visible: boolean;
  depth: number;
}

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;
const GLOBE_CENTER_X = 420;
const GLOBE_CENTER_Y = 198;
const GLOBE_RADIUS = 148;
const GLOBE_CENTER_LAT = 13;

const SALES_ACTIVITY: SaleActivity[] = [
  { id: 'los-angeles', creator: 'Ava Torres', handle: '@avatorres', city: 'Los Angeles', amount: '$0.43', channel: 'Mobile', flag: '🇺🇸', lat: 34.0522, lon: -118.2437 },
  { id: 'new-york', creator: 'Noah Lee', handle: '@noahlee', city: 'New York', amount: '$0.20', channel: 'Desktop', flag: '🇺🇸', lat: 40.7128, lon: -74.0060 },
  { id: 'sao-paulo', creator: 'Lia Costa', handle: '@liacosta', city: 'Sao Paulo', amount: '$1.24', channel: 'Mobile', flag: '🇧🇷', lat: -23.5505, lon: -46.6333 },
  { id: 'london', creator: 'Mason Reid', handle: '@masonreid', city: 'London', amount: '$0.87', channel: 'Desktop', flag: '🇬🇧', lat: 51.5074, lon: -0.1278 },
  { id: 'lagos', creator: 'Ife Ayo', handle: '@ifeayo', city: 'Lagos', amount: '$1.10', channel: 'Mobile', flag: '🇳🇬', lat: 6.5244, lon: 3.3792 },
  { id: 'dubai', creator: 'Nora Salem', handle: '@norasalem', city: 'Dubai', amount: '$0.56', channel: 'Desktop', flag: '🇦🇪', lat: 25.2048, lon: 55.2708 },
  { id: 'singapore', creator: 'Kai Lim', handle: '@kailim', city: 'Singapore', amount: '$0.74', channel: 'Mobile', flag: '🇸🇬', lat: 1.3521, lon: 103.8198 },
  { id: 'sydney', creator: 'Mila Hart', handle: '@mila.h', city: 'Sydney', amount: '$1.89', channel: 'Mobile', flag: '🇦🇺', lat: -33.8688, lon: 151.2093 },
];

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

function pseudoNoise(a: number, b: number) {
  const hash = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return hash - Math.floor(hash);
}

function projectToGlobe(lat: number, lon: number, rotation: number): ProjectedPoint {
  const latRad = toRadians(lat);
  const lonDiffRad = toRadians(lon - rotation);
  const centerLatRad = toRadians(GLOBE_CENTER_LAT);

  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const sinCenterLat = Math.sin(centerLatRad);
  const cosCenterLat = Math.cos(centerLatRad);
  const cosLonDiff = Math.cos(lonDiffRad);
  const sinLonDiff = Math.sin(lonDiffRad);

  const depth = sinCenterLat * sinLat + cosCenterLat * cosLat * cosLonDiff;
  const visible = depth > 0;

  const x = GLOBE_CENTER_X + GLOBE_RADIUS * cosLat * sinLonDiff;
  const y =
    GLOBE_CENTER_Y -
    GLOBE_RADIUS * (cosCenterLat * sinLat - sinCenterLat * cosLat * cosLonDiff);

  return { x, y, visible, depth };
}

function pushRegionDots(
  dots: GlobeDot[],
  latMin: number,
  latMax: number,
  lonMin: number,
  lonMax: number,
  density: number
) {
  for (let lat = latMin; lat <= latMax; lat += 3.4) {
    for (let lon = lonMin; lon <= lonMax; lon += 3.4) {
      const random = pseudoNoise(lat, lon);
      if (random < density) {
        dots.push({
          lat,
          lon,
          opacity: 0.14 + random * 0.4,
          size: 0.7 + pseudoNoise(lat * 2.3, lon * 1.7) * 1.05,
        });
      }
    }
  }
}

function generateGlobeDots() {
  const dots: GlobeDot[] = [];

  // Rough continent masks using lat/lon regions.
  pushRegionDots(dots, 15, 71, -168, -52, 0.64); // North America
  pushRegionDots(dots, -55, 14, -81, -35, 0.59); // South America
  pushRegionDots(dots, 36, 71, -11, 42, 0.74); // Europe
  pushRegionDots(dots, -35, 37, -19, 52, 0.57); // Africa
  pushRegionDots(dots, 6, 76, 40, 171, 0.54); // Asia
  pushRegionDots(dots, -46, -10, 111, 155, 0.62); // Australia

  return dots;
}

export default function WorldMap() {
  const globeDots = useMemo(() => generateGlobeDots(), []);
  const [rotation, setRotation] = useState(-14);
  const [activeSaleId, setActiveSaleId] = useState(SALES_ACTIVITY[0].id);
  const [pulseCycle, setPulseCycle] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const visibleSaleIdsRef = useRef<string[]>([SALES_ACTIVITY[0].id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const intervalId = window.setInterval(() => {
      setRotation((prev) => (prev + 0.55) % 360);
    }, 80);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const intervalId = window.setInterval(() => {
      setActiveSaleId((current) => {
        const visibleIds = visibleSaleIdsRef.current;
        if (!visibleIds.length) return current;
        const currentIndex = visibleIds.indexOf(current);
        const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % visibleIds.length;
        return visibleIds[nextIndex];
      });
      setPulseCycle((prev) => prev + 1);
    }, 2300);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const projectedDots = useMemo(() => {
    return globeDots
      .map((dot) => {
        const point = projectToGlobe(dot.lat, dot.lon, rotation);
        if (!point.visible) return null;
        return {
          ...point,
          size: dot.size * (0.78 + point.depth * 0.25),
          opacity: dot.opacity * (0.68 + point.depth * 0.4),
        };
      })
      .filter((dot): dot is NonNullable<typeof dot> => dot !== null);
  }, [globeDots, rotation]);

  const projectedSales = useMemo(() => {
    return SALES_ACTIVITY.map((sale) => {
      const point = projectToGlobe(sale.lat, sale.lon, rotation);
      return { ...sale, ...point };
    });
  }, [rotation]);

  const visibleSales = projectedSales.filter((sale) => sale.visible);

  useEffect(() => {
    visibleSaleIdsRef.current = visibleSales.map((sale) => sale.id);
    if (!visibleSales.length) return;
    if (visibleSales.every((sale) => sale.id !== activeSaleId)) {
      setActiveSaleId(visibleSales[0].id);
    }
  }, [activeSaleId, visibleSales]);

  const activeSale =
    projectedSales.find((sale) => sale.id === activeSaleId && sale.visible) ??
    visibleSales[0] ??
    projectedSales[0];

  const toastLeft = (activeSale.x / MAP_WIDTH) * 100;
  const toastTop = (activeSale.y / MAP_HEIGHT) * 100;
  const toastOffsetX = activeSale.x > GLOBE_CENTER_X + 18 ? -222 : 20;
  const toastOffsetY = activeSale.y > GLOBE_CENTER_Y + 26 ? -142 : -104;

  return (
    <div className="relative w-full h-full">
      <style>{`
        @keyframes saleToastPop {
          0% {
            opacity: 0;
            transform: translateY(7px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .world-map-sale-toast-card {
          animation: saleToastPop 360ms ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .world-map-sale-toast-card {
            animation: none !important;
          }
        }
      `}</style>

      <svg viewBox="0 0 800 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeOcean" cx="50%" cy="42%" r="66%">
            <stop offset="0%" stopColor="#215178" stopOpacity="0.95" />
            <stop offset="64%" stopColor="#0B2C4A" stopOpacity="1" />
            <stop offset="100%" stopColor="#081D34" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="globeSpecular" cx="35%" cy="26%" r="48%">
            <stop offset="0%" stopColor="#6FA7D2" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#6FA7D2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4FA6EA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4FA6EA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="saleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx={GLOBE_CENTER_X} cy={GLOBE_CENTER_Y} r={GLOBE_RADIUS} />
          </clipPath>
        </defs>

        <ellipse
          cx={GLOBE_CENTER_X}
          cy={GLOBE_CENTER_Y}
          rx={GLOBE_RADIUS + 24}
          ry={GLOBE_RADIUS + 20}
          fill="url(#globeAtmosphere)"
          opacity="0.5"
        />

        <circle
          cx={GLOBE_CENTER_X}
          cy={GLOBE_CENTER_Y}
          r={GLOBE_RADIUS}
          fill="url(#globeOcean)"
        />

        <g clipPath="url(#globeClip)">
          <ellipse
            cx={GLOBE_CENTER_X + Math.sin(toRadians(rotation)) * 35}
            cy={GLOBE_CENTER_Y}
            rx={GLOBE_RADIUS * 0.95}
            ry={GLOBE_RADIUS * 1.02}
            fill="#04172A"
            opacity="0.28"
          />

          {projectedDots.map((dot, index) => (
            <circle
              key={`dot-${index}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill="#C9E0F4"
              opacity={dot.opacity}
            />
          ))}

          {projectedSales.map((sale) => {
            if (!sale.visible) return null;
            const isActiveSale = sale.id === activeSale.id;
            const sizeScale = 0.8 + sale.depth * 0.32;
            return (
              <g key={sale.id}>
                <circle
                  cx={sale.x}
                  cy={sale.y}
                  r={11 * sizeScale}
                  fill="url(#saleGlow)"
                  opacity={0.42}
                />
                <circle
                  cx={sale.x}
                  cy={sale.y}
                  r={2.9 * sizeScale}
                  fill="#4ADE80"
                  opacity={0.92}
                />
                {isActiveSale && !prefersReducedMotion && (
                  <circle
                    key={`${sale.id}-${pulseCycle}`}
                    cx={sale.x}
                    cy={sale.y}
                    r={3.2}
                    fill="none"
                    stroke="#86EFAC"
                    strokeWidth={1.5}
                    opacity={0.78}
                  >
                    <animate attributeName="r" values="3.2;19" dur="0.92s" repeatCount="1" />
                    <animate
                      attributeName="opacity"
                      values="0.78;0"
                      dur="0.92s"
                      repeatCount="1"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          <circle
            cx={GLOBE_CENTER_X}
            cy={GLOBE_CENTER_Y}
            r={GLOBE_RADIUS}
            fill="url(#globeSpecular)"
            opacity={0.9}
          />
        </g>

        <circle
          cx={GLOBE_CENTER_X}
          cy={GLOBE_CENTER_Y}
          r={GLOBE_RADIUS}
          fill="none"
          stroke="#7CB5DE"
          strokeOpacity="0.34"
          strokeWidth="1.2"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-[8] hidden md:block">
        <div className="absolute" style={{ left: `${toastLeft}%`, top: `${toastTop}%` }}>
          <div
            key={`${activeSale.id}-${pulseCycle}`}
            className="world-map-sale-toast-card w-[208px] rounded-xl border border-black/6 bg-white p-3 shadow-2xl"
            style={{ marginLeft: `${toastOffsetX}px`, marginTop: `${toastOffsetY}px` }}
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                $
              </span>
              <span>New sale</span>
            </div>
            <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2">
              <div className="text-[21px] font-bold leading-none text-gray-900">
                {activeSale.amount}
              </div>
              <div className="mt-1 text-[11px] font-medium text-gray-700">
                {activeSale.creator}
              </div>
              <div className="text-[10px] text-gray-500">{activeSale.handle}</div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
              <span>
                {activeSale.flag} {activeSale.city}
              </span>
              <span>{activeSale.channel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 z-[8] md:hidden">
        <div
          key={`${activeSale.id}-${pulseCycle}-mobile`}
          className="world-map-sale-toast-card w-[148px] rounded-lg border border-black/6 bg-white px-3 py-2 shadow-xl"
        >
          <div className="truncate text-[10px] font-semibold text-gray-600">
            New sale • {activeSale.flag} {activeSale.city}
          </div>
          <div className="truncate text-[16px] font-bold leading-tight text-gray-900">
            {activeSale.amount}{' '}
            <span className="text-[12px] font-medium text-gray-600">{activeSale.handle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
