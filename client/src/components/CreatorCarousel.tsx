import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const creators = [
  {
    name: 'Liam Parker',
    handle: '@liamparker',
    followers: '8.4M',
    bio: {
      en: 'ALL MY LINKS',
      es: 'TODOS MIS LINKS',
    },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 20%',
    socials: ['IG', 'X', 'TT', 'FB', 'YT', 'TH'],
  },
  {
    name: 'Ava Martinez',
    handle: '@avamartinez',
    followers: '6.1M',
    bio: {
      en: 'Beauty, style and daily routines',
      es: 'Belleza, estilo y rutinas diarias',
    },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 18%',
    socials: ['SP', 'IG', 'X', 'FB', 'LI', 'YT', 'TT'],
  },
  {
    name: 'Noah Brooks',
    handle: '@noahbrooks',
    followers: '5.3M',
    bio: {
      en: 'Street culture and travel stories',
      es: 'Cultura urbana e historias de viaje',
    },
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 22%',
    socials: ['IG', 'X', 'TT', 'FB', 'YT'],
  },
  {
    name: 'Mia Collins',
    handle: '@miacollins',
    followers: '4.9M',
    bio: {
      en: 'Creator tips, wellness and vlogs',
      es: 'Tips para creadores, bienestar y vlogs',
    },
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 25%',
    socials: ['IG', 'X', 'YT', 'TT'],
  },
  {
    name: 'Ethan Ross',
    handle: '@ethanross',
    followers: '3.7M',
    bio: {
      en: 'Fitness, productivity and business',
      es: 'Fitness, productividad y negocio',
    },
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 30%',
    socials: ['TT', 'FB', 'X', 'YT', 'LI', 'IG'],
  },
  {
    name: 'Sofia Patel',
    handle: '@sofiapatel',
    followers: '2.9M',
    bio: {
      en: 'Fashion editorials and city moments',
      es: 'Editoriales de moda y momentos en la ciudad',
    },
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 18%',
    socials: ['IG', 'YT', 'TT', 'X'],
  },
  {
    name: 'Daniel Reed',
    handle: '@danielreed',
    followers: '7.2M',
    bio: {
      en: 'Founder life and creator economy',
      es: 'Vida de fundador y economía de creadores',
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    imagePosition: 'center 18%',
    socials: ['IG', 'TT', 'YT', 'X'],
  },
  {
    name: 'Isabella Cruz',
    handle: '@isabellacruz',
    followers: '3.5M',
    bio: {
      en: 'Lifestyle shoots and travel diaries',
      es: 'Estilo de vida, sesiones y diarios de viaje',
    },
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
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

export default function CreatorCarousel() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isClickPaused, setIsClickPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animRef = useRef<number>(0);
  const isAutoScrollPaused = isDragging || isHoverPaused || isClickPaused;

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isAutoScrollPaused) return;

    let pos = el.scrollLeft;

    const animate = () => {
      pos += 0.6;
      if (pos >= el.scrollWidth / 2) {
        pos = 0;
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
            onClick={() => setIsClickPaused(true)}
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-white text-[17px] font-bold truncate">{creator.name}</h3>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="#3B82F6">
                  <path d="M8 0L10.2 2.5H13.5L12.5 5.8L14.7 8.3L11.8 9.7L11 13L8 11.5L5 13L4.2 9.7L1.3 8.3L3.5 5.8L2.5 2.5H5.8L8 0Z" />
                  <path d="M6.5 8.5L7.5 9.5L10 6.5" fill="none" stroke="white" strokeWidth="1.2" />
                </svg>
              </div>
              <p className="text-[#8A8F98] text-sm mb-3">{creator.handle}</p>

              {/* Social icons */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {creator.socials.map((s, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold text-white shadow-sm hover:scale-125 transition-transform duration-200"
                    style={{ background: socialColors[s] || '#666' }}
                  >
                    {s}
                  </div>
                ))}
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
