import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Brush,
  Check,
  Disc,
  Gamepad,
  Globe,
  Heart,
  Instagram,
  Mail,
  Mic,
  Music,
  ShoppingBag,
  Ticket,
  Tv,
  Twitter,
  Video,
  Youtube,
} from 'lucide-react';
import { CREATORS } from './data';
import { ConnectBar } from './ConnectBar';

type CardPosition = 'center' | 'left' | 'right' | 'hiddenLeft' | 'hiddenRight';

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

function IconRenderer({ name, size = 20, className = '' }: IconRendererProps) {
  switch (name) {
    case 'youtube':
      return <Youtube size={size} className={className} />;
    case 'discord':
      return <Disc size={size} className={className} />;
    case 'instagram':
      return <Instagram size={size} className={className} />;
    case 'twitter':
      return <Twitter size={size} className={className} />;
    case 'tiktok':
      return <Video size={size} className={className} />;
    case 'music':
      return <Music size={size} className={className} />;
    case 'merch':
      return <ShoppingBag size={size} className={className} />;
    case 'podcast':
      return <Mic size={size} className={className} />;
    case 'spotify':
      return <Disc size={size} className={className} />;
    case 'twitch':
      return <Tv size={size} className={className} />;
    case 'heart':
      return <Heart size={size} className={className} />;
    case 'mail':
      return <Mail size={size} className={className} />;
    case 'ticket':
      return <Ticket size={size} className={className} />;
    case 'brush':
      return <Brush size={size} className={className} />;
    case 'activity':
      return <Activity size={size} className={className} />;
    case 'gamepad':
      return <Gamepad size={size} className={className} />;
    case 'globe':
      return <Globe size={size} className={className} />;
    case 'patreon':
      return <Heart size={size} className={className} />;
    default:
      return <Check size={size} className={className} />;
  }
}

const transition = { duration: 0.9, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] };
const AUTOPLAY_INTERVAL_MS = 3500;
const AUTOPLAY_INITIAL_DELAY_MS = 1500;
const NAVIGATION_GUARD_MS = 650;

const cardVariants = {
  center: { x: '0%', scale: 1, opacity: 1, zIndex: 10, y: 0, rotateY: 0 },
  left: { x: '-34%', scale: 0.72, opacity: 1, zIndex: 5, y: 0, rotateY: 0 },
  right: { x: '34%', scale: 0.72, opacity: 1, zIndex: 5, y: 0, rotateY: 0 },
  hiddenLeft: { x: '-86%', scale: 0.58, opacity: 0, zIndex: 0, y: 0, rotateY: 0, pointerEvents: 'none' },
  hiddenRight: { x: '86%', scale: 0.58, opacity: 0, zIndex: 0, y: 0, rotateY: 0, pointerEvents: 'none' },
} as const;

const innerContentVariants = {
  center: { y: 0, opacity: 1 },
  left: { y: 0, opacity: 1 },
  right: { y: 0, opacity: 1 },
  hiddenLeft: { y: 0, opacity: 0 },
  hiddenRight: { y: 0, opacity: 0 },
} as const;

const imageVariants = {
  center: { y: 0, scale: 1 },
  left: { y: 0, scale: 1.06 },
  right: { y: 0, scale: 1.06 },
  hiddenLeft: { y: 0, scale: 1.12 },
  hiddenRight: { y: 0, scale: 1.12 },
} as const;

export default function PhoneMockup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayStarted, setAutoplayStarted] = useState(false);
  const lastNavigationAtRef = useRef(0);

  const activeCreator = useMemo(() => CREATORS[activeIndex], [activeIndex]);

  const getPosition = (index: number): CardPosition => {
    const length = CREATORS.length;
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + length) % length) return 'left';
    if (index === (activeIndex + 1) % length) return 'right';

    const distLeft = (activeIndex - index + length) % length;
    const distRight = (index - activeIndex + length) % length;
    return distLeft < distRight ? 'hiddenLeft' : 'hiddenRight';
  };

  const canNavigate = useCallback(() => {
    return Date.now() - lastNavigationAtRef.current >= NAVIGATION_GUARD_MS;
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (!canNavigate()) return false;
    lastNavigationAtRef.current = Date.now();
    setActiveIndex((prev) => {
      if (direction === 'next') return (prev + 1) % CREATORS.length;
      return (prev - 1 + CREATORS.length) % CREATORS.length;
    });
    return true;
  }, [canNavigate]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setAutoplayStarted(true);
    }, AUTOPLAY_INITIAL_DELAY_MS);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!autoplayStarted) return;
    const autoplayTimer = setTimeout(() => {
      navigate('next');
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearTimeout(autoplayTimer);
  }, [autoplayStarted, activeIndex, navigate]);

  return (
    <div className="relative w-[300px] h-[618px] sm:w-[330px] sm:h-[678px] md:w-[360px] md:h-[740px]" style={{ perspective: 1200 }}>
      <motion.div
        className="absolute inset-8 rounded-full blur-[60px] opacity-30 pointer-events-none"
        animate={{ backgroundColor: activeCreator.color }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />

      <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {CREATORS.map((creator, index) => {
          const position = getPosition(index);

          return (
            <motion.div
              key={creator.id}
              initial={false}
              animate={position}
              variants={cardVariants}
              transition={transition}
              className="absolute inset-0 rounded-[42px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] pointer-events-none"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.img
                  src={creator.image}
                  alt={creator.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  variants={imageVariants}
                  transition={transition}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="absolute inset-0 z-[5] pointer-events-none" style={{ backgroundColor: creator.color, opacity: 0.08 }} />

              <div
                className="absolute top-[calc(50%-40px)] bottom-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                  backdropFilter: 'blur(50px)',
                  WebkitBackdropFilter: 'blur(50px)',
                  backgroundColor: 'rgba(0,0,0,0.10)',
                  boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.15)',
                  maskImage: 'linear-gradient(to bottom, transparent 0px, black 40px, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 40px, black 100%)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]/95" />
              </div>

              <motion.div variants={innerContentVariants} transition={transition} className="absolute inset-0 z-20">
                <div className="absolute bottom-[calc(50%+60px)] left-0 right-0 px-6 flex flex-col items-center text-center z-30">
                  <motion.div className="flex items-center justify-center gap-1.5 mb-1 w-full">
                    <motion.h3
                      className="text-[18px] font-medium text-white tracking-tight leading-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
                    >
                      {creator.name}
                    </motion.h3>
                    <IconRenderer name="badge-check" size={16} className="text-[#38BDF8] drop-shadow-md" />
                  </motion.div>

                  <motion.p className="text-[14px] font-medium text-white/80 w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
                    @{creator.id.toLowerCase()}
                  </motion.p>
                </div>

                <div className="absolute bottom-[50%] pb-4 left-0 right-0 flex gap-4 justify-center w-full z-40">
                  {creator.socials.map((social, idx) => {
                    const brandColors: Record<string, string> = {
                      youtube: '#FF0000',
                      instagram: '#E1306C',
                      tiktok: '#111111',
                      discord: '#5865F2',
                      twitter: '#1DA1F2',
                      podcast: '#8F00FF',
                      spotify: '#1DB954',
                      twitch: '#9146FF',
                    };
                    const brandColor = brandColors[social.icon] || creator.color;
                    return (
                      <div
                        key={`${social.icon}-${idx}`}
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        style={{ backgroundColor: brandColor }}
                      >
                        <IconRenderer name={social.icon} size={18} className="text-white" />
                      </div>
                    );
                  })}
                </div>

                <div className="absolute top-[50%] pt-[8px] bottom-0 left-0 right-0 flex flex-col items-center text-center z-30">
                  <div className="px-6 w-full flex flex-col h-full pb-8">
                    <motion.p
                      className="text-[14px] font-medium mb-1 w-full text-white/90 flex items-center justify-center gap-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {creator.followers} Total Followers
                    </motion.p>

                    <motion.p
                      className={`text-[14px] font-normal ${creator.id === 'anyajensen' ? 'mb-2' : 'mb-6'} w-full text-white/80`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {creator.title}
                    </motion.p>

                    <div className="flex-1 w-full overflow-y-auto flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {(creator.gridStyle === 'lead-gen' || creator.id === 'eliasthorne') && (
                        <div className="w-full mb-3">
                          <ConnectBar />
                        </div>
                      )}

                      <div
                        className={`gap-3 ${
                          creator.gridStyle === 'single-wide'
                            ? 'grid grid-cols-2'
                            : creator.gridStyle === 'mixed-stack'
                              ? 'grid grid-cols-2 grid-rows-[auto_auto]'
                              : creator.gridStyle === '1x2-featured'
                                ? 'grid grid-cols-2'
                                : creator.gridStyle === 'mixed-media'
                                  ? 'grid grid-cols-2'
                                  : creator.gridStyle === 'lead-gen'
                                    ? 'grid grid-cols-2'
                                    : creator.gridStyle === 'carousel'
                                      ? 'flex overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                                      : 'grid grid-cols-2'
                        }`}
                      >
                        {creator.links.map((link, idx) => {
                          const brandColors: Record<string, string> = {
                            youtube: '#FF0000',
                            instagram: '#E1306C',
                            tiktok: '#FE2C55',
                            discord: '#5865F2',
                            twitter: '#1DA1F2',
                            podcast: '#8F00FF',
                            spotify: '#1DB954',
                            twitch: '#9146FF',
                            music: '#FF3366',
                            ticket: '#00D1FF',
                            merch: '#FF9900',
                            patreon: '#FF424D',
                            heart: '#FF3366',
                            mail: '#0088CC',
                            brush: '#FF66B2',
                            activity: '#FF4500',
                            gamepad: '#00FF00',
                            globe: '#0088CC',
                          };
                          const iconColor = brandColors[link.icon] || creator.accentColor;

                          let itemClasses = 'relative overflow-hidden rounded-[16px] ';
                          if (creator.gridStyle === 'single-wide') {
                            itemClasses += idx === 0 ? 'col-span-2 aspect-[2/1.3]' : 'aspect-square';
                          } else if (creator.gridStyle === 'mixed-stack') {
                            itemClasses += idx < 2 ? 'aspect-[4/5]' : 'aspect-square';
                          } else if (creator.gridStyle === '1x2-featured') {
                            itemClasses += idx === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square';
                          } else if (creator.gridStyle === 'mixed-media') {
                            itemClasses += idx % 3 === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square';
                          } else if (creator.gridStyle === 'carousel') {
                            itemClasses += 'min-w-[75%] aspect-square snap-center shrink-0';
                          } else {
                            itemClasses += 'aspect-square';
                          }

                          return (
                            <div key={`${link.title}-${idx}`} className={itemClasses}>
                              <div
                                className="absolute inset-0 backdrop-blur-md rounded-[16px] overflow-hidden"
                                style={{
                                  backgroundColor: creator.id === 'anyajensen' ? 'rgba(255,255,255,0.18)' : `${creator.color}1A`,
                                }}
                              >
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${link.image})` }} />
                                <div className={`absolute inset-0 ${creator.id === 'anyajensen' ? 'bg-white/10' : 'bg-black/20'}`} />

                                <div className="relative z-10 w-full h-full">
                                  <div className="absolute top-3 right-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ color: iconColor }}>
                                    <IconRenderer name={link.icon} size={16} />
                                  </div>
                                  <div className="absolute bottom-3 left-3 right-3 text-center">
                                    <span
                                      className="text-white/95 font-medium text-[13px] leading-tight drop-shadow-md block"
                                      style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                      {link.title}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
