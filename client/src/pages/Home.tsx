/*
 * Hooks Landing Page — "Midnight Editorial" Design
 * Dark-mode only, near-black (#0A0A0A) bg, navy-teal cards (#0B1926-#0F2840),
 * orange accent (#E8930C), Inter font, magazine-scale typography.
 */

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import UrlInputBar from '@/components/UrlInputBar';
import CreatorCarousel from '@/components/CreatorCarousel';
import WorldMap from '@/components/WorldMap';
import AppIconGrid from '@/components/AppIconGrid';
import { HooksIcon } from '@/components/HooksIcon';
import PhoneMockup from '@/components/iphone-mockup/PhoneMockup';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Eye, Globe, ShoppingBag, Lock,
  ChevronDown, BarChart3, Users,
  Instagram, Facebook, Youtube, Music2, Check
} from 'lucide-react';

// Image URLs
const PHONE_GUY_FOR_LATER = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/creator-lifestyle-eAePL9YnBxbQUubnYhm3fa.webp';
const FEMALE_CREATOR = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/female-creator-KoNNQiTsKfMVtWm8xvoSep.webp';
const CREATOR_CTA_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/creator-cta-bg-C9mdqCe3aNkVQnH8bbSzUM.webp';
const HERO_BG_VIDEO_SOURCES = [
  '/videos/hero/chef-4secs.mp4',
  '/videos/hero/nba-player.mov',
  '/videos/hero/podcast-short.mp4',
  '/videos/hero/travel-girl.mp4',
];
const HERO_BG_VIDEO_MAX_DURATION_MS = 5000;
const HERO_BG_VIDEO_CROSSFADE_MS = 550;
const FEATURE_VIDEO_COURSE_BUILDER = '/videos/features/course-builder.mov';
const FEATURE_VIDEO_TIKTOK_BROWSER_GUIDE = '/videos/features/tiktok-browser-guide.mov';
const COACHING_FRAMES = [
  '/images/coaching-frames/frame-03.png',
  '/images/coaching-frames/frame-04.png',
  '/images/coaching-frames/frame-05.png',
];
const SECTION_EYEBROW_CLASS = 'text-[#FF624F] text-base font-semibold mb-3';
const SECTION_HEADLINE_CLASS = 'text-[30px] sm:text-[40px] md:text-[48px] lg:text-[clamp(36px,3.6vw,56px)] font-bold leading-[1.1] tracking-[-0.02em] lg:whitespace-nowrap';

const DIGITAL_PRODUCT_PREVIEW_COPY = {
  en: {
    statusLabel: 'Sale ready',
    checkoutLabel: 'Instant checkout',
    items: [
      {
        label: 'Ebook',
        title: 'Hook Loop Kit',
        subtitle: 'Creator blueprint',
        price: '$29.99',
        imageSrc: '/images/digital-products/ebook.svg',
        accent: '#23B26D',
      },
      {
        label: 'Template',
        title: 'Launch OS',
        subtitle: 'Notion workspace',
        price: '$49',
        imageSrc: '/images/digital-products/template.svg',
        accent: '#FF784F',
      },
      {
        label: 'Guide',
        title: 'Viral Scripts',
        subtitle: '30 ready prompts',
        price: '$19',
        imageSrc: '/images/digital-products/guide.svg',
        accent: '#5A78FF',
      },
    ],
  },
  es: {
    statusLabel: 'Venta lista',
    checkoutLabel: 'Checkout inmediato',
    items: [
      {
        label: 'Ebook',
        title: 'Kit de Hooks',
        subtitle: 'Guía para creadores',
        price: '$29.99',
        imageSrc: '/images/digital-products/ebook.svg',
        accent: '#23B26D',
      },
      {
        label: 'Plantilla',
        title: 'Launch OS',
        subtitle: 'Workspace en Notion',
        price: '$49',
        imageSrc: '/images/digital-products/template.svg',
        accent: '#FF784F',
      },
      {
        label: 'Guía',
        title: 'Scripts virales',
        subtitle: '30 prompts listos',
        price: '$19',
        imageSrc: '/images/digital-products/guide.svg',
        accent: '#5A78FF',
      },
    ],
  },
} as const;

const HOME_COPY = {
  en: {
    hero: {
      rotatingPhrases: ['Build your brand', 'Build your store', 'Build your page'],
        titleEnd: 'and sell from one link.',
      subheadline: 'Create a verified profile, sell products, courses, coaching, and memberships from one place. Hooks brings everything together to turn your audience into revenue.',
    },
    manifesto: {
      intro: 'The platform for the new creator economy. ',
      line1: 'Grow your audience. ',
      line2: 'Turn followers into customers. ',
      line3: 'Sell products. Offer services. ',
      line4: 'Monetize your content.',
    },
    features: {
      eyebrow: 'All-in-one creator toolkit',
      headline: 'Build, sell, and scale from one platform',
      cards: {
        digitalProducts: {
          title: 'Digital Product Builder',
          desc: 'Sell guides, templates, ebooks, and premium files from your Hooks profile with a simpler checkout and fewer lost sales.',
          metricLabel: 'Total Sales',
          metricValue: '$6,467',
        },
        courses: {
          title: 'Course Builder',
          desc: 'Publish paid courses in minutes so followers can buy access, start learning, and stay connected without extra friction.',
          metricLabel: 'Enrolled Students',
          metricValue: '1,204',
        },
        coaching: {
          title: 'Coaching Calls',
          desc: 'Promote paid coaching calls from your profile and turn audience trust into booked sessions.',
          metricLabel: 'Calls Booked',
          metricValue: '34 this week',
        },
        memberships: {
          title: 'Memberships',
          desc: 'Offer members-only content behind a paywall and build clearer recurring revenue from your audience.',
          metricLabel: 'Active Members',
          metricValue: '892',
        },
        analytics: {
          title: 'Analytics',
          desc: 'Track clicks, earnings, and engagement in real time so you know what converts and where to focus.',
          metricLabel: 'Profile Views',
          metricValue: '1.2M',
        },
        designSite: {
          title: 'Design your link-in-bio site',
          desc: 'Build a verified, branded profile that earns more trust. Hooks can show TikTok visitors a clear prompt to open your link in an external browser when needed.',
          imageAlt: 'Design your link-in-bio site preview',
          metricLabel: 'Published Sites',
          metricValue: '3,912',
        },
      },
    },
    analytics: {
      eyebrow: 'Around the world',
      headline: 'Track your global analytics',
      profileViews: 'Profile Views',
      linkClicks: 'Link Clicks',
      countries: [
        { flag: '🇧🇷', country: 'Brazil', views: '307k views', rank: 1 },
        { flag: '🇺🇸', country: 'USA', views: '96k views', rank: 2 },
        { flag: '🇵🇹', country: 'Portugal', views: '117k views', rank: 3 },
      ],
      cardOneTitle: 'Real-time global analytics, for free.',
      cardOneBody: 'Hooks keeps your profile accessible worldwide, whether you receive hundreds or millions of clicks. Everything runs smoothly and you can always see where your profile is being viewed.',
      cardTwoTitle: 'Premium analytics animation loop.',
      cardTwoBody: 'A polished live analytics canvas that complements your global stats view with richer motion and performance storytelling.',
      frameTitle: 'Premium analytics animation',
    },
    tiktokStore: {
      eyebrow: 'Consigue más ventas con',
      headline: 'Una tienda optimizada para tráfico de TikTok',
      verifiedTitle: 'Tu Perfil verificado',
      verifiedBody: 'Deja de perder visitantes. Tu insignia verificada genera confianza al instante y confirma que están en el lugar correcto, listos para comprar.',
      browserTitle: '¿TikTok está bloqueando tu link?',
      browserBody: 'La mayoría de herramientas de link en bio ignoran el problema del navegador de TikTok. Creamos una guía animada que lleva a tus visitantes a su navegador preferido para que cada clic realmente convierta.',
      browserVideoLabel: 'Guía animada para abrir un link de TikTok en el navegador preferido',
    },
    finalCta: {
      line1: 'Build your store.',
      line2: 'Share your links.',
      line3: 'Get paid.',
      primaryCta: 'Start for free',
      trust1: 'No card required',
      trust2: 'Verified profile included',
      trust3: 'Optimized for TikTok traffic',
    },
    phone: {
      totalFollowers: 'Total Followers',
      allLinks: 'ALL MY LINKS',
      youtube: 'YouTube',
    },
    memberships: {
      title: 'Creator Circle Membership',
      perMonth: '/ month',
      cta: 'Get this now',
    },
  },
    es: {
      hero: {
        rotatingPhrases: [
          'Crea tu marca',
          'Gana dinero',
          'Comparte tus enlaces',
          'Hazte viral',
          'Crece tu comunidad',
          'Crea tus cursos',
          'Agenda tus llamadas',
          'Crea membresías',
          'Crea con IA',
        ],
        titleEnd: 'y vende desde un solo link.',
        subheadline: 'Crea un perfil verificado, vende productos, cursos, asesorías y membresías desde un solo lugar. Hooks reúne todo en un solo lugar para convertir tu audiencia en ingresos.',
      },
    manifesto: {
      intro: 'La única plataforma que necesitarás. ',
      line1: 'Crea y crece tu comunidad. ',
      line2: 'Convierte seguidores en clientes. ',
      line3: 'Vende productos y servicios digitales. ',
      line4: 'Monetiza tus redes sociales.',
    },
    features: {
      eyebrow: 'Monetiza a tu manera',
      headline: 'Todo lo que puedes vender con Hooks',
      cards: {
        digitalProducts: {
          title: 'Productos digitales',
          desc: 'Vende guías, plantillas, ebooks y archivos premium con un checkout simple para cobrar más rápido y perder menos ventas.',
          metricLabel: 'Ventas totales',
          metricValue: '$6,467',
        },
        courses: {
          title: 'Cursos en línea',
          desc: 'Organiza módulos, contenidos y acceso para que tus estudiantes compren y empiecen sin fricción.',
          metricLabel: 'Estudiantes inscritos',
          metricValue: '1,204',
        },
        coaching: {
          title: 'Asesorías y sesiones',
          desc: 'Agenda llamadas, mentorías o servicios 1 a 1 y convierte la confianza de tu audiencia en sesiones pagadas.',
          metricLabel: 'Sesiones reservadas',
          metricValue: '34 esta semana',
        },
        memberships: {
          title: 'Membresías',
          desc: 'Crea acceso recurrente para tu comunidad y construye ingresos más previsibles con pagos periódicos.',
          metricLabel: 'Miembros activos',
          metricValue: '892',
        },
        analytics: {
          title: 'Estadísticas',
          desc: 'Mide clics, ingresos y actividad en tiempo real para saber qué convierte y dónde crecer.',
          metricLabel: 'Visitas del perfil',
          metricValue: '1.2M',
        },
        designSite: {
          title: 'Diseña tu sitio de link en bio',
          desc: 'Construye un perfil verificado y personalizable que genera más confianza. No pierdas ventas por el navegador interno de TikTok: Hooks muestra un aviso claro para abrir tu link en el navegador externo cuando sea necesario.',
          imageAlt: 'Vista previa del sitio de link en bio',
          metricLabel: 'Sitios publicados',
          metricValue: '3,912',
        },
      },
    },
    analytics: {
      eyebrow: 'Estadísticas en tiempo real',
      headline: 'Entiende tu crecimiento con claridad',
      profileViews: 'Visitas del perfil',
      linkClicks: 'Clics en el link',
      countries: [
        { flag: '🇧🇷', country: 'Brasil', views: '307k vistas', rank: 1 },
        { flag: '🇺🇸', country: 'EE. UU.', views: '96k vistas', rank: 2 },
        { flag: '🇵🇹', country: 'Portugal', views: '117k vistas', rank: 3 },
      ],
      cardOneTitle: 'Estadísticas globales en tiempo real, gratis.',
      cardOneBody: 'Hooks mantiene tu perfil disponible en todo el mundo, ya recibas cientos o millones de clics. Todo funciona de forma estable y puedes ver con claridad de dónde viene tu actividad.',
      cardTwoTitle: 'Visualización premium de estadísticas.',
      cardTwoBody: 'Un panel de estadísticas en vivo que complementa tus métricas globales con una narrativa visual más sólida.',
      frameTitle: 'Visualización premium de estadísticas',
    },
    tiktokStore: {
      eyebrow: 'Consigue más ventas con',
      headline: 'Una tienda optimizada para tráfico de TikTok',
      verifiedTitle: 'Tu Perfil verificado',
      verifiedBody: 'Deja de perder visitantes. Tu insignia verificada genera confianza al instante y confirma que están en el lugar correcto, listos para comprar.',
      browserTitle: '¿TikTok está bloqueando tu link?',
      browserBody: 'La mayoría de herramientas de link en bio ignoran el problema del navegador de TikTok. Creamos una guía animada que lleva a tus visitantes a su navegador preferido para que cada clic realmente convierta.',
      browserVideoLabel: 'Guía animada para abrir un link de TikTok en el navegador preferido',
    },
    finalCta: {
      line1: 'Crea tu perfil.',
      line2: 'Comparte tu link.',
      line3: 'Empieza a cobrar.',
      primaryCta: 'Crear gratis',
      trust1: 'Sin tarjeta de crédito',
      trust2: 'Perfil verificado incluido',
      trust3: 'Optimizado para tráfico desde TikTok',
    },
    phone: {
      totalFollowers: 'Total de seguidores',
      allLinks: 'TODOS MIS LINKS',
      youtube: 'YouTube',
    },
    memberships: {
      title: 'Membresía Círculo de Creadores',
      perMonth: '/ mes',
      cta: 'Consíguelo ahora',
    },
  },
} as const;

export default function Home() {
  const { locale } = useLanguage();
  const copy = HOME_COPY[locale];
  const heroRotatingPhrases = copy.hero.rotatingPhrases;
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const manifestoSectionRef = useRef<HTMLElement | null>(null);
  const [manifestoScrollProgress, setManifestoScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHeroPhraseIndex(0);
  }, [locale]);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setHeroPhraseIndex((current) => (current + 1) % heroRotatingPhrases.length);
    }, 3000);

    return () => clearInterval(phraseTimer);
  }, [heroRotatingPhrases.length]);

  useEffect(() => {
    const sectionElement = manifestoSectionRef.current;
    if (!sectionElement || typeof window === 'undefined') {
      return undefined;
    }

    let animationFrameId: number | null = null;

    const updateProgress = () => {
      animationFrameId = null;

      const rect = sectionElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 2;
      const end = viewportHeight * 0.2;
      const scrollDistance = rect.height + (start - end);
      const traveled = start - rect.top * 3;
      const nextProgress = Math.min(1, Math.max(0, traveled / Math.max(scrollDistance, 1)));
      setManifestoScrollProgress(nextProgress);
    };

    const requestProgressUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', requestProgressUpdate);
      window.removeEventListener('resize', requestProgressUpdate);
    };
  }, []);

  const manifestoHighlightLines = [
    copy.manifesto.line1,
    copy.manifesto.line2,
    copy.manifesto.line3,
    copy.manifesto.line4,
  ];
  const manifestoLineHighlightStrengths = manifestoHighlightLines.map((_, index) => {
    const segmentSize = 1 / manifestoHighlightLines.length;
    const segmentStart = index * segmentSize;
    const segmentProgress = (manifestoScrollProgress - segmentStart) / segmentSize;

    if (segmentProgress <= 0 || segmentProgress >= 1) {
      return 0;
    }

    const triangularProgress = segmentProgress <= 0.5
      ? segmentProgress * 2
      : (1 - segmentProgress) * 2;

    // Smooths the highlight in/out while staying locked to scroll progress.
    return triangularProgress * triangularProgress * (3 - 2 * triangularProgress);
  });

  const featureCards = [
    {
      title: copy.features.cards.digitalProducts.title,
      desc: copy.features.cards.digitalProducts.desc,
      preview: <DigitalProductsFeaturePreview />,
      overlayClass: 'from-[#0B1926]/28 via-[#0B1926]/8 to-transparent',
      metricLabel: copy.features.cards.digitalProducts.metricLabel,
      metricValue: copy.features.cards.digitalProducts.metricValue,
      icon: <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />,
    },
    {
      title: copy.features.cards.courses.title,
      desc: copy.features.cards.courses.desc,
      videoSrc: FEATURE_VIDEO_COURSE_BUILDER,
      videoClassName: undefined,
      overlayClass: 'from-[#0B1926]/36 via-[#0B1926]/9 to-transparent',
      metricLabel: copy.features.cards.courses.metricLabel,
      metricValue: copy.features.cards.courses.metricValue,
      icon: <Check className="w-4 h-4 text-blue-500" />,
    },
    {
      title: copy.features.cards.coaching.title,
      desc: copy.features.cards.coaching.desc,
      preview: <CoachingCallsFeaturePreview />,
      overlayClass: 'from-[#0B1926]/38 via-[#0B1926]/12 to-transparent',
      metricLabel: copy.features.cards.coaching.metricLabel,
      metricValue: copy.features.cards.coaching.metricValue,
      icon: <Users className="w-3.5 h-3.5 text-green-600" />,
    },
    {
      title: copy.features.cards.memberships.title,
      desc: copy.features.cards.memberships.desc,
      preview: <MembershipsFeaturePreview />,
      overlayClass: 'from-[#0B1926]/30 via-[#0B1926]/7 to-transparent',
      metricLabel: copy.features.cards.memberships.metricLabel,
      metricValue: copy.features.cards.memberships.metricValue,
      icon: <Lock className="w-3.5 h-3.5 text-purple-500" />,
    },
    {
      title: copy.features.cards.analytics.title,
      desc: copy.features.cards.analytics.desc,
      preview: <AnalyticsFeaturePreview />,
      overlayClass: 'from-[#0B1926]/30 via-[#0B1926]/6 to-transparent',
      metricLabel: copy.features.cards.analytics.metricLabel,
      metricValue: copy.features.cards.analytics.metricValue,
      icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />,
    },
    {
      title: copy.features.cards.designSite.title,
      desc: copy.features.cards.designSite.desc,
      preview: (
        <iframe
          src="/videos/features/design-link-in-bio-site-loop.html"
          title={copy.features.cards.designSite.imageAlt}
          className="w-full h-full border-0 pointer-events-none bg-[#050814]"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />
      ),
      overlayClass: 'from-[#0B1926]/34 via-[#0B1926]/10 to-transparent',
      metricLabel: copy.features.cards.designSite.metricLabel,
      metricValue: copy.features.cards.designSite.metricValue,
      icon: <Globe className="w-3.5 h-3.5 text-cyan-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackgroundVideoLoop />
        </div>
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-8 py-16 sm:py-20">
          <div className="w-full lg:w-[55%] text-left">
            <h1
              className="text-[34px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.2s',
              }}
            >
              <span className="relative block h-[1.08em]">
                <span
                  key={`${locale}-hero-phrase-${heroPhraseIndex}`}
                  className="hero-phrase-gradient absolute inset-x-0 top-0 whitespace-nowrap italic"
                >
                  {heroRotatingPhrases[heroPhraseIndex % heroRotatingPhrases.length]}
                </span>
              </span>
              <span className="block">{copy.hero.titleEnd}</span>
            </h1>
            <p
              className="text-white text-base md:text-[17px] max-w-[550px] leading-[1.6] mb-8 mx-auto lg:mx-0"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.5s',
              }}
            >
              {copy.hero.subheadline}
            </p>
            <div
              className="mx-auto w-full max-w-[480px] lg:mx-0"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.8s',
              }}
            >
              <UrlInputBar />
            </div>
          </div>

          <div
            className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pr-12 xl:pr-16"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.6s',
            }}
          >
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ===== 2. MANIFESTO / CREATOR CAROUSEL ===== */}
      <section ref={manifestoSectionRef} className="pt-20 pb-12 md:pt-32 md:pb-20">
        <div className="container">
          <SectionWrapper>
            <h2 className="w-full text-left text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-bold leading-[1.12] tracking-[-0.02em]">
              <span className="text-white">{copy.manifesto.intro}</span>
              {manifestoHighlightLines.map((line, index) => (
                <span
                  key={`${locale}-manifesto-line-${index}`}
                  className="manifesto-line-scroll"
                  style={{ '--line-highlight': manifestoLineHighlightStrengths[index] } as CSSProperties}
                >
                  {line}
                </span>
              ))}
            </h2>
          </SectionWrapper>
        </div>
        <div className="mt-16 md:mt-24">
          <SectionWrapper delay={200}>
            <CreatorCarousel />
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 3. FEATURE CARDS SECTION ===== */}
      <section className="pt-4 pb-16 md:pt-6 md:pb-24">
        <div className="container">
          <SectionWrapper>
            <p className={SECTION_EYEBROW_CLASS}>{copy.features.eyebrow}</p>
            <h2 className={`${SECTION_HEADLINE_CLASS} max-w-[700px] lg:max-w-none mb-12 md:mb-16`}>
              {copy.features.headline}
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featureCards.map((card, i) => (
              <SectionWrapper key={card.title} delay={i * 80}>
                <div className="border border-white/[0.08] rounded-[20px] overflow-hidden h-full hover:border-white/[0.12] transition-all duration-300 group">
                  <div className="h-[320px] sm:h-[390px] relative overflow-hidden">
                    {card.videoSrc ? (
                      <video
                        src={card.videoSrc}
                        className={`w-full h-full ${card.videoClassName ?? 'object-cover'}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="w-full h-full">{card.preview}</div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.overlayClass ?? 'from-[#0B1926] via-[#0B1926]/75 to-black/20'}`} />
                  </div>
                  <div className="bg-[#0A0A0A] p-6 sm:p-7 pt-6">
                    <h3 className="text-white text-[24px] font-semibold mb-2">{card.title}</h3>
                    <p className="text-[#8A8F98] text-[15px] leading-[1.6]">{card.desc}</p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. TIKTOK STORE OPTIMIZATION SECTION ===== */}
      <section id="tienda-optimizada-tiktok" className="scroll-mt-24 pt-4 pb-16 md:pt-6 md:pb-24">
        <div className="container">
          <SectionWrapper>
            <p className={SECTION_EYEBROW_CLASS}>{copy.tiktokStore.eyebrow}</p>
            <h2 className={`${SECTION_HEADLINE_CLASS} max-w-[760px] lg:max-w-none mb-12 md:mb-16`}>
              {copy.tiktokStore.headline}
            </h2>
          </SectionWrapper>

          <SectionWrapper delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="card-navy-teal overflow-hidden p-5 md:p-6 transition-all duration-300">
                <div className="relative h-[260px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-[#050814]">
                  <VerifiedBadgePreview />
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h3 className="text-white font-bold text-xl mb-3">{copy.tiktokStore.verifiedTitle}</h3>
                  <p className="text-[#8A8F98] text-[15px] leading-[1.6]">
                    {copy.tiktokStore.verifiedBody}
                  </p>
                </div>
              </div>

              <div className="card-navy-teal overflow-hidden p-5 md:p-6 transition-all duration-300">
                <div className="relative h-[260px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-[#050814]">
                  <video
                    src={FEATURE_VIDEO_TIKTOK_BROWSER_GUIDE}
                    className="w-full h-full object-contain bg-[#050814]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={copy.tiktokStore.browserVideoLabel}
                  />
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h3 className="text-white font-bold text-xl mb-3">{copy.tiktokStore.browserTitle}</h3>
                  <p className="text-[#8A8F98] text-[15px] leading-[1.6]">
                    {copy.tiktokStore.browserBody}
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 7. ANALYTICS SECTION ===== */}
      <section className="pt-4 pb-20 md:pt-6 md:pb-32">
        <div className="container">
          <SectionWrapper>
            <p className={SECTION_EYEBROW_CLASS}>{copy.analytics.eyebrow}</p>
            <h2 className={`${SECTION_HEADLINE_CLASS} mb-12 md:mb-16`}>
              {copy.analytics.headline}
            </h2>
          </SectionWrapper>

          <SectionWrapper delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-navy-teal overflow-hidden p-5 md:p-6 transition-all duration-300">
                <div className="relative h-[230px] sm:h-[260px] md:h-[340px] lg:h-[380px]">
                  <WorldMap />
                  {/* Floating stat cards */}
                  <div className="hidden sm:block absolute top-4 left-4 md:top-6 md:left-6 bg-white rounded-xl p-3 shadow-xl animate-bob z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Eye className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium">{copy.analytics.profileViews}</div>
                        <div className="text-black font-bold text-lg leading-tight">1.2M</div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block absolute top-20 left-4 md:top-24 md:left-6 bg-white rounded-xl p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium">{copy.analytics.linkClicks}</div>
                        <div className="text-black font-bold text-lg leading-tight">14k</div>
                      </div>
                    </div>
                  </div>

                  {/* Country breakdown */}
                  <div className="hidden sm:block absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-xl p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '1.5s' }}>
                    <div className="space-y-2.5">
                      {copy.analytics.countries.map((item) => (
                        <div key={item.rank} className="flex items-center gap-3">
                          <span className="text-xl">{item.flag}</span>
                          <div>
                            <div className="text-black font-bold text-sm">{item.rank}. {item.country}</div>
                            <div className="text-gray-400 text-[11px]">{item.views}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h3 className="text-white font-bold text-xl mb-3">{copy.analytics.cardOneTitle}</h3>
                  <p className="text-[#8A8F98] text-[15px] leading-[1.6] max-w-[700px]">
                    {copy.analytics.cardOneBody}
                  </p>
                </div>
              </div>

              <div className="card-navy-teal overflow-hidden p-5 md:p-6 transition-all duration-300">
                <div className="relative h-[260px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-[#050814]">
                  <iframe
                    src="/videos/features/premium_analytics_loop_v2.html"
                    title={copy.analytics.frameTitle}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h3 className="text-white font-bold text-xl mb-3">{copy.analytics.cardTwoTitle}</h3>
                  <p className="text-[#8A8F98] text-[15px] leading-[1.6]">
                    {copy.analytics.cardTwoBody}
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 13. FINAL CTA SECTION ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="max-w-[750px] mx-auto px-4 sm:px-6 md:px-8 text-center">
              <h2 className="text-[38px] sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tight text-[#F1F3F7]">
                {copy.finalCta.line1}<br />
                {copy.finalCta.line2}<br />
                {copy.finalCta.line3}
              </h2>

              <button
                type="button"
                className="mt-10 sm:mt-12 w-full sm:w-auto min-w-[164px] bg-white text-black text-[16px] font-semibold px-8 py-3 rounded-full hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {copy.finalCta.primaryCta}
              </button>

              <div className="mt-6 flex flex-col items-center gap-6 text-[15px]">
                <p className="text-[#FF624F]">✓ {copy.finalCta.trust1}</p>
                <a
                  href="#tienda-optimizada-tiktok"
                  className="text-[#D94B78] transition-colors duration-200 hover:text-[#E36A92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94B78]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] rounded-sm"
                >
                  ✓ {copy.finalCta.trust2}
                </a>
                <a
                  href="#tienda-optimizada-tiktok"
                  className="text-[#5B4BFF] transition-colors duration-200 hover:text-[#7B6DFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4BFF]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] rounded-sm"
                >
                  ✓ {copy.finalCta.trust3}
                </a>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ===== SUB-COMPONENTS =====

function DigitalProductsFeaturePreview() {
  const { locale } = useLanguage();
  const copy = DIGITAL_PRODUCT_PREVIEW_COPY[locale];
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((current) => (current + 1) % copy.items.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [copy.items.length]);

  const activeItem = copy.items[activeProduct];

  return (
    <div className="h-full w-full overflow-hidden bg-[#0B1926] px-4 py-5 flex items-center justify-center" aria-hidden="true">
      <div className="digital-product-preview-frame relative w-full max-w-[360px] h-full max-h-[332px] min-h-[268px] rounded-[26px] border border-white/12 bg-[#07111D] shadow-[0_28px_70px_rgba(0,0,0,0.34)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0)_34%),linear-gradient(180deg,_rgba(10,26,43,0.92),_#050913)]" />
        <div className="absolute inset-0 digital-product-grid opacity-45" />

        <div className="absolute left-4 top-5 bottom-[74px] w-[40%] max-w-[136px]">
          {copy.items.map((item, index) => {
            const isActive = index === activeProduct;

            return (
              <div
                key={item.title}
                className="absolute inset-0 rounded-[18px] border border-white/18 overflow-hidden shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-[opacity,transform,filter] duration-700 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0)' : 'blur(5px)',
                  transform: isActive ? 'translate3d(0,0,0) scale(1)' : 'translate3d(-8px,10px,0) scale(0.96)',
                  boxShadow: isActive ? `0 18px 42px ${item.accent}33` : undefined,
                }}
              >
                <img
                  src={item.imageSrc}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </div>
            );
          })}
        </div>

        <div className="absolute right-4 top-5 left-[48%] bottom-[74px] min-w-0">
          <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.075] p-3.5 sm:p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div key={`copy-${activeProduct}`} className="digital-product-copy-shift min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex min-w-0 items-center rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/62">
                  <span className="truncate">{activeItem.label}</span>
                </div>
                <div className="shrink-0 text-[14px] sm:text-[16px] font-bold leading-none text-white">
                  {activeItem.price}
                </div>
              </div>
              <h4 className="mt-2 text-[17px] sm:text-[19px] font-bold leading-[1.03] tracking-tight text-white">
                {activeItem.title}
              </h4>
              <p className="mt-1 hidden sm:block truncate text-[11px] leading-tight text-white/52">
                {activeItem.subtitle}
              </p>
            </div>

            <div className="absolute left-3.5 right-3.5 bottom-3.5 space-y-1">
              {copy.items.map((item, index) => {
                const isActive = index === activeProduct;

                return (
                  <div
                    key={`type-${item.title}`}
                    className="h-6 rounded-[9px] border bg-white/[0.045] px-1.5 flex items-center gap-1.5 transition-colors duration-500"
                    style={{
                      borderColor: isActive ? `${item.accent}80` : 'rgba(255, 255, 255, 0.1)',
                      backgroundColor: isActive ? `${item.accent}18` : undefined,
                    }}
                  >
                    <img
                      src={item.imageSrc}
                      alt=""
                      className="h-4 w-4 shrink-0 rounded-[5px] object-cover"
                      draggable="false"
                    />
                    <span className="min-w-0 truncate text-[8px] font-bold uppercase tracking-[0.1em] text-white/62">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div key={`receipt-${activeProduct}`} className="digital-product-receipt absolute left-4 right-4 bottom-4 h-[50px] rounded-[18px] border border-white/10 bg-[#091522]/92 px-4 flex items-center justify-between shadow-[0_18px_38px_rgba(0,0,0,0.24)]">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#51E29A]">{copy.statusLabel}</div>
            <div className="mt-1 text-[11px] text-white/52 truncate">{copy.checkoutLabel}</div>
          </div>
          <div className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#51E29A]/14">
            <Check className="h-4 w-4 text-[#51E29A]" />
          </div>
          <div className="absolute left-4 right-4 bottom-0 h-px overflow-hidden bg-white/10">
            <div className="digital-product-progress h-full bg-[#51E29A]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroBackgroundVideoLoop() {
  const [frontSlot, setFrontSlot] = useState<0 | 1>(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [slotVideoIndices, setSlotVideoIndices] = useState<[number, number]>([
    0,
    HERO_BG_VIDEO_SOURCES.length > 1 ? 1 : 0,
  ]);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crossfadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getBackSlot = (slot: 0 | 1): 0 | 1 => (slot === 0 ? 1 : 0);
  const getVideoBySlot = (slot: 0 | 1) => (slot === 0 ? videoARef.current : videoBRef.current);

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  const clearCrossfadeTimer = () => {
    if (crossfadeTimerRef.current) {
      clearTimeout(crossfadeTimerRef.current);
      crossfadeTimerRef.current = null;
    }
  };

  const safePlay = (videoEl: HTMLVideoElement) => {
    const playPromise = videoEl.play();
    if (playPromise) {
      void playPromise.catch(() => undefined);
    }
  };

  const advanceToNextVideo = () => {
    if (isCrossfading || HERO_BG_VIDEO_SOURCES.length <= 1) {
      return;
    }

    clearAdvanceTimer();
    clearCrossfadeTimer();

    const nextVideoIndex = (activeVideoIndex + 1) % HERO_BG_VIDEO_SOURCES.length;
    const nextFrontSlot = getBackSlot(frontSlot);
    const nextFrontVideoEl = getVideoBySlot(nextFrontSlot);

    if (!nextFrontVideoEl) {
      return;
    }

    const beginCrossfade = () => {
      nextFrontVideoEl.currentTime = 0;
      safePlay(nextFrontVideoEl);
      setIsCrossfading(true);
      setFrontSlot(nextFrontSlot);

      crossfadeTimerRef.current = setTimeout(() => {
        const previousFrontSlot = getBackSlot(nextFrontSlot);
        const previousFrontVideoEl = getVideoBySlot(previousFrontSlot);
        if (previousFrontVideoEl) {
          previousFrontVideoEl.pause();
          previousFrontVideoEl.currentTime = 0;
        }

        setActiveVideoIndex(nextVideoIndex);
        setIsCrossfading(false);

        const preloadIndex = (nextVideoIndex + 1) % HERO_BG_VIDEO_SOURCES.length;
        setSlotVideoIndices((current) => {
          const updated: [number, number] = [current[0], current[1]];
          updated[previousFrontSlot] = preloadIndex;
          return updated;
        });

        clearCrossfadeTimer();
      }, HERO_BG_VIDEO_CROSSFADE_MS);
    };

    if (nextFrontVideoEl.readyState >= 2) {
      beginCrossfade();
      return;
    }

    const onCanPlay = () => {
      nextFrontVideoEl.removeEventListener('canplay', onCanPlay);
      beginCrossfade();
    };

    nextFrontVideoEl.addEventListener('canplay', onCanPlay);
    nextFrontVideoEl.load();
  };

  useEffect(() => {
    const activeVideoEl = getVideoBySlot(frontSlot);
    if (!activeVideoEl) {
      return;
    }

    safePlay(activeVideoEl);

    if (isCrossfading || HERO_BG_VIDEO_SOURCES.length <= 1) {
      return;
    }

    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      advanceToNextVideo();
    }, HERO_BG_VIDEO_MAX_DURATION_MS);

    return () => {
      clearAdvanceTimer();
    };
  }, [frontSlot, activeVideoIndex, isCrossfading]);

  useEffect(() => {
    if (isCrossfading) {
      return;
    }

    const backSlot = getBackSlot(frontSlot);
    const backVideoEl = getVideoBySlot(backSlot);
    if (!backVideoEl) {
      return;
    }

    backVideoEl.pause();
    backVideoEl.currentTime = 0;
    backVideoEl.load();
  }, [slotVideoIndices, frontSlot, isCrossfading]);

  useEffect(() => {
    const activeVideoEl = getVideoBySlot(frontSlot);
    if (!activeVideoEl) {
      return;
    }

    const onEnded = () => {
      advanceToNextVideo();
    };

    activeVideoEl.addEventListener('ended', onEnded);
    return () => {
      activeVideoEl.removeEventListener('ended', onEnded);
    };
  }, [frontSlot, activeVideoIndex, isCrossfading]);

  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      clearCrossfadeTimer();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoARef}
        src={HERO_BG_VIDEO_SOURCES[slotVideoIndices[0]]}
        className="absolute inset-0 w-full h-full object-cover transition-opacity ease-out"
        style={{
          opacity: frontSlot === 0 ? 1 : 0,
          transitionDuration: `${HERO_BG_VIDEO_CROSSFADE_MS}ms`,
        }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <video
        ref={videoBRef}
        src={HERO_BG_VIDEO_SOURCES[slotVideoIndices[1]]}
        className="absolute inset-0 w-full h-full object-cover transition-opacity ease-out"
        style={{
          opacity: frontSlot === 1 ? 1 : 0,
          transitionDuration: `${HERO_BG_VIDEO_CROSSFADE_MS}ms`,
        }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}

function MembershipsFeaturePreview() {
  const { locale } = useLanguage();
  const copy = HOME_COPY[locale].memberships;

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#D9E0EE] to-[#BCC7DA] p-5 flex items-center justify-center">
      <div className="w-[72%] h-[94%] bg-[#F5F8FE] rounded-[22px] overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.25)] border border-white/70 relative">
        <div className="h-[27%] bg-gradient-to-r from-[#2B84FF] via-[#5B68FF] to-[#6FDD9E] relative overflow-hidden">
          <div className="absolute -top-8 left-14 w-40 h-24 rounded-full bg-[#9EF2C8]/45 blur-sm animate-bob" />
          <div className="absolute top-2 left-28 w-36 h-16 rounded-full bg-[#A2A1FF]/55 blur-sm animate-bob" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-8 left-20 w-28 h-12 rounded-full bg-[#4740B8]/45 blur-sm animate-bob" style={{ animationDelay: '0.9s' }} />
        </div>
        <div className="px-4 pt-4">
          <h4 className="text-[#1F2535] text-[14px] font-bold leading-tight">{copy.title}</h4>
          <p className="text-[#1F2535] text-[13px] font-bold mt-1">$12 <span className="font-medium text-[#5B657E]">{copy.perMonth}</span></p>
          <div className="flex items-center gap-2 mt-2.5">
            <div className="w-5 h-5 rounded-full bg-[#E1E7F4]" />
            <span className="text-[#6E7690] text-[10px]">@creatorstudio</span>
          </div>
          <div className="space-y-1.5 mt-3.5">
            <div className="h-1.5 rounded-full bg-[#E5EAF6]" />
            <div className="h-1.5 rounded-full bg-[#E5EAF6] w-[93%]" />
            <div className="h-1.5 rounded-full bg-[#E5EAF6] w-[88%]" />
            <div className="h-1.5 rounded-full bg-[#E5EAF6] w-[76%]" />
          </div>
        </div>
        <div className="absolute left-4 right-4 bottom-4 h-9 rounded-xl bg-[#1E2432] flex items-center justify-center shadow-[0_12px_24px_rgba(15,23,42,0.35)]">
          <span className="text-white text-[11px] font-semibold">{copy.cta}</span>
        </div>
      </div>
    </div>
  );
}

function CoachingCallsFeaturePreview() {
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % COACHING_FRAMES.length);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-[#0B1926] relative overflow-hidden">
      {COACHING_FRAMES.map((src, index) => {
        const isActive = index === activeFrame;

        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[850ms] ease-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-35 blur-sm"
            />
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/4 pointer-events-none" />
    </div>
  );
}

function VerifiedBadgePreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2)_0%,_rgba(11,25,38,0.62)_42%,_#050814_100%)] flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[168px] h-[168px] sm:w-[190px] sm:h-[190px] md:w-[220px] md:h-[220px] text-[#38BDF8] drop-shadow-[0_28px_70px_rgba(56,189,248,0.38)]"
        aria-hidden="true"
      >
        <path
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
          fill="currentColor"
        />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
  );
}

function AnalyticsFeaturePreview() {
  const { locale } = useLanguage();

  return (
    <iframe
      src="/videos/features/premium_analytics_loop_v2.html"
      className="w-full h-full border-0 pointer-events-none"
      loading="lazy"
      title={HOME_COPY[locale].analytics.frameTitle}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
