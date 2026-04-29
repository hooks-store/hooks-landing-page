import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
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

interface ImageMotionSettings {
  scale: number;
  y: string;
}

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

const INSTAGRAM_GLYPH_WHITE_SRC = '/images/icons/instagram-glyph-white.svg';
const TIKTOK_SOCIAL_ICON_CIRCLE_BLACK_SRC = '/images/icons/tiktok-social-icon-circle-black.svg';
const YOUTUBE_ICON_WHITE_DIGITAL_SRC = '/images/icons/youtube-icon-white-digital.png';
const X_LOGO_SRC = '/images/icons/x-logo.svg';
const FACEBOOK_LOGO_PRIMARY_SRC = '/images/icons/facebook-logo-primary.png';
const SPOTIFY_PRIMARY_LOGO_RGB_BLACK_SRC = '/images/icons/spotify-primary-logo-rgb-green.png';

function IconRenderer({ name, size = 20, className = '' }: IconRendererProps) {
  switch (name) {
    case 'badge-check':
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
        >
          <path
            d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
            fill="currentColor"
          />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'youtube':
      return <Youtube size={size} className={className} />;
    case 'youtube-official':
      return (
        <img
          src={YOUTUBE_ICON_WHITE_DIGITAL_SRC}
          alt=""
          width={size}
          height={size}
          className={className}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      );
    case 'discord':
      return <Disc size={size} className={className} />;
    case 'instagram-official':
      return (
        <img
          src={INSTAGRAM_GLYPH_WHITE_SRC}
          alt=""
          width={size}
          height={size}
          className={className}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      );
    case 'tiktok-official':
      return (
        <img
          src={TIKTOK_SOCIAL_ICON_CIRCLE_BLACK_SRC}
          alt=""
          width={size}
          height={size}
          className={className}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      );
    case 'x-official':
      return (
        <img
          src={X_LOGO_SRC}
          alt=""
          width={size}
          height={size}
          className={className}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      );
    case 'facebook-official':
      return (
        <img
          src={FACEBOOK_LOGO_PRIMARY_SRC}
          alt=""
          width={size}
          height={size}
          className={className}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      );
    case 'spotify-official':
      return (
        <img
          src={SPOTIFY_PRIMARY_LOGO_RGB_BLACK_SRC}
          alt=""
          width={size}
          height={size}
          className={className}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      );
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

// Critically damped spring — no overshoot, so cards don't linger in the
// collision zone after passing each other.
const cardSpring: Transition = {
  type: 'spring',
  stiffness: 170,
  damping: 30,
  mass: 0.85,
  restDelta: 0.0008,
};

// All transform properties ride the same spring so the card moves as a
// single coherent body — no staggered rotation/depth trails that read as
// "lazy" tilt. Opacity uses a smooth, slightly longer ease so cards don't
// pop in/out of visibility while their transform is still resolving.
const cardTransition: Transition = {
  default: cardSpring,
  opacity: { duration: 0.55, ease: [0.42, 0, 0.58, 1] },
};

const imageTransition: Transition = {
  type: 'spring',
  stiffness: 90,
  damping: 26,
  mass: 1,
};

const reducedTransition: Transition = { duration: 0 };

const AUTOPLAY_INTERVAL_MS = 3500;
const AUTOPLAY_INITIAL_DELAY_MS = 1500;
const NAVIGATION_GUARD_MS = 650;
const PROFILE_SOCIAL_ICON_SIZE = 26;
const PROFILE_SOCIAL_GLYPH_SIZE = 16;
const REQUIRED_PROFILE_SOCIALS = ['spotify', 'facebook', 'twitter'] as const;
const FULL_BADGE_PROFILE_LOGOS = new Set(['tiktok-official', 'facebook-official', 'spotify-official']);
const PROFILE_SOCIAL_ICON_SIZE_OVERRIDES: Record<string, number> = {
  'instagram-official': 16,
  'x-official': 14,
  'youtube-official': 16,
};

// IMPORTANT: a page-level ancestor (the app shell) has `overflow-x: hidden`.
// If hidden cards translate far off-screen, they get clipped by the viewport
// edge — and during the transit between hidden and side, you see only a
// thin vertical strip of the card emerge from / disappear into the clip
// boundary. That's the "vertical line / flashing" artifact.
//
// Fix: park hidden states ~10% past the side position (still inside the
// visible area, just at opacity 0). The slide between hidden ↔ side becomes
// a tiny movement and opacity does the meaningful work. The card never
// crosses the viewport's clip boundary at non-zero opacity.
//
// Side cards: scale 0.66 + opacity 0.5 + rotateY ±22° + z -120 puts them
// clearly behind the center card so cross-collision during center↔side
// reads as different depth planes, not "two solid cards melting through".
const cardVariants = {
  center: { x: '0%', scale: 1, opacity: 1, zIndex: 10, y: 0, rotateY: 0, z: 0 },
  left: { x: '-40%', scale: 0.66, opacity: 0.5, zIndex: 5, y: 0, rotateY: -22, z: -120 },
  right: { x: '40%', scale: 0.66, opacity: 0.5, zIndex: 5, y: 0, rotateY: 22, z: -120 },
  // Hidden states share the SAME scale/rotateY/z as side states; differ only
  // by a small x offset and opacity 0. No morph, no clip-edge sliver.
  hiddenLeft: { x: '-50%', scale: 0.66, opacity: 0, zIndex: 0, y: 0, rotateY: -22, z: -120, pointerEvents: 'none' },
  hiddenRight: { x: '50%', scale: 0.66, opacity: 0, zIndex: 0, y: 0, rotateY: 22, z: -120, pointerEvents: 'none' },
} as const;

const innerContentVariants = {
  center: { y: 0, opacity: 1 },
  left: { y: 0, opacity: 1 },
  right: { y: 0, opacity: 1 },
  hiddenLeft: { y: 0, opacity: 0 },
  hiddenRight: { y: 0, opacity: 0 },
} as const;

// Inner image gets a subtle counter-shift on side cards so the photo behaves
// like it has its own depth plane behind the card surface (parallax).
const imageVariants = {
  center: ({ scale, y }: ImageMotionSettings) => ({ x: 0, y, scale }),
  left: ({ scale, y }: ImageMotionSettings) => ({ x: '6%', y, scale: scale * 1.1 }),
  right: ({ scale, y }: ImageMotionSettings) => ({ x: '-6%', y, scale: scale * 1.1 }),
  hiddenLeft: ({ scale, y }: ImageMotionSettings) => ({ x: '10%', y, scale: scale * 1.16 }),
  hiddenRight: ({ scale, y }: ImageMotionSettings) => ({ x: '-10%', y, scale: scale * 1.16 }),
} as const;

export default function PhoneMockup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayStarted, setAutoplayStarted] = useState(false);
  const lastNavigationAtRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const activeCardTransition = prefersReducedMotion ? reducedTransition : cardTransition;
  const activeImageTransition = prefersReducedMotion ? reducedTransition : imageTransition;

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
    <div className="relative w-[255px] h-[525.3px] sm:w-[280.5px] sm:h-[576.3px] md:w-[306px] md:h-[629px]" style={{ perspective: 1400 }}>
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
              transition={activeCardTransition}
              className="absolute inset-0 rounded-[42px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] pointer-events-none"
              style={{
                willChange: 'transform',
                transformPerspective: 1400,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                isolation: 'isolate',
                // Force a real mask buffer so the rounded clip is honored on the GPU
                // compositing layer during 3D transforms — without this, Chrome/Safari
                // leak a 1–2px halo along the rounded edge while the card animates.
                maskImage: 'linear-gradient(#000, #000)',
                WebkitMaskImage: 'linear-gradient(#000, #000)',
              }}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.img
                  src={creator.image}
                  alt={creator.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={imageVariants}
                  custom={{ scale: creator.imageScale ?? 1, y: creator.imageOffsetY ?? '0%' }}
                  transition={activeImageTransition}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: creator.imagePosition ?? 'center' }}
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

              <div
                className="absolute bottom-0 left-0 right-0 h-12 z-40 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, #050505 70%, #050505 100%)',
                }}
              />

              <motion.div variants={innerContentVariants} transition={activeCardTransition} className="absolute inset-0 z-20">
                <div className="absolute bottom-[calc(50%+60px)] left-0 right-0 px-6 flex flex-col items-center text-center z-30">
                  <motion.div className="flex items-center justify-center gap-1.5 mb-1 w-full">
                    <motion.h3
                      className="text-[18px] font-medium text-white tracking-tight leading-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
                    >
                      {creator.name}
                    </motion.h3>
                    <IconRenderer name="badge-check" size={20} className="text-[#38BDF8] drop-shadow-md" />
                  </motion.div>

                  <motion.p className="text-[14px] font-medium text-white/80 w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
                    @{creator.id.toLowerCase()}
                  </motion.p>
                </div>

                <div className="absolute bottom-[50%] pb-2 left-0 right-0 flex gap-2 justify-center w-full z-40">
                  {[
                    ...creator.socials,
                    ...REQUIRED_PROFILE_SOCIALS.filter((icon) => !creator.socials.some((social) => social.icon === icon)).map((icon) => ({
                      icon,
                      url: '#',
                    })),
                  ].map((social, idx) => {
                    const brandColors: Record<string, string> = {
                      youtube: '#FF0000',
                      instagram: '#E1306C',
                      tiktok: '#111111',
                      discord: '#5865F2',
                      twitter: '#000000',
                      podcast: '#8F00FF',
                      spotify: '#1DB954',
                      twitch: '#9146FF',
                    };
                    const brandColor = brandColors[social.icon] || creator.color;
                    const iconName =
                      social.icon === 'instagram'
                        ? 'instagram-official'
                        : social.icon === 'youtube'
                          ? 'youtube-official'
                        : social.icon === 'tiktok'
                          ? 'tiktok-official'
                        : social.icon === 'facebook'
                          ? 'facebook-official'
                        : social.icon === 'spotify'
                          ? 'spotify-official'
                        : social.icon === 'twitter'
                          ? 'x-official'
                          : social.icon;
                    const isFullBadgeLogo = FULL_BADGE_PROFILE_LOGOS.has(iconName);
                    const iconSize = isFullBadgeLogo
                      ? PROFILE_SOCIAL_ICON_SIZE
                      : PROFILE_SOCIAL_ICON_SIZE_OVERRIDES[iconName] ?? PROFILE_SOCIAL_GLYPH_SIZE;
                    return (
                      <div
                        key={`${social.icon}-${idx}`}
                        className="rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        style={{
                          width: PROFILE_SOCIAL_ICON_SIZE,
                          height: PROFILE_SOCIAL_ICON_SIZE,
                          backgroundColor: isFullBadgeLogo ? undefined : brandColor,
                        }}
                      >
                        <IconRenderer
                          name={iconName}
                          size={iconSize}
                          className="text-white"
                        />
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
                      {creator.followers} Total de seguidores
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
