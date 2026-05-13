import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const creators = [
  {
    name: 'Liam Parker',
    handle: '@liamparker',
    followers: '1M',
    bio: {
      en: 'ALL MY LINKS',
      es: 'TODOS MIS LINKS',
    },
    image: '/images/local-photos/photo-1500648767791-00dcc994a43e-1200-99f81473.jpg',
    imagePosition: 'center 20%',
    socials: ['IG', 'X', 'TT', 'FB', 'YT', 'TH'],
  },
  {
    name: 'Julia Ross',
    handle: '@juliaross',
    followers: '789K',
    bio: {
      en: 'Beauty, style and daily routines',
      es: 'Belleza, estilo y rutinas diarias',
    },
    image: '/images/local-photos/photo-1494790108377-be9c29b29330-1200-bbdec97e.jpg',
    imagePosition: 'center 18%',
    socials: ['SP', 'IG', 'X', 'FB', 'LI', 'YT', 'TT'],
  },
  {
    name: 'Noah Brooks',
    handle: '@noahbrooks',
    followers: '512K',
    bio: {
      en: 'Street culture and travel stories',
      es: 'Cultura urbana e historias de viaje',
    },
    image: '/images/local-photos/photo-1535713875002-d1d0cf377fde-1200-d30a6dcf.jpg',
    imagePosition: 'center 22%',
    socials: ['IG', 'X', 'TT', 'FB', 'YT'],
  },
  {
    name: 'Mia Collins',
    handle: '@miacollins',
    followers: '300K',
    bio: {
      en: 'Creator tips, wellness and vlogs',
      es: 'Tips para creadores, bienestar y vlogs',
    },
    image: '/images/local-photos/photo-1517841905240-472988babdf9-1200-b0feb1ce.jpg',
    imagePosition: 'center 25%',
    socials: ['IG', 'X', 'YT', 'TT'],
  },
  {
    name: 'Ethan Ross',
    handle: '@ethanross',
    followers: '100K',
    bio: {
      en: 'Fitness, productivity and business',
      es: 'Fitness, productividad y negocio',
    },
    image: '/images/local-photos/photo-1521572267360-ee0c2909d518-1200-501e2bde.jpg',
    imagePosition: 'center 30%',
    socials: ['TT', 'FB', 'X', 'YT', 'LI', 'IG'],
  },
  {
    name: 'Sofia Patel',
    handle: '@sofiapatel',
    followers: '436K',
    bio: {
      en: 'Fashion editorials and city moments',
      es: 'Editoriales de moda y momentos en la ciudad',
    },
    image: '/images/local-photos/photo-1487412720507-e7ab37603c6f-1200-e790b598.jpg',
    imagePosition: 'center 18%',
    socials: ['IG', 'YT', 'TT', 'X'],
  },
  {
    name: 'Daniel Reed',
    handle: '@danielreed',
    followers: '684K',
    bio: {
      en: 'Founder life and creator economy',
      es: 'Vida de fundador y economía de creadores',
    },
    image: '/images/local-photos/photo-1507003211169-0a1dd7228f2d-1200-1b611f5a.jpg',
    imagePosition: 'center 18%',
    socials: ['IG', 'TT', 'YT', 'X'],
  },
  {
    name: 'Isabella Cruz',
    handle: '@isabellacruz',
    followers: '257K',
    bio: {
      en: 'Lifestyle shoots and travel diaries',
      es: 'Estilo de vida, sesiones y diarios de viaje',
    },
    image: '/images/local-photos/photo-1524504388940-b1c1722653e1-1200-5561e1da.jpg',
    imagePosition: 'center 22%',
    socials: ['IG', 'TT', 'YT', 'X'],
  },
];

const socialColors: Record<string, string> = {
  IG: '#E4405F',
  X: '#000',
  TT: '#000',
  FB: '#1877F2',
  YT: '#FF0000',
  LI: '#0A66C2',
  SP: '#1DB954',
  TH: '#FF5500',
};

const socialIconSources: Record<string, string> = {
  IG: '/images/icons/instagram-glyph-white.svg',
  X: '/images/icons/x-logo.svg',
  TT: '/images/icons/tiktok-social-icon-circle-black.svg',
  FB: '/images/icons/facebook-logo-primary.png',
  SP: '/images/icons/spotify-primary-logo-rgb-green.png',
  YT: '/images/icons/youtube-icon-white-digital.png',
};

const carouselSocials = ['IG', 'X', 'TT', 'FB', 'SP', 'YT'];

const socialLabels: Record<string, string> = {
  IG: 'Instagram',
  X: 'X',
  TT: 'TikTok',
  FB: 'Facebook',
  SP: 'Spotify',
  YT: 'YouTube',
};

const AUTOSCROLL_PX_PER_SECOND = 48;

function VerifiedBadgeIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        fill="currentColor"
      />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function CreatorCarousel() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animRef = useRef<number>(0);
  const isAutoScrollPaused = isDragging || isHoverPaused;

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isAutoScrollPaused) return;

    let pos = el.scrollLeft;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const deltaMs = Math.min(now - lastTime, 32);
      lastTime = now;
      pos += (AUTOSCROLL_PX_PER_SECOND * deltaMs) / 1000;
      const loopPoint = el.scrollWidth / 2;
      if (pos >= loopPoint) {
        pos -= loopPoint;
      }
      el.scrollLeft = pos;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isAutoScrollPaused]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHoverPaused(false);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Duplicate creators for infinite scroll
  const allCreators = [...creators, ...creators, ...creators];

  return (
    <div className="relative">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden cursor-grab active:cursor-grabbing select-none px-4 sm:px-8"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allCreators.map((creator, index) => (
          <div
            key={index}
            className="shrink-0 w-[236px] sm:w-[260px] md:w-[280px] rounded-2xl bg-[#141414] overflow-hidden group hover:bg-[#1A1A1A] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Avatar area */}
            <div className="h-52 relative overflow-hidden">
              <img
                src={creator.image}
                alt={isSpanish ? `Retrato de ${creator.name}` : `${creator.name} portrait`}
                className="w-full h-full object-cover"
                style={{ objectPosition: creator.imagePosition }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <h3 className="text-white text-[17px] font-bold text-center">{creator.name}</h3>
                <VerifiedBadgeIcon size={16} className="text-[#38BDF8] shrink-0 drop-shadow-md" />
              </div>
              <p className="text-[#8A8F98] text-sm mb-3 text-center">{creator.handle}</p>

              {/* Social icons */}
              <div className="flex gap-1.5 mb-3 flex-wrap justify-center items-center">
                {carouselSocials.map((s, i) => {
                  const hasStandaloneLogo = s === 'TT' || s === 'FB' || s === 'SP';
                  const isSpotify = s === 'SP';
                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center overflow-hidden hover:scale-125 transition-transform duration-200 ${
                        hasStandaloneLogo ? '' : 'rounded-full shadow-sm'
                      }`}
                      style={hasStandaloneLogo ? undefined : { background: socialColors[s] || '#666' }}
                    >
                      <img
                        src={socialIconSources[s]}
                        alt={isSpanish ? `Logo de ${socialLabels[s]}` : `${socialLabels[s]} logo`}
                        className={`block object-contain object-center ${isSpotify ? 'w-6 h-6' : hasStandaloneLogo ? 'w-full h-full' : 'w-3.5 h-3.5'}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  );
                })}
              </div>

              <p className="text-white text-sm text-center mb-1.5 font-medium">
                {creator.followers} {isSpanish ? 'Total de seguidores' : 'Total Followers'} <span className="text-[#8A8F98] text-xs">▾</span>
              </p>
              <p className="text-[#8A8F98] text-xs text-center whitespace-pre-line leading-relaxed">{isSpanish ? creator.bio.es : creator.bio.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
