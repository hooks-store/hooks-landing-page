import { useRef, useEffect, useState } from 'react';

const creators = [
  {
    name: 'Sergio Kun Aguero',
    handle: '@kunaguero',
    followers: '92.4M',
    bio: 'ALL MY LINKS',
    gradient: 'from-amber-600 to-orange-500',
    socials: ['IG', 'X', 'TT', 'FB', 'YT', 'TH'],
  },
  {
    name: 'Kyle Kuzma',
    handle: '@kuz',
    followers: '9.2M',
    bio: 'NBA champ living the dream',
    gradient: 'from-gray-700 to-gray-900',
    socials: ['SP', 'IG', 'X', 'FB', 'LI', 'YT', 'TT'],
  },
  {
    name: 'Gary Brecka',
    handle: '@garybrecka',
    followers: '4.7M',
    bio: 'Human Biologist | Biohacker',
    gradient: 'from-blue-900 to-slate-800',
    socials: ['IG', 'X', 'TT', 'FB', 'YT'],
  },
  {
    name: 'Tyler Herro',
    handle: '@nolimitherro',
    followers: '3.2M',
    bio: 'Slow Motion',
    gradient: 'from-pink-600 to-rose-500',
    socials: ['IG', 'X', 'YT', 'TT'],
  },
  {
    name: 'Mall of America',
    handle: '@mallofamerica',
    followers: '1.1M',
    bio: 'There\'s a place for fun in your life',
    gradient: 'from-red-600 to-red-800',
    socials: ['TT', 'FB', 'X', 'YT', 'LI', 'IG'],
  },
  {
    name: 'Alex Rivera',
    handle: '@alexrivera',
    followers: '5.8M',
    bio: 'Content Creator & Entrepreneur',
    gradient: 'from-emerald-600 to-teal-700',
    socials: ['IG', 'YT', 'TT', 'X'],
  },
  {
    name: 'Mia Chen',
    handle: '@miachen',
    followers: '2.3M',
    bio: 'Fashion & Lifestyle',
    gradient: 'from-purple-600 to-violet-700',
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animRef = useRef<number>(0);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isDragging) return;

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
  }, [isDragging]);

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
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden cursor-grab active:cursor-grabbing select-none px-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allCreators.map((creator, index) => (
          <div
            key={index}
            className="shrink-0 w-[260px] md:w-[280px] rounded-2xl bg-[#141414] overflow-hidden group hover:bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Avatar area */}
            <div className={`h-52 bg-gradient-to-br ${creator.gradient} flex items-end justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                {creator.name.charAt(0)}
              </div>
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
                {creator.followers} Total Followers <span className="text-[#8A8F98] text-xs">▾</span>
              </p>
              <p className="text-[#8A8F98] text-xs text-center whitespace-pre-line leading-relaxed">{creator.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
