/*
 * Hooks Landing Page — "Midnight Editorial" Design
 * Dark-mode only, near-black (#0A0A0A) bg, navy-teal cards (#0B1926-#0F2840),
 * orange accent (#E8930C), Inter font, magazine-scale typography.
 */

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import UrlInputBar from '@/components/UrlInputBar';
import CreatorCarousel from '@/components/CreatorCarousel';
import WorldMap from '@/components/WorldMap';
import PhoneMockup from '@/components/iphone-mockup/PhoneMockup';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/useMobile';
import { REGISTER_URL } from '@/lib/registerUrl';
import {
  Eye, Globe, ShoppingBag, Lock,
  BarChart3, Users,
  Instagram, Facebook, Youtube, Check,
  Play, Star, ArrowRight,
  Calendar, Video, Bell, Mic, PhoneOff,
  Bookmark, Compass,
  Crown, BookOpen, Headphones, Briefcase, Mail, Package, Radio,
  type LucideIcon
} from 'lucide-react';

type HeroBgVideo = {
  src: string;
  poster?: string;
  mobileObjectPosition?: string;
};
const HERO_BG_VIDEO_POSTER = '/images/hero/jumping-poster.jpg';
const HERO_BG_VIDEO_SOURCES: HeroBgVideo[] = [
  { src: '/videos/hero/jumping.mp4', poster: HERO_BG_VIDEO_POSTER },
  { src: '/videos/hero/showcase.mp4' },
  { src: '/videos/hero/girlstalkingtocamera.mp4' },
  { src: '/videos/hero/guysdancing.mp4' },
  { src: '/videos/hero/cooking.mp4' },
  { src: '/videos/hero/tiktokgirlsdancing.mp4' },
  { src: '/videos/hero/guyworkingout.mp4' },
  { src: '/videos/hero/girlstalking.mp4' },
  { src: '/videos/hero/gamer.mp4' },
];
const HERO_BG_VIDEO_MAX_DURATION_MS = 4000;
const HERO_BG_VIDEO_CROSSFADE_MS = 550;
const FEATURE_VIDEO_TIKTOK_BROWSER_GUIDE = '/videos/features/tiktok-browser-guide-screen-recording.mp4';
const SECTION_EYEBROW_CLASS = 'text-[#FF624F] text-base font-semibold mb-3';
const SECTION_HEADLINE_CLASS = 'text-[30px] sm:text-[40px] md:text-[48px] lg:text-[clamp(36px,3.6vw,56px)] font-bold leading-[1.1] tracking-[-0.02em] lg:whitespace-nowrap';
const FEATURE_CARD_CLASS = 'bg-[linear-gradient(180deg,_#0B1926_0%,_#0A0A0A_76%)] border border-white/[0.08] rounded-[20px] overflow-hidden h-full hover:border-white/[0.12] transition-colors duration-300 group';
const FEATURE_CARD_MEDIA_CLASS = 'h-[320px] sm:h-[390px] relative overflow-hidden bg-transparent';
const FEATURE_CARD_BODY_CLASS = 'bg-transparent p-6 sm:p-7 pt-6';
const FEATURE_CARD_TITLE_CLASS = 'text-white text-[24px] font-semibold mb-2';
const FEATURE_CARD_TEXT_CLASS = 'text-[#8A8F98] text-[15px] leading-[1.6]';
const FEATURE_CARD_CONTENT_CLASS = 'relative z-10 h-full w-full';

type DigitalProductKind =
  | 'membership'
  | 'guide'
  | 'masterclass'
  | 'bundle'
  | 'audio'
  | 'service'
  | 'newsletter';

type DigitalProductItem = {
  kind: DigitalProductKind;
  badge: string;
  category: string;
  title: string;
  price: string;
  cta: string;
  accent: string;
  accentSoft: string;
};

type DigitalProductCopy = {
  liveLabel: string;
  activityVerb: string;
  timeAgo: (minutes: number) => string;
  activityFeed: { name: string; productKind: DigitalProductKind; minutesAgo: number }[];
  items: DigitalProductItem[];
};

const DIGITAL_PRODUCT_KIND_ICON: Record<DigitalProductKind, LucideIcon> = {
  membership: Crown,
  guide: BookOpen,
  masterclass: Video,
  bundle: Package,
  audio: Headphones,
  service: Briefcase,
  newsletter: Mail,
};

const DIGITAL_PRODUCT_KIND_IMAGE: Record<DigitalProductKind, string> = {
  membership: '/images/digital-products/vip-community.png',
  guide: '/images/digital-products/first-1000-investing.png',
  masterclass: '/images/digital-products/conversational-english.png',
  bundle: '/images/digital-products/mobile-photography-pack.png',
  audio: '/images/digital-products/sleep-meditations.png',
  service: '/images/digital-products/instagram-audit.png',
  newsletter: '/images/digital-products/investment-letter.png',
};

const DIGITAL_PRODUCT_PREVIEW_COPY: Record<'en' | 'es', DigitalProductCopy> = {
  en: {
    liveLabel: 'Live',
    activityVerb: 'just bought',
    timeAgo: (minutes) => (minutes <= 1 ? 'just now' : `${minutes} min ago`),
    activityFeed: [
      { name: 'Camila', productKind: 'bundle', minutesAgo: 2 },
      { name: 'Jordan', productKind: 'masterclass', minutesAgo: 4 },
      { name: 'Sofía', productKind: 'audio', minutesAgo: 6 },
      { name: 'Liam', productKind: 'guide', minutesAgo: 1 },
    ],
    items: [
      {
        kind: 'membership',
        badge: 'Membership',
        category: 'Membership',
        title: 'VIP Community: weekly keto recipes',
        price: '$9/mo',
        cta: 'Join',
        accent: '#51E29A',
        accentSoft: 'rgba(81, 226, 154, 0.18)',
      },
      {
        kind: 'guide',
        badge: 'PDF',
        category: 'Guide',
        title: 'Invest your first $1,000 without mistakes',
        price: '$35',
        cta: 'Buy guide',
        accent: '#5AB7FF',
        accentSoft: 'rgba(90, 183, 255, 0.18)',
      },
      {
        kind: 'masterclass',
        badge: 'Live',
        category: 'Live masterclass',
        title: 'Conversational English in 90 days',
        price: '$25',
        cta: 'Reserve seat',
        accent: '#FF624F',
        accentSoft: 'rgba(255, 98, 79, 0.2)',
      },
      {
        kind: 'bundle',
        badge: 'Bundle',
        category: 'Bundle',
        title: 'Mobile photography pack (3 courses + presets)',
        price: '$97',
        cta: 'Get pack',
        accent: '#B58CFF',
        accentSoft: 'rgba(181, 140, 255, 0.2)',
      },
      {
        kind: 'audio',
        badge: 'Audio',
        category: 'Audio',
        title: 'Guided meditations to sleep better',
        price: '$15',
        cta: 'Listen now',
        accent: '#FFC859',
        accentSoft: 'rgba(255, 200, 89, 0.2)',
      },
      {
        kind: 'service',
        badge: 'Service',
        category: 'Service',
        title: 'Instagram audit (PDF + Loom)',
        price: '$120',
        cta: 'Request audit',
        accent: '#FF8AC2',
        accentSoft: 'rgba(255, 138, 194, 0.2)',
      },
      {
        kind: 'newsletter',
        badge: 'Newsletter',
        category: 'Paid newsletter',
        title: 'Weekly investment letter',
        price: '$5/mo',
        cta: 'Subscribe',
        accent: '#6BD3FF',
        accentSoft: 'rgba(107, 211, 255, 0.18)',
      },
    ],
  },
  es: {
    liveLabel: 'En vivo',
    activityVerb: 'acaba de comprar',
    timeAgo: (minutes) => (minutes <= 1 ? 'ahora' : `hace ${minutes} min`),
    activityFeed: [
      { name: 'Camila', productKind: 'bundle', minutesAgo: 2 },
      { name: 'Diego', productKind: 'masterclass', minutesAgo: 4 },
      { name: 'Sofía', productKind: 'audio', minutesAgo: 6 },
      { name: 'Lucía', productKind: 'guide', minutesAgo: 1 },
    ],
    items: [
      {
        kind: 'membership',
        badge: 'Membresía',
        category: 'Membresía',
        title: 'Comunidad VIP: recetas keto semanales',
        price: '$9/mes',
        cta: 'Unirme',
        accent: '#51E29A',
        accentSoft: 'rgba(81, 226, 154, 0.18)',
      },
      {
        kind: 'guide',
        badge: 'PDF',
        category: 'Guía',
        title: 'Invierte tus primeros $1.000 sin equivocarte',
        price: '$35',
        cta: 'Comprar guía',
        accent: '#5AB7FF',
        accentSoft: 'rgba(90, 183, 255, 0.18)',
      },
      {
        kind: 'masterclass',
        badge: 'Vivo',
        category: 'Masterclass en vivo',
        title: 'Inglés conversacional en 90 días',
        price: '$25',
        cta: 'Reservar',
        accent: '#FF624F',
        accentSoft: 'rgba(255, 98, 79, 0.2)',
      },
      {
        kind: 'bundle',
        badge: 'Paquete',
        category: 'Paquete',
        title: 'Pack completo de fotografía móvil (3 cursos + presets)',
        price: '$97',
        cta: 'Obtener pack',
        accent: '#B58CFF',
        accentSoft: 'rgba(181, 140, 255, 0.2)',
      },
      {
        kind: 'audio',
        badge: 'Audio',
        category: 'Audio',
        title: 'Meditaciones guiadas para dormir mejor',
        price: '$15',
        cta: 'Escuchar ahora',
        accent: '#FFC859',
        accentSoft: 'rgba(255, 200, 89, 0.2)',
      },
      {
        kind: 'service',
        badge: 'Servicio',
        category: 'Servicio',
        title: 'Auditoría de tu Instagram (PDF + Loom)',
        price: '$120',
        cta: 'Solicitar auditoría',
        accent: '#FF8AC2',
        accentSoft: 'rgba(255, 138, 194, 0.2)',
      },
      {
        kind: 'newsletter',
        badge: 'Newsletter',
        category: 'Newsletter de pago',
        title: 'Carta semanal de inversión',
        price: '$5/mes',
        cta: 'Suscribirme',
        accent: '#6BD3FF',
        accentSoft: 'rgba(107, 211, 255, 0.18)',
      },
    ],
  },
};

type CoursePreviewItem = {
  category: string;
  title: string;
  desc: string;
  imageUrl: string;
  imagePosition?: string;
  price?: string;
  oldPrice?: string;
  rating?: string;
  discount?: string;
  durationLabel?: string;
  cta: string;
  accent: string;
  buyer: string;
};

const COURSE_IMAGE_SHORT_FORM_VIDEO = '/images/local-photos/photo-1753005329524-f2f26aa6e5ad-900-0b3f9984.jpg';
const COURSE_IMAGE_MONETIZATION = '/images/local-photos/photo-1751257983922-a627088d4c21-900-5dcdc8fb.jpg';
const COURSE_IMAGE_PERSONAL_FINANCE = '/images/local-photos/photo-1554224155-6726b3ff858f-900-29f5141f.jpg';
const COURSE_IMAGE_FITNESS = '/images/local-photos/photo-1517836357463-d25dfeac3438-900-903a3545.jpg';

const COURSES_PREVIEW_COPY: Record<'en' | 'es', { eyebrow: string; items: CoursePreviewItem[] }> = {
  en: {
    eyebrow: 'Just sold',
    items: [
      {
        category: 'Short-form video',
        title: 'Short-Form Video Accelerator',
        desc: 'Create scroll-stopping TikToks, Reels, and Shorts that grow your audience fast.',
        imageUrl: COURSE_IMAGE_SHORT_FORM_VIDEO,
        imagePosition: 'center',
        price: '$79.99',
        oldPrice: '$159.98',
        rating: '4.9',
        discount: '50% OFF',
        cta: 'Get started',
        accent: '#FF4F8A',
        buyer: 'Maya · 12s ago',
      },
      {
        category: 'Monetization',
        title: 'Creator Monetization Bootcamp',
        desc: 'Turn content into income with digital products, communities, and sponsorships.',
        imageUrl: COURSE_IMAGE_MONETIZATION,
        imagePosition: 'center 72%',
        durationLabel: '10 min preview',
        cta: 'Watch now',
        accent: '#FFB14F',
        buyer: '128 watching now',
      },
      {
        category: 'Personal finance',
        title: 'Personal Finance Blueprint',
        desc: 'Budget, invest, and build long-term wealth with simple, creator-friendly systems.',
        imageUrl: COURSE_IMAGE_PERSONAL_FINANCE,
        imagePosition: 'center 45%',
        price: '$89.99',
        oldPrice: '$179.98',
        rating: '4.8',
        discount: '50% OFF',
        cta: 'Get started',
        accent: '#5AB7FF',
        buyer: 'Jordan · 32s ago',
      },
      {
        category: 'Fitness',
        title: 'Lean Body Transformation',
        desc: 'Build strength, lose fat, and create a sustainable routine without endless gym hours.',
        imageUrl: COURSE_IMAGE_FITNESS,
        imagePosition: 'center 42%',
        price: '$74.99',
        oldPrice: '$149.98',
        rating: '4.9',
        discount: '50% OFF',
        cta: 'Start training',
        accent: '#51E29A',
        buyer: 'Liv · 4s ago',
      },
    ],
  },
  es: {
    eyebrow: 'Recién vendido',
    items: [
      {
        category: 'Videos cortos',
        title: 'Acelerador de videos cortos',
        desc: 'Crea TikToks, Reels y Shorts que detienen el scroll y hacen crecer tu audiencia.',
        imageUrl: COURSE_IMAGE_SHORT_FORM_VIDEO,
        imagePosition: 'center',
        price: '$79.99',
        oldPrice: '$159.98',
        rating: '4.9',
        discount: '50% OFF',
        cta: 'Empezar',
        accent: '#FF4F8A',
        buyer: 'Sofía · hace 12s',
      },
      {
        category: 'Monetización',
        title: 'Bootcamp de monetización',
        desc: 'Convierte tu contenido en ingresos con productos digitales, comunidades y patrocinios.',
        imageUrl: COURSE_IMAGE_MONETIZATION,
        imagePosition: 'center 72%',
        durationLabel: 'Vista previa · 10 min',
        cta: 'Ver ahora',
        accent: '#FFB14F',
        buyer: '128 viendo ahora',
      },
      {
        category: 'Finanzas',
        title: 'Plan de finanzas personales',
        desc: 'Aprende a presupuestar, invertir y construir riqueza con sistemas simples para creadores.',
        imageUrl: COURSE_IMAGE_PERSONAL_FINANCE,
        imagePosition: 'center 45%',
        price: '$89.99',
        oldPrice: '$179.98',
        rating: '4.8',
        discount: '50% OFF',
        cta: 'Empezar',
        accent: '#5AB7FF',
        buyer: 'Diego · hace 32s',
      },
      {
        category: 'Fitness',
        title: 'Transformación corporal lean',
        desc: 'Gana fuerza, pierde grasa y arma una rutina sostenible sin pasar horas en el gimnasio.',
        imageUrl: COURSE_IMAGE_FITNESS,
        imagePosition: 'center 42%',
        price: '$74.99',
        oldPrice: '$149.98',
        rating: '4.9',
        discount: '50% OFF',
        cta: 'Empezar a entrenar',
        accent: '#51E29A',
        buyer: 'Lucía · hace 4s',
      },
    ],
  },
};

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
      primaryCta: 'Start free — only pay when you sell',
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
      metricLabel: copy.features.cards.digitalProducts.metricLabel,
      metricValue: copy.features.cards.digitalProducts.metricValue,
      icon: <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />,
    },
    {
      title: copy.features.cards.courses.title,
      desc: copy.features.cards.courses.desc,
      preview: <CoursesFeaturePreview />,
      metricLabel: copy.features.cards.courses.metricLabel,
      metricValue: copy.features.cards.courses.metricValue,
      icon: <Check className="w-4 h-4 text-blue-500" />,
    },
    {
      title: copy.features.cards.coaching.title,
      desc: copy.features.cards.coaching.desc,
      preview: <CoachingCallsFeaturePreview />,
      metricLabel: copy.features.cards.coaching.metricLabel,
      metricValue: copy.features.cards.coaching.metricValue,
      icon: <Users className="w-3.5 h-3.5 text-green-600" />,
    },
    {
      title: copy.features.cards.memberships.title,
      desc: copy.features.cards.memberships.desc,
      preview: <MembershipsFeaturePreview />,
      metricLabel: copy.features.cards.memberships.metricLabel,
      metricValue: copy.features.cards.memberships.metricValue,
      icon: <Lock className="w-3.5 h-3.5 text-purple-500" />,
    },
    {
      title: copy.features.cards.analytics.title,
      desc: copy.features.cards.analytics.desc,
      preview: <AnalyticsFeaturePreview />,
      metricLabel: copy.features.cards.analytics.metricLabel,
      metricValue: copy.features.cards.analytics.metricValue,
      icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />,
    },
    {
      title: copy.features.cards.designSite.title,
      desc: copy.features.cards.designSite.desc,
      preview: <DesignSiteFeaturePreview />,
      metricLabel: copy.features.cards.designSite.metricLabel,
      metricValue: copy.features.cards.designSite.metricValue,
      icon: <Globe className="w-3.5 h-3.5 text-cyan-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-[74px]">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackgroundVideoLoop />
        </div>
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="container relative z-10 grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_306px] lg:gap-[clamp(3.5rem,7vw,7rem)] py-16 sm:py-20">
          <div className="w-full min-w-0 text-left">
            <h1
              className="text-[34px] sm:text-[52px] md:text-[64px] lg:text-[clamp(56px,5.4vw,72px)] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
              }}
            >
              <span
                key={`${locale}-hero-phrase-${heroPhraseIndex}`}
                className="hero-phrase-gradient block max-w-full whitespace-normal [text-wrap:balance] italic"
              >
                {heroRotatingPhrases[heroPhraseIndex % heroRotatingPhrases.length]}
              </span>
              <span className="block">{copy.hero.titleEnd}</span>
            </h1>
            <p
              className="text-white text-base md:text-[17px] max-w-[550px] leading-[1.6] mb-8 mx-auto lg:mx-0"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s',
              }}
            >
              {copy.hero.subheadline}
            </p>
            <div
              className="mx-auto w-full max-w-[480px] lg:mx-0"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s',
              }}
            >
              <UrlInputBar />
            </div>
          </div>

          <div
            className="w-full flex justify-center lg:justify-end"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
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
                <div className={FEATURE_CARD_CLASS}>
                  <div className={FEATURE_CARD_MEDIA_CLASS}>
                    <div className={FEATURE_CARD_CONTENT_CLASS}>{card.preview}</div>
                  </div>
                  <div className={FEATURE_CARD_BODY_CLASS}>
                    <h3 className={FEATURE_CARD_TITLE_CLASS}>{card.title}</h3>
                    <p className={FEATURE_CARD_TEXT_CLASS}>{card.desc}</p>
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
              <div className={FEATURE_CARD_CLASS}>
                <div className={FEATURE_CARD_MEDIA_CLASS}>
                  <div className="relative z-10 h-full w-full">
                    <VerifiedBadgePreview />
                  </div>
                </div>

                <div className={FEATURE_CARD_BODY_CLASS}>
                  <h3 className={FEATURE_CARD_TITLE_CLASS}>{copy.tiktokStore.verifiedTitle}</h3>
                  <p className={FEATURE_CARD_TEXT_CLASS}>
                    {copy.tiktokStore.verifiedBody}
                  </p>
                </div>
              </div>

              <div className={FEATURE_CARD_CLASS}>
                <div className={FEATURE_CARD_MEDIA_CLASS}>
                  <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-6 sm:px-10 sm:py-8">
                    <div className="relative h-full max-h-[350px] w-auto translate-y-[100px] scale-[1.7] aspect-[9/19.5] rounded-[28px] bg-[#050505] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_0_0_1px_rgba(255,255,255,0.16)]">
                      <div className="absolute -left-0.5 top-[92px] h-12 w-0.5 rounded-l-full bg-[#151515]" />
                      <div className="absolute -right-0.5 top-[118px] h-16 w-0.5 rounded-r-full bg-[#151515]" />
                      <div className="relative h-full w-full overflow-hidden rounded-[23px] bg-black">
                        <video
                          src={FEATURE_VIDEO_TIKTOK_BROWSER_GUIDE}
                          className="h-full w-full -translate-y-2 object-contain"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={copy.tiktokStore.browserVideoLabel}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={FEATURE_CARD_BODY_CLASS}>
                  <h3 className={FEATURE_CARD_TITLE_CLASS}>{copy.tiktokStore.browserTitle}</h3>
                  <p className={FEATURE_CARD_TEXT_CLASS}>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className={FEATURE_CARD_CLASS}>
                <div className={`${FEATURE_CARD_MEDIA_CLASS} h-[340px] sm:h-[390px]`}>
                  <WorldMap />
                  {/* Floating stat cards */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-white rounded-xl p-2 sm:p-3 shadow-xl animate-bob z-10">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium">{copy.analytics.profileViews}</div>
                        <div className="text-black font-bold text-base sm:text-lg leading-tight">1.2M</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[76px] left-3 sm:top-20 sm:left-4 md:top-24 md:left-6 bg-white rounded-xl p-2 sm:p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium">{copy.analytics.linkClicks}</div>
                        <div className="text-black font-bold text-base sm:text-lg leading-tight">14k</div>
                      </div>
                    </div>
                  </div>

                  {/* Country breakdown */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 bg-white rounded-xl p-2.5 sm:p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '1.5s' }}>
                    <div className="space-y-1.5 sm:space-y-2.5">
                      {copy.analytics.countries.map((item) => (
                        <div key={item.rank} className="flex items-center gap-2 sm:gap-3">
                          <span className="text-base sm:text-xl">{item.flag}</span>
                          <div>
                            <div className="text-black font-bold text-xs sm:text-sm leading-tight">{item.rank}. {item.country}</div>
                            <div className="text-gray-400 text-[10px] sm:text-[11px] leading-tight">{item.views}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={FEATURE_CARD_BODY_CLASS}>
                  <h3 className={FEATURE_CARD_TITLE_CLASS}>{copy.analytics.cardOneTitle}</h3>
                  <p className={`${FEATURE_CARD_TEXT_CLASS} max-w-[700px]`}>
                    {copy.analytics.cardOneBody}
                  </p>
                </div>
              </div>

              <div className={FEATURE_CARD_CLASS}>
                <div className={FEATURE_CARD_MEDIA_CLASS}>
                  <iframe
                    src="/videos/features/premium_analytics_loop_v2.html"
                    title={copy.analytics.frameTitle}
                    className="w-full h-full bg-transparent"
                    loading="lazy"
                  />
                </div>

                <div className={FEATURE_CARD_BODY_CLASS}>
                  <h3 className={FEATURE_CARD_TITLE_CLASS}>{copy.analytics.cardTwoTitle}</h3>
                  <p className={FEATURE_CARD_TEXT_CLASS}>
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

              <a
                href={REGISTER_URL}
                className="button-shine button-shine-primary mt-10 sm:mt-12 inline-flex w-full sm:w-auto min-w-[164px] items-center justify-center bg-white text-black text-[15px] sm:text-[16px] font-semibold leading-tight px-6 sm:px-8 py-3 sm:py-3.5 rounded-full whitespace-normal sm:whitespace-nowrap hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] active:text-white active:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] focus-visible:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] focus-visible:text-white focus-visible:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-[background,color,box-shadow,transform] duration-200"
              >
                <span>{copy.finalCta.primaryCta}</span>
              </a>

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

const DIGITAL_PRODUCT_ROTATION_MS = 2800;
const DIGITAL_PRODUCT_EASE = [0.22, 1, 0.36, 1] as const;
const DIGITAL_PRODUCT_ACTIVITY_INTERVAL_MS = 7200;
const DIGITAL_PRODUCT_ACTIVITY_VISIBLE_MS = 3200;
const DIGITAL_PRODUCT_STAGGER_S = 0.07;

type DigitalProductSlot = 'feature' | 'side1' | 'side2' | 'wide';

function DigitalProductCover({
  kind,
  accent,
  accentSoft,
  variant,
}: {
  kind: DigitalProductKind;
  accent: string;
  accentSoft: string;
  variant: DigitalProductSlot;
}) {
  const Icon = DIGITAL_PRODUCT_KIND_ICON[kind];
  const imageSrc = DIGITAL_PRODUCT_KIND_IMAGE[kind];
  const isFeature = variant === 'feature';
  const isWide = variant === 'wide';

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}38 0%, ${accentSoft} 38%, rgba(7, 17, 29, 0) 92%)`,
      }}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: 'brightness(0.94) saturate(1.08)',
          opacity: isWide ? 0.76 : 0.94,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(5, 9, 19, 0.04) 0%, rgba(5, 9, 19, 0.68) 100%), radial-gradient(120% 80% at 100% 0%, ${accent}22 0%, transparent 60%)`,
        }}
      />

      {kind === 'masterclass' && !isWide && (
        <>
          <div
            className="absolute -right-3 -bottom-3 h-16 w-16 rounded-full opacity-50"
            style={{ background: `radial-gradient(circle, ${accent}66 0%, transparent 70%)` }}
          />
        </>
      )}

      {kind === 'newsletter' && !isWide && (
        <div className="absolute right-2 bottom-2 rounded-[5px] border border-white/15 bg-black/30 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/80">
          NEW
        </div>
      )}

      {kind === 'service' && !isWide && (
        <div className="absolute right-2 bottom-2 flex flex-col gap-[3px] items-end">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <Check className="h-2 w-2" style={{ color: accent }} />
              <span className="h-[2px] w-7 rounded-full" style={{ background: `${accent}55` }} />
            </div>
          ))}
        </div>
      )}

      <Icon
        className={`absolute ${isFeature ? 'right-3 top-3 h-5 w-5' : isWide ? 'left-3 top-1/2 -translate-y-1/2 h-4 w-4' : 'left-2.5 top-2.5 h-3.5 w-3.5'}`}
        style={{ color: accent }}
        strokeWidth={2.2}
      />
    </div>
  );
}

function DigitalProductsFeaturePreview() {
  const { locale } = useLanguage();
  const copy = DIGITAL_PRODUCT_PREVIEW_COPY[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion() ?? false;

  const itemCount = copy.items.length;
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [hoveredKind, setHoveredKind] = useState<DigitalProductKind | null>(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const [showActivity, setShowActivity] = useState(false);

  // Reset on locale change so the cycle re-stars cleanly.
  useEffect(() => {
    setFeaturedIndex(0);
    setActivityIndex(0);
    setShowActivity(false);
  }, [locale]);

  // Featured card rotation. Pauses on hover and when prefers-reduced-motion.
  useEffect(() => {
    if (!isInView || reduceMotion || hoveredKind !== null) return;
    const interval = setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % itemCount);
    }, DIGITAL_PRODUCT_ROTATION_MS);
    return () => clearInterval(interval);
  }, [isInView, reduceMotion, hoveredKind, itemCount]);

  // Live activity toast cycle.
  useEffect(() => {
    if (!isInView || reduceMotion) {
      setShowActivity(false);
      return;
    }
    let cancelled = false;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      if (cancelled) return;
      setShowActivity(true);
      hideTimer = setTimeout(() => {
        if (cancelled) return;
        setShowActivity(false);
        setActivityIndex((c) => (c + 1) % copy.activityFeed.length);
      }, DIGITAL_PRODUCT_ACTIVITY_VISIBLE_MS);
    };
    const initialTimer = setTimeout(tick, 1400);
    const cycleInterval = setInterval(tick, DIGITAL_PRODUCT_ACTIVITY_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearTimeout(initialTimer);
      if (hideTimer) clearTimeout(hideTimer);
      clearInterval(cycleInterval);
    };
  }, [isInView, reduceMotion, copy.activityFeed.length]);

  const featuredItem = copy.items[featuredIndex % itemCount];
  const sideItem1 = copy.items[(featuredIndex + 1) % itemCount];
  const sideItem2 = copy.items[(featuredIndex + 2) % itemCount];
  const wideItem = copy.items[(featuredIndex + 3) % itemCount];

  const activity = copy.activityFeed[activityIndex];
  const activityProduct =
    copy.items.find((it) => it.kind === activity.productKind) ?? copy.items[0];

  const renderCard = (
    item: DigitalProductItem,
    slot: DigitalProductSlot,
    delay: number,
  ) => {
    const isHovered = hoveredKind === item.kind;
    const isFeature = slot === 'feature';
    const isWide = slot === 'wide';

    const cardClass = [
      'relative overflow-hidden rounded-[16px] border border-white/10 bg-[#0B1A2A]',
      'transition-shadow duration-300',
      isWide ? 'h-full' : 'h-full',
    ].join(' ');

    return (
      <motion.div
        initial={false}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.97 }
        }
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : delay, ease: DIGITAL_PRODUCT_EASE }}
        whileHover={reduceMotion ? undefined : { scale: 1.025, y: -2 }}
        onHoverStart={() => setHoveredKind(item.kind)}
        onHoverEnd={() => setHoveredKind(null)}
        onTapStart={() => setHoveredKind(item.kind)}
        onTap={() => setHoveredKind((current) => (current === item.kind ? null : item.kind))}
        className={cardClass}
        style={{
          boxShadow: isHovered
            ? `0 12px 28px rgba(0, 0, 0, 0.45), 0 0 0 1px ${item.accent}66, 0 0 24px ${item.accent}33`
            : '0 4px 14px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          key={`${slot}-cover-${item.kind}`}
          className="absolute inset-0 digital-product-card-fade"
        >
          <DigitalProductCover
            kind={item.kind}
            accent={item.accent}
            accentSoft={item.accentSoft}
            variant={slot}
          />
        </div>

        {/* Card content */}
        <div
          key={`${slot}-content-${item.kind}`}
          className={`digital-product-card-fade ${
            isWide
              ? 'absolute inset-0 z-10 flex items-center gap-3 pl-9 pr-3'
              : isFeature
                ? 'absolute inset-0 z-10 flex flex-col justify-end p-3'
                : 'absolute inset-0 z-10 flex flex-col justify-end p-2.5'
          }`}
        >
            {!isWide && (
              <div
                className={`absolute inline-flex min-w-0 items-center gap-1 overflow-hidden rounded-full border border-white/15 bg-black/45 backdrop-blur-sm ${
                  isFeature
                    ? 'left-3 top-3 max-w-[calc(100%-4rem)] px-2 py-1'
                    : 'right-2 top-2 max-w-[calc(100%-4.25rem)] px-1.5 py-[3px]'
                }`}
              >
                <span
                  className={`${isFeature ? 'text-[9px]' : 'text-[8px]'} block min-w-0 truncate whitespace-nowrap font-bold uppercase tracking-[0.1em] text-white/85`}
                >
                  {item.badge}
                </span>
              </div>
            )}
            {isWide ? (
              <>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[8.5px] font-bold uppercase tracking-[0.14em] truncate"
                    style={{ color: item.accent }}
                  >
                    {item.badge}
                  </div>
                  <div className="mt-0.5 text-[12px] font-semibold leading-tight text-white truncate">
                    {item.title}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[13px] font-bold tabular-nums text-white">{item.price}</span>
                  <span
                    className="inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#0A1726]"
                    style={{ background: item.accent }}
                  >
                    {item.cta}
                    <ArrowRight className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                </div>
              </>
            ) : isFeature ? (
              <>
                <h4 className="text-[14px] font-bold leading-[1.15] text-white line-clamp-2">
                  {item.title}
                </h4>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[16px] font-bold tabular-nums text-white">{item.price}</span>
                  <span
                    className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold text-[#0A1726] transition-transform duration-200"
                    style={{
                      background: item.accent,
                      transform: isHovered && !reduceMotion ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {item.cta}
                    <ArrowRight className="h-3 w-3" strokeWidth={3} />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="text-[10px] font-semibold leading-tight text-white/95 line-clamp-2">
                  {item.title}
                </div>
                <div className="mt-1 text-[12px] font-bold tabular-nums text-white">
                  {item.price}
                </div>
              </>
            )}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-transparent px-3 py-4 sm:px-4 sm:py-5 flex items-center justify-center"
    >
      <div
        className="digital-product-preview-frame relative w-full max-w-[360px] h-full max-h-[332px] min-h-[268px] rounded-[26px] border border-white/12 bg-[#07111D] overflow-hidden"
        onMouseLeave={() => setHoveredKind(null)}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0)_34%),linear-gradient(180deg,_rgba(10,26,43,0.92),_#050913)]" />
        <div className="absolute inset-0 digital-product-grid opacity-45" />

        {/* Live activity toast — pops over the wide bottom row's right side */}
        <AnimatePresence initial={false}>
          {showActivity && !reduceMotion && (
            <motion.div
              key={`activity-${activityIndex}`}
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
              className="absolute top-2.5 right-2.5 z-30 flex max-w-[60%] items-center gap-1.5 rounded-full border border-white/18 bg-[#0B1A2A]/95 px-2 py-1 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.5)]"
            >
              <span
                className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${activityProduct.accent}26` }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: activityProduct.accent,
                    boxShadow: `0 0 0 2px ${activityProduct.accent}33`,
                  }}
                />
              </span>
              <span className="min-w-0 truncate text-[9.5px] leading-none text-white/85">
                <span className="font-semibold text-white">{activity.name}</span>
                <span className="text-white/45"> · </span>
                <span style={{ color: activityProduct.accent }}>{activityProduct.category}</span>
                <span className="text-white/45"> · </span>
                <span className="text-white/55">{copy.timeAgo(activity.minutesAgo)}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento grid */}
        <div
          className="relative z-10 h-full w-full p-3 sm:p-3.5 grid gap-2"
          style={{
            gridTemplateColumns: '1.35fr 1fr',
            gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.62fr)',
            gridTemplateAreas: `"feature side1" "feature side2" "wide wide"`,
          }}
        >
          <div style={{ gridArea: 'feature' }}>{renderCard(featuredItem, 'feature', 0)}</div>
          <div style={{ gridArea: 'side1' }}>
            {renderCard(sideItem1, 'side1', DIGITAL_PRODUCT_STAGGER_S)}
          </div>
          <div style={{ gridArea: 'side2' }}>
            {renderCard(sideItem2, 'side2', DIGITAL_PRODUCT_STAGGER_S * 2)}
          </div>
          <div style={{ gridArea: 'wide' }}>
            {renderCard(wideItem, 'wide', DIGITAL_PRODUCT_STAGGER_S * 3)}
          </div>
        </div>

        {/* Cycle progress hairline (signals "more incoming") */}
        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-x-3 bottom-1.5 z-20 h-px overflow-hidden bg-white/5">
            <motion.div
              key={`progress-${featuredIndex}-${hoveredKind ?? 'idle'}`}
              className="h-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${featuredItem.accent}, transparent)`,
                transformOrigin: 'right center',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredKind ? 0 : 1 }}
              transition={{
                duration: hoveredKind ? 0.2 : DIGITAL_PRODUCT_ROTATION_MS / 1000,
                ease: 'linear',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const COURSE_ROTATION_MS = 3200;

function CoursesFeaturePreview() {
  const { locale } = useLanguage();
  const copy = COURSES_PREVIEW_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    copy.items.forEach((course) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = course.imageUrl;
    });
  }, [copy.items]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % copy.items.length);
    }, COURSE_ROTATION_MS);
    return () => clearInterval(interval);
  }, [copy.items.length, isInView]);

  const activeCourse = copy.items[activeIndex];
  const accent = activeCourse.accent;

  const containerVariants: Variants = {
    initial: {},
    enter: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        staggerDirection: -1,
      },
    },
  };

  const childVariants: Variants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.42, ease: DIGITAL_PRODUCT_EASE } },
    exit: { opacity: 0, y: reduceMotion ? 0 : -10, transition: { duration: 0.22, ease: 'easeIn' } },
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-transparent px-4 py-5 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[360px] h-full max-h-[332px] min-h-[268px] rounded-[26px] border border-white/12 bg-[#07111D] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0)_34%),linear-gradient(180deg,_rgba(10,26,43,0.92),_#050913)]" />
        <div className="absolute inset-0 digital-product-grid opacity-45" />

        {/* Accent glow that smoothly tweens between courses */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(120% 70% at 0% 0%, ${accent}38 0%, transparent 65%), radial-gradient(80% 60% at 100% 100%, ${accent}24 0%, transparent 60%)`,
          }}
          transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
        />

        <div className="relative h-full p-3.5 sm:p-4 flex flex-col gap-2.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col gap-2.5 flex-1 min-h-0"
            >
              {/* Header row: live sale chip + rating */}
              <motion.div
                variants={childVariants}
                className="flex items-center justify-between gap-2 h-5"
              >
                <div className="inline-flex items-center gap-1.5 min-w-0 text-[10px] font-semibold text-white/85">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ background: accent }}
                      animate={
                        reduceMotion
                          ? undefined
                          : { boxShadow: [`0 0 0 0 ${accent}66`, `0 0 0 5px ${accent}00`] }
                      }
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </span>
                  <span className="text-white/55 truncate">{copy.eyebrow}</span>
                  <span className="text-white/30">·</span>
                  <span className="truncate">{activeCourse.buyer}</span>
                </div>
                {activeCourse.rating && (
                  <div className="inline-flex items-center gap-1 shrink-0 rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-semibold text-white/85">
                    <Star className="h-2.5 w-2.5 text-[#FFD15C]" fill="#FFD15C" strokeWidth={0} />
                    {activeCourse.rating}
                  </div>
                )}
              </motion.div>

              {/* Thumbnail */}
              <motion.div
                variants={childVariants}
                className="relative h-[104px] rounded-[18px] overflow-hidden border border-white/10 bg-[#06101D]"
                style={{
                  background: `radial-gradient(120% 80% at 30% 20%, ${accent}55 0%, transparent 65%), linear-gradient(135deg, #0E1F36 0%, #06101D 100%)`,
                }}
              >
                <img
                  src={activeCourse.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: activeCourse.imagePosition ?? 'center' }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.34)_100%)]" />
                <motion.div
                  className="absolute inset-0 mix-blend-color"
                  style={{ background: accent, opacity: 0.16 }}
                  animate={{ background: accent }}
                  transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
                />

                {/* category badge */}
                <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/45 backdrop-blur-sm px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/85">
                  {activeCourse.category}
                </div>

                {/* discount badge */}
                {activeCourse.discount && (
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0.6, rotate: -10, opacity: 0 }}
                    animate={
                      reduceMotion ? undefined : { scale: 1, rotate: -6, opacity: 1 }
                    }
                    transition={{ delay: 0.28, type: 'spring', stiffness: 360, damping: 18 }}
                    className="absolute right-3 top-3 inline-flex items-center rounded-md bg-[#FF4F4F] px-2 py-1 text-[10px] font-bold tracking-wide text-white shadow-[0_6px_14px_rgba(255,79,79,0.35)]"
                  >
                    {activeCourse.discount}
                  </motion.div>
                )}

                {/* Duration label for free preview */}
                {activeCourse.durationLabel && !activeCourse.price && (
                  <div className="absolute right-3 top-3 inline-flex items-center rounded-full bg-black/55 backdrop-blur-sm px-2 py-1 text-[10px] font-semibold text-white/90">
                    {activeCourse.durationLabel}
                  </div>
                )}

                {/* Center play circle */}
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: [0.7, 1.08, 1], opacity: 1 }}
                  transition={{ duration: 0.55, ease: DIGITAL_PRODUCT_EASE }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="relative h-12 w-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `${accent}28`,
                      boxShadow: `0 0 0 6px ${accent}12, 0 8px 24px rgba(0,0,0,0.35)`,
                    }}
                  >
                    <div
                      className="absolute inset-1.5 rounded-full"
                      style={{ background: accent, opacity: 0.95 }}
                    />
                    <Play
                      className="relative h-3.5 w-3.5 text-[#07111D] translate-x-[1px]"
                      fill="#07111D"
                      strokeWidth={0}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Title + description */}
              <motion.div variants={childVariants} className="min-w-0">
                <h4 className="text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-tight text-white line-clamp-1">
                  {activeCourse.title}
                </h4>
                <p className="mt-1 text-[11px] leading-[1.35] text-white/55 line-clamp-2">
                  {activeCourse.desc}
                </p>
              </motion.div>

              {/* Footer: price + CTA */}
              <motion.div
                variants={childVariants}
                className="mt-auto flex items-center justify-between gap-3"
              >
                <div className="flex items-baseline gap-2 min-w-0">
                  {activeCourse.price ? (
                    <>
                      <span className="text-[18px] font-bold text-white tabular-nums">
                        {activeCourse.price}
                      </span>
                      {activeCourse.oldPrice && (
                        <span className="text-[11px] text-white/40 line-through tabular-nums">
                          {activeCourse.oldPrice}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/65">
                      {activeCourse.durationLabel}
                    </span>
                  )}
                </div>
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: [0.92, 1.04, 1], opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45, ease: DIGITAL_PRODUCT_EASE }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold text-[#07111D] shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  style={{ background: accent }}
                >
                  <span className="whitespace-nowrap">{activeCourse.cta}</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function HeroBackgroundVideoLoop() {
  const isMobile = useIsMobile();
  const [frontSlot, setFrontSlot] = useState<0 | 1>(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [slotVideoIndices, setSlotVideoIndices] = useState<[number, number]>([
    0,
    HERO_BG_VIDEO_SOURCES.length > 1 ? 1 : 0,
  ]);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [canPreloadNextVideo, setCanPreloadNextVideo] = useState(false);
  const [isWaitingForNextVideo, setIsWaitingForNextVideo] = useState(false);
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crossfadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isWaitingForNextVideoRef = useRef(false);
  const pendingCanPlayCleanupRef = useRef<(() => void) | null>(null);

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

  const clearPendingCanPlay = () => {
    if (pendingCanPlayCleanupRef.current) {
      pendingCanPlayCleanupRef.current();
      pendingCanPlayCleanupRef.current = null;
    }
  };

  const setWaitingForNextVideo = (isWaiting: boolean) => {
    isWaitingForNextVideoRef.current = isWaiting;
    setIsWaitingForNextVideo(isWaiting);
  };

  const safePlay = (videoEl: HTMLVideoElement) => {
    const playPromise = videoEl.play();
    if (playPromise) {
      void playPromise.catch(() => undefined);
    }
  };

  const advanceToNextVideo = () => {
    if (isCrossfading || isWaitingForNextVideoRef.current || HERO_BG_VIDEO_SOURCES.length <= 1) {
      return;
    }

    clearAdvanceTimer();
    clearCrossfadeTimer();
    clearPendingCanPlay();

    const nextVideoIndex = (activeVideoIndex + 1) % HERO_BG_VIDEO_SOURCES.length;
    const nextFrontSlot = getBackSlot(frontSlot);
    const nextFrontVideoEl = getVideoBySlot(nextFrontSlot);

    if (!nextFrontVideoEl) {
      return;
    }

    const beginCrossfade = () => {
      const currentFrontVideoEl = getVideoBySlot(frontSlot);
      if (currentFrontVideoEl) {
        currentFrontVideoEl.loop = false;
      }
      setWaitingForNextVideo(false);
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
      clearPendingCanPlay();
      beginCrossfade();
    };

    nextFrontVideoEl.addEventListener('canplay', onCanPlay);
    pendingCanPlayCleanupRef.current = () => {
      nextFrontVideoEl.removeEventListener('canplay', onCanPlay);
    };
    setWaitingForNextVideo(true);
    const activeVideoEl = getVideoBySlot(frontSlot);
    if (activeVideoEl) {
      activeVideoEl.loop = true;
      if (activeVideoEl.ended || activeVideoEl.paused) {
        activeVideoEl.currentTime = 0;
        safePlay(activeVideoEl);
      }
    }
    nextFrontVideoEl.load();
  };

  useEffect(() => {
    const activeVideoEl = getVideoBySlot(frontSlot);
    if (!activeVideoEl) {
      return;
    }

    safePlay(activeVideoEl);
    if (activeVideoEl.readyState >= 2) {
      setCanPreloadNextVideo(true);
    }

    if (!canPreloadNextVideo || isCrossfading || isWaitingForNextVideo || HERO_BG_VIDEO_SOURCES.length <= 1) {
      return;
    }

    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      advanceToNextVideo();
    }, HERO_BG_VIDEO_MAX_DURATION_MS);

    return () => {
      clearAdvanceTimer();
    };
  }, [frontSlot, activeVideoIndex, isCrossfading, canPreloadNextVideo, isWaitingForNextVideo]);

  useEffect(() => {
    if (isCrossfading || !canPreloadNextVideo) {
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
  }, [slotVideoIndices, frontSlot, isCrossfading, canPreloadNextVideo]);

  useEffect(() => {
    const activeVideoEl = getVideoBySlot(frontSlot);
    if (!activeVideoEl) {
      return;
    }

    const onEnded = () => {
      if (isWaitingForNextVideoRef.current) {
        activeVideoEl.currentTime = 0;
        safePlay(activeVideoEl);
        return;
      }
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
      clearPendingCanPlay();
    };
  }, []);

  const slotAVideo = HERO_BG_VIDEO_SOURCES[slotVideoIndices[0]];
  const slotBVideo = HERO_BG_VIDEO_SOURCES[slotVideoIndices[1]];
  const slotAPreload = frontSlot === 0 || canPreloadNextVideo ? 'auto' : 'none';
  const slotBPreload = frontSlot === 1 || canPreloadNextVideo ? 'auto' : 'none';
  const slotALoop = frontSlot === 0 && isWaitingForNextVideo;
  const slotBLoop = frontSlot === 1 && isWaitingForNextVideo;

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoARef}
        src={slotAVideo.src}
        poster={slotAVideo.poster}
        className="absolute inset-0 w-full h-full object-cover transition-opacity ease-out"
        style={{
          opacity: frontSlot === 0 ? 1 : 0,
          transitionDuration: `${HERO_BG_VIDEO_CROSSFADE_MS}ms`,
          objectPosition: isMobile ? slotAVideo.mobileObjectPosition ?? '50% 50%' : '50% 50%',
        }}
        autoPlay={frontSlot === 0}
        loop={slotALoop}
        muted
        playsInline
        preload={slotAPreload}
        onCanPlay={() => setCanPreloadNextVideo(true)}
        aria-hidden="true"
      />

      <video
        ref={videoBRef}
        src={slotBVideo.src}
        poster={slotBVideo.poster}
        className="absolute inset-0 w-full h-full object-cover transition-opacity ease-out"
        style={{
          opacity: frontSlot === 1 ? 1 : 0,
          transitionDuration: `${HERO_BG_VIDEO_CROSSFADE_MS}ms`,
          objectPosition: isMobile ? slotBVideo.mobileObjectPosition ?? '50% 50%' : '50% 50%',
        }}
        autoPlay={frontSlot === 1}
        loop={slotBLoop}
        muted
        playsInline
        preload={slotBPreload}
        onCanPlay={() => setCanPreloadNextVideo(true)}
        aria-hidden="true"
      />
    </div>
  );
}

type MembershipFeatureKey = 'tiers' | 'newMember' | 'recurring' | 'exclusive';

type MembershipFeatureItem = {
  key: MembershipFeatureKey;
  eyebrow: string;
  meta: string;
  title: string;
  description: string;
  ctaLabel: string;
  badgeLabel: string;
  accent: string;
};

type MembershipPreviewCopy = {
  brand: string;
  memberCount: string;
  items: MembershipFeatureItem[];
};

const MEMBERSHIPS_PREVIEW_COPY: Record<'en' | 'es', MembershipPreviewCopy> = {
  es: {
    brand: 'Círculo de creadores',
    memberCount: '892 miembros',
    items: [
      {
        key: 'tiers',
        eyebrow: 'Niveles activos',
        meta: '3 planes',
        title: 'Diseña planes que escalan',
        description: 'Configura precios, beneficios y acceso por nivel.',
        ctaLabel: 'Suscribir',
        badgeLabel: 'Popular',
        accent: '#A855F7',
      },
      {
        key: 'newMember',
        eyebrow: 'Nuevo miembro',
        meta: 'Hace 4 segundos',
        title: 'Maya se acaba de unir',
        description: 'Alertas en vivo cuando alguien entra a tu comunidad.',
        ctaLabel: 'Saludar',
        badgeLabel: '+1',
        accent: '#22C55E',
      },
      {
        key: 'recurring',
        eyebrow: 'Cobros del mes',
        meta: '$3,408 MRR',
        title: 'Ingresos recurrentes',
        description: 'Cobra cada mes en automático sin perseguir pagos.',
        ctaLabel: 'Ver',
        badgeLabel: 'Auto',
        accent: '#2563EB',
      },
      {
        key: 'exclusive',
        eyebrow: 'Contenido exclusivo',
        meta: 'Solo miembros',
        title: 'Publica detrás del paywall',
        description: 'Comparte clases, videos y archivos solo para tu comunidad.',
        ctaLabel: 'Subir',
        badgeLabel: 'Premium',
        accent: '#F59E0B',
      },
    ],
  },
  en: {
    brand: 'Creator Circle',
    memberCount: '892 members',
    items: [
      {
        key: 'tiers',
        eyebrow: 'Active tiers',
        meta: '3 plans',
        title: 'Design plans that scale',
        description: 'Set pricing, perks and access for every tier.',
        ctaLabel: 'Subscribe',
        badgeLabel: 'Popular',
        accent: '#A855F7',
      },
      {
        key: 'newMember',
        eyebrow: 'New member',
        meta: '4 seconds ago',
        title: 'Maya just joined',
        description: 'Live alerts whenever someone joins your community.',
        ctaLabel: 'Greet',
        badgeLabel: '+1',
        accent: '#22C55E',
      },
      {
        key: 'recurring',
        eyebrow: 'Monthly payouts',
        meta: '$3,408 MRR',
        title: 'Recurring revenue',
        description: 'Get paid every month automatically — no chasing.',
        ctaLabel: 'View',
        badgeLabel: 'Auto',
        accent: '#2563EB',
      },
      {
        key: 'exclusive',
        eyebrow: 'Members-only drop',
        meta: 'Behind the paywall',
        title: 'Post behind the paywall',
        description: 'Share classes, videos and files only for your community.',
        ctaLabel: 'Upload',
        badgeLabel: 'Premium',
        accent: '#F59E0B',
      },
    ],
  },
};

const MEMBERSHIPS_ROTATION_MS = 3100;
const MEMBERSHIP_MEMBER_IMAGES = {
  sara: {
    src: '/images/local-photos/photo-1542596594-ae13eaf915cd-320-6cfb28d7.jpg',
    position: 'center 30%',
  },
  diego: {
    src: '/images/local-photos/photo-1500648767791-00dcc994a43e-320-ac0834fc.jpg',
    position: 'center 32%',
  },
  lucia: {
    src: '/images/local-photos/photo-1438761681033-6461ffad8d80-320-155bde23.jpg',
    position: 'center 30%',
  },
  maya: {
    src: '/images/local-photos/photo-1554151228-14d9def656e4-320-ad86f00e.jpg',
    position: 'center 30%',
  },
};
const MEMBERSHIP_MEMBER_STACK_IMAGES = [
  MEMBERSHIP_MEMBER_IMAGES.sara,
  MEMBERSHIP_MEMBER_IMAGES.diego,
  MEMBERSHIP_MEMBER_IMAGES.lucia,
  MEMBERSHIP_MEMBER_IMAGES.maya,
];
const MEMBERSHIP_CLASS_IMAGE =
  '/images/local-photos/photo-1501504905252-473c47e087f8-900-f5d5964b.jpg';

function MembershipsFeaturePreview() {
  const { locale } = useLanguage();
  const copy = MEMBERSHIPS_PREVIEW_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % copy.items.length);
    }, MEMBERSHIPS_ROTATION_MS);
    return () => clearInterval(interval);
  }, [copy.items.length, isInView]);

  const item = copy.items[activeIndex];
  const accent = item.accent;

  const containerVariants: Variants = {
    initial: {},
    enter: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        staggerDirection: -1,
      },
    },
  };

  const childVariants: Variants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.42, ease: DIGITAL_PRODUCT_EASE } },
    exit: { opacity: 0, y: reduceMotion ? 0 : -10, transition: { duration: 0.22, ease: 'easeIn' } },
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-transparent px-3 py-4 sm:px-4 sm:py-5 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[360px] h-full max-h-[332px] min-h-[280px] rounded-[26px] border border-white/[0.08] bg-[#07111D] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0)_34%),linear-gradient(180deg,_rgba(10,26,43,0.92),_#050913)]" />
        <div className="absolute inset-0 digital-product-grid opacity-45" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(120% 70% at 0% 0%, ${accent}30 0%, transparent 65%), radial-gradient(80% 60% at 100% 100%, ${accent}1c 0%, transparent 60%)`,
          }}
          transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
        />

        <div className="relative h-full p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5">
          <div className="flex items-center gap-2.5 h-9 shrink-0">
            <div className="relative h-9 w-9 shrink-0">
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{
                  background: `conic-gradient(from 180deg, ${accent} 0deg, ${accent}00 140deg, ${accent} 360deg)`,
                  rotate: reduceMotion ? 0 : 360,
                }}
                transition={{
                  background: { duration: 0.7, ease: DIGITAL_PRODUCT_EASE },
                  rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
                }}
                style={{ opacity: 0.7 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full flex items-center justify-center"
                animate={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}88 100%)` }}
                transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
              >
                <Lock className="h-4 w-4 text-white" strokeWidth={2.4} />
              </motion.div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold text-white/95 truncate">{copy.brand}</div>
              <div className="text-[10px] text-white/55 truncate">{copy.memberCount}</div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`badge-${activeIndex}`}
                initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                exit={reduceMotion ? undefined : { scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.22, ease: DIGITAL_PRODUCT_EASE }}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums shrink-0"
                style={{
                  background: `${accent}1f`,
                  color: accent,
                  boxShadow: `inset 0 0 0 1px ${accent}55`,
                }}
              >
                {item.badgeLabel}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col gap-2.5 flex-1 min-h-0"
            >
              <motion.div
                variants={childVariants}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-white/85 h-4"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: accent }}
                    animate={
                      reduceMotion
                        ? undefined
                        : { boxShadow: [`0 0 0 0 ${accent}66`, `0 0 0 5px ${accent}00`] }
                    }
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                </span>
                <span className="text-white/55 truncate">{item.eyebrow}</span>
                <span className="text-white/30">·</span>
                <span className="truncate">{item.meta}</span>
              </motion.div>

              <motion.div variants={childVariants} className="flex-1 min-h-0">
                <MembershipScene
                  featureKey={item.key}
                  accent={accent}
                  reduceMotion={reduceMotion}
                  locale={locale}
                />
              </motion.div>

              <motion.div
                variants={childVariants}
                className="flex items-end justify-between gap-2 sm:flex-col sm:items-stretch md:flex-row md:items-end md:gap-3"
              >
                <div className="min-w-0 flex-1 pr-1 sm:pr-0 md:pr-1">
                  <h4 className="text-[13px] sm:text-[15px] font-bold leading-[1.15] tracking-tight text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] leading-[1.35] text-white/55 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: [0.92, 1.04, 1], opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45, ease: DIGITAL_PRODUCT_EASE }}
                  className="inline-flex min-w-[82px] shrink-0 items-center justify-center gap-1 self-auto rounded-full px-2.5 py-1.5 text-[10.5px] font-bold text-[#07111D] shadow-[0_8px_18px_rgba(0,0,0,0.25)] sm:self-end sm:px-3 sm:text-[11px] md:self-auto"
                  style={{ background: accent }}
                >
                  <span className="whitespace-nowrap">{item.ctaLabel}</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

type MembershipSceneProps = {
  accent: string;
  reduceMotion: boolean;
  locale: 'en' | 'es';
};

function MembershipScene({
  featureKey,
  accent,
  reduceMotion,
  locale,
}: MembershipSceneProps & { featureKey: MembershipFeatureKey }) {
  switch (featureKey) {
    case 'tiers':
      return <TiersScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    case 'newMember':
      return <NewMemberScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    case 'recurring':
      return <RecurringScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    case 'exclusive':
      return <ExclusiveScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    default:
      return null;
  }
}

function TiersScene({ accent, reduceMotion, locale }: MembershipSceneProps) {
  const tiers =
    locale === 'es'
      ? [
          {
            name: 'Básico',
            price: '$5',
            cadence: '/mes',
            benefits: ['Contenido base', 'Comunidad'],
            perks: '2 beneficios',
          },
          {
            name: 'Pro',
            price: '$12',
            cadence: '/mes',
            benefits: ['Todo Básico', 'Clases semanales', 'Plantillas', 'Chat privado', 'Replays'],
            perks: '5 beneficios',
          },
          {
            name: 'VIP',
            price: '$29',
            cadence: '/mes',
            benefits: [
              'Todo Pro',
              'Mentoría mensual',
              'Feedback directo',
              'Recursos VIP',
              'Eventos privados',
              'Q&A en vivo',
              'Descuentos',
              'Prioridad',
              'Vota temas',
              'Archivo completo',
            ],
            perks: '10 beneficios',
          },
        ]
      : [
          {
            name: 'Basic',
            price: '$5',
            cadence: '/mo',
            benefits: ['Core content', 'Community'],
            perks: '2 perks',
          },
          {
            name: 'Pro',
            price: '$12',
            cadence: '/mo',
            benefits: ['Everything Basic', 'Weekly classes', 'Templates', 'Private chat', 'Replays'],
            perks: '5 perks',
          },
          {
            name: 'VIP',
            price: '$29',
            cadence: '/mo',
            benefits: [
              'Everything Pro',
              'Monthly mentoring',
              'Direct feedback',
              'VIP resources',
              'Private events',
              'Live Q&A',
              'Discounts',
              'Priority',
              'Vote topics',
              'Full archive',
            ],
            perks: '10 perks',
          },
        ];

  return (
    <div className="h-full min-h-0 overflow-hidden grid grid-cols-3 gap-1.5">
      {tiers.map((tier, i) => {
        const isActive = i === 1;
        const visibleBenefits = tier.benefits.slice(0, i === 2 ? 6 : tier.benefits.length);
        return (
          <motion.div
            key={tier.name}
            initial={reduceMotion ? false : { y: 10, opacity: 0, scale: 0.96 }}
            animate={
              reduceMotion
                ? undefined
                : { y: 0, opacity: 1, scale: isActive ? 1.04 : 1 }
            }
            transition={{
              delay: i * 0.08,
              duration: 0.42,
              ease: DIGITAL_PRODUCT_EASE,
            }}
            className="relative min-h-0 overflow-hidden rounded-[12px] border flex flex-col justify-between p-1.5 sm:p-2"
            style={{
              borderColor: isActive ? accent : 'rgba(255,255,255,0.10)',
              background: isActive
                ? `linear-gradient(180deg, ${accent}26 0%, ${accent}08 100%)`
                : 'rgba(255,255,255,0.04)',
              boxShadow: isActive ? `0 10px 24px ${accent}33` : 'none',
            }}
          >
            <div>
              <div
                className="text-[8.5px] uppercase tracking-[0.14em] font-bold leading-none"
                style={{ color: isActive ? accent : 'rgba(255,255,255,0.55)' }}
              >
                {tier.name}
              </div>
              <div className="mt-1.5 text-[13px] sm:text-[14px] font-extrabold text-white tabular-nums leading-none">
                {tier.price}
                <span className="ml-0.5 text-[7.5px] font-bold text-white/45">{tier.cadence}</span>
              </div>
            </div>
            <ul className="my-1.5 sm:my-2 min-h-0 overflow-hidden space-y-0.5 text-[6.75px] sm:text-[7px] font-medium leading-[1.1] text-white/52">
              {visibleBenefits.map((benefit) => (
                <li key={benefit} className="flex min-w-0 items-start gap-1">
                  <span
                    className="mt-[2.5px] h-1 w-1 shrink-0 rounded-full"
                    style={{ background: isActive ? accent : 'rgba(255,255,255,0.35)' }}
                  />
                  <span className="min-w-0 truncate">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1 text-[8px] sm:mt-1.5 sm:text-[8.5px] font-medium text-white/55 truncate">
              {tier.perks}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function NewMemberScene({ accent, reduceMotion, locale }: MembershipSceneProps) {
  const justJoined = locale === 'es' ? 'Maya se unió' : 'Maya just joined';

  return (
    <div className="h-full flex flex-col gap-2 items-center justify-center px-1">
      <div className="flex items-center -space-x-2">
        {MEMBERSHIP_MEMBER_STACK_IMAGES.map((image, i) => {
          const isNew = i === MEMBERSHIP_MEMBER_STACK_IMAGES.length - 1;
          return (
            <motion.div
              key={i}
              initial={
                reduceMotion ? false : { scale: isNew ? 0 : 0.8, opacity: 0 }
              }
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={
                isNew
                  ? { delay: 0.45, type: 'spring', stiffness: 380, damping: 16 }
                  : { delay: i * 0.06, duration: 0.35, ease: DIGITAL_PRODUCT_EASE }
              }
              className="h-8 w-8 rounded-full border-2"
              style={{
                borderColor: isNew ? accent : '#0B1926',
                boxShadow: isNew
                  ? `0 0 0 3px ${accent}33, 0 6px 18px ${accent}55`
                  : 'none',
              }}
            >
              <img
                src={image.src}
                alt=""
                className="h-full w-full rounded-full object-cover"
                style={{ objectPosition: image.position }}
              />
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={reduceMotion ? false : { y: 10, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
        className="rounded-full px-2.5 py-1 inline-flex items-center gap-1.5 text-[10px] font-semibold"
        style={{
          background: `${accent}1f`,
          color: 'rgba(255,255,255,0.95)',
          boxShadow: `inset 0 0 0 1px ${accent}55`,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        <span>{justJoined}</span>
      </motion.div>
    </div>
  );
}

function RecurringScene({ accent, reduceMotion, locale }: MembershipSceneProps) {
  const rows =
    locale === 'es'
      ? [
          { name: 'Sara M.', plan: 'Pro · Mensual', amount: '+$12' },
          { name: 'Diego R.', plan: 'VIP · Mensual', amount: '+$29' },
          { name: 'Lucía P.', plan: 'Pro · Mensual', amount: '+$12' },
        ]
      : [
          { name: 'Sara M.', plan: 'Pro · Monthly', amount: '+$12' },
          { name: 'Diego R.', plan: 'VIP · Monthly', amount: '+$29' },
          { name: 'Lucía P.', plan: 'Pro · Monthly', amount: '+$12' },
        ];
  const rowImages = [
    MEMBERSHIP_MEMBER_IMAGES.sara,
    MEMBERSHIP_MEMBER_IMAGES.diego,
    MEMBERSHIP_MEMBER_IMAGES.lucia,
  ];

  return (
    <div className="h-full flex flex-col gap-1.5 justify-center">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={reduceMotion ? false : { x: -12, opacity: 0 }}
          animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
          transition={{
            delay: i * 0.1 + 0.05,
            duration: 0.4,
            ease: DIGITAL_PRODUCT_EASE,
          }}
          className="flex items-center gap-2 rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-2 py-1.5"
        >
          <img
            src={rowImages[i].src}
            alt=""
            className="h-5 w-5 rounded-full object-cover shrink-0 ring-1 ring-white/10"
            style={{ objectPosition: rowImages[i].position }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold text-white/95 truncate leading-tight">
              {row.name}
            </div>
            <div className="text-[8.5px] text-white/50 truncate leading-tight">
              {row.plan}
            </div>
          </div>
          <motion.div
            initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{
              delay: i * 0.1 + 0.22,
              type: 'spring',
              stiffness: 360,
              damping: 18,
            }}
            className="text-[10px] font-bold tabular-nums shrink-0"
            style={{ color: accent }}
          >
            {row.amount}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function ExclusiveScene({ accent, reduceMotion, locale }: MembershipSceneProps) {
  const lessonTitle =
    locale === 'es' ? 'Clase magistral · Hooks virales' : 'Masterclass · Viral Hooks';
  const meta = locale === 'es' ? '24 min · solo miembros' : '24 min · members only';

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: DIGITAL_PRODUCT_EASE }}
        className="relative w-full h-full max-h-[124px] rounded-[14px] overflow-hidden border border-white/10"
        style={{
          background: `radial-gradient(120% 80% at 30% 25%, ${accent}55 0%, transparent 70%), linear-gradient(135deg, #0E1F36 0%, #06101D 100%)`,
        }}
      >
        <img
          src={MEMBERSHIP_CLASS_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          style={{ objectPosition: 'center 44%' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(7,17,29,0.22)_0%,_rgba(7,17,29,0.40)_48%,_rgba(7,17,29,0.86)_100%),linear-gradient(90deg,_rgba(7,17,29,0.38)_0%,_rgba(7,17,29,0.06)_55%,_rgba(7,17,29,0.32)_100%)]" />
        <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-black/45 backdrop-blur-sm px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/85">
          <Lock className="h-2.5 w-2.5" style={{ color: accent }} strokeWidth={3} />
          <span>{locale === 'es' ? 'Premium' : 'Members'}</span>
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: [0.7, 1.08, 1], opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: DIGITAL_PRODUCT_EASE }}
        >
          <div
            className="relative h-10 w-10 rounded-full flex items-center justify-center"
            style={{
              background: `${accent}28`,
              boxShadow: `0 0 0 6px ${accent}12, 0 8px 24px rgba(0,0,0,0.35)`,
            }}
          >
            <div
              className="absolute inset-1.5 rounded-full"
              style={{ background: accent, opacity: 0.95 }}
            />
            <Play
              className="relative h-3 w-3 text-[#07111D] translate-x-[1px]"
              fill="#07111D"
              strokeWidth={0}
            />
          </div>
        </motion.div>
        <div className="absolute left-2.5 right-2.5 bottom-2 text-left">
          <div className="text-[10px] font-bold leading-tight text-white line-clamp-1">
            {lessonTitle}
          </div>
          <div className="text-[8.5px] text-white/55 line-clamp-1">{meta}</div>
        </div>
      </motion.div>
    </div>
  );
}

type CoachingFeatureKey = 'agenda' | 'payment' | 'video' | 'reminders' | 'reviews';

type CoachingFeatureItem = {
  key: CoachingFeatureKey;
  eyebrow: string;
  meta: string;
  title: string;
  description: string;
  ctaLabel: string;
  badgeLabel: string;
  accent: string;
};

type CoachingPreviewCopy = {
  coachInitials: string;
  coachName: string;
  coachRole: string;
  items: CoachingFeatureItem[];
};

const COACHING_PREVIEW_COPY: Record<'en' | 'es', CoachingPreviewCopy> = {
  es: {
    coachInitials: 'SM',
    coachName: 'Sofía Méndez',
    coachRole: 'Coach de creadores',
    items: [
      {
        key: 'agenda',
        eyebrow: 'Agenda abierta',
        meta: '12 horarios disponibles',
        title: 'Reserva 1:1 en un toque',
        description: 'Sincroniza Google Calendar, Zoom o Teams al instante.',
        ctaLabel: 'Reservar',
        badgeLabel: 'Hoy',
        accent: '#4F8FFF',
      },
      {
        key: 'payment',
        eyebrow: 'Pago confirmado',
        meta: 'Hace 8 segundos',
        title: 'Cobra al instante',
        description: 'El pago se captura automáticamente al reservar.',
        ctaLabel: 'Recibido',
        badgeLabel: '+$120',
        accent: '#22C55E',
      },
      {
        key: 'video',
        eyebrow: 'Google Meet',
        meta: 'En vivo · 24:18',
        title: 'Videollamadas con Google Meet',
        description: 'Link de Google Meet automático en cada reserva.',
        ctaLabel: 'Unirse',
        badgeLabel: 'En vivo',
        accent: '#6366F1',
      },
      {
        key: 'reminders',
        eyebrow: 'Recordatorios automáticos',
        meta: '3 enviados',
        title: 'Cero asistencias perdidas',
        description: 'Notificaciones por email y push antes de cada sesión.',
        ctaLabel: 'Activos',
        badgeLabel: '24h',
        accent: '#F59E0B',
      },
      {
        key: 'reviews',
        eyebrow: 'Nueva reseña',
        meta: 'María G.',
        title: 'Construye tu reputación',
        description: 'Reseñas verificadas que generan confianza al instante.',
        ctaLabel: '5,0',
        badgeLabel: 'Verificada',
        accent: '#FBBF24',
      },
    ],
  },
  en: {
    coachInitials: 'SM',
    coachName: 'Sofía Méndez',
    coachRole: 'Creator coach',
    items: [
      {
        key: 'agenda',
        eyebrow: 'Open availability',
        meta: '12 slots available',
        title: 'Book a 1:1 in one tap',
        description: 'Sync Google Calendar, Zoom or Teams in one tap.',
        ctaLabel: 'Book',
        badgeLabel: 'Today',
        accent: '#4F8FFF',
      },
      {
        key: 'payment',
        eyebrow: 'Payment captured',
        meta: '8 seconds ago',
        title: 'Get paid instantly',
        description: 'Payment is collected the moment a session is booked.',
        ctaLabel: 'Received',
        badgeLabel: '+$120',
        accent: '#22C55E',
      },
      {
        key: 'video',
        eyebrow: 'Google Meet',
        meta: 'Live · 24:18',
        title: 'Video calls with Google Meet',
        description: 'Auto-generated Google Meet link with every booking.',
        ctaLabel: 'Join',
        badgeLabel: 'Live',
        accent: '#6366F1',
      },
      {
        key: 'reminders',
        eyebrow: 'Auto reminders',
        meta: '3 sent',
        title: 'Zero missed sessions',
        description: 'Email and push reminders before every session.',
        ctaLabel: 'On',
        badgeLabel: '24h',
        accent: '#F59E0B',
      },
      {
        key: 'reviews',
        eyebrow: 'New review',
        meta: 'María G.',
        title: 'Build your reputation',
        description: 'Verified reviews that build trust instantly.',
        ctaLabel: '5.0',
        badgeLabel: 'Verified',
        accent: '#FBBF24',
      },
    ],
  },
};

const COACHING_ROTATION_MS = 2900;
const COACH_AVATAR_SRC = '/images/coach-avatar.jpg';
const COACHING_CALLER_AVATAR_SRC = '/images/creator-profiles/kun-alvarez.jpg';
const COACHING_REVIEWER_AVATAR_SRC = '/images/creator-profiles/anya-jensen.jpg';

function CoachingCallsFeaturePreview() {
  const { locale } = useLanguage();
  const copy = COACHING_PREVIEW_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % copy.items.length);
    }, COACHING_ROTATION_MS);
    return () => clearInterval(interval);
  }, [copy.items.length, isInView]);

  const item = copy.items[activeIndex];
  const accent = item.accent;

  const containerVariants: Variants = {
    initial: {},
    enter: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        staggerDirection: -1,
      },
    },
  };

  const childVariants: Variants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.42, ease: DIGITAL_PRODUCT_EASE } },
    exit: { opacity: 0, y: reduceMotion ? 0 : -10, transition: { duration: 0.22, ease: 'easeIn' } },
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-transparent px-4 py-5 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[360px] h-full max-h-[332px] min-h-[280px] rounded-[26px] border border-white/[0.08] bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0)_45%)]" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(120% 70% at 0% 0%, ${accent}26 0%, transparent 65%), radial-gradient(80% 60% at 100% 100%, ${accent}14 0%, transparent 60%)`,
          }}
          transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
        />

        <div className="relative h-full p-3.5 sm:p-4 flex flex-col gap-2.5">
          {/* Persistent coach identity row */}
          <div className="flex items-center gap-2.5 h-9 shrink-0">
            <div className="relative h-9 w-9 shrink-0">
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{
                  background: `conic-gradient(from 180deg, ${accent} 0deg, ${accent}00 140deg, ${accent} 360deg)`,
                  rotate: reduceMotion ? 0 : 360,
                }}
                transition={{
                  background: { duration: 0.7, ease: DIGITAL_PRODUCT_EASE },
                  rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                }}
                style={{ opacity: 0.75 }}
              />
              <img
                src={COACH_AVATAR_SRC}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-black flex items-center justify-center">
                <motion.span
                  className="h-2 w-2 rounded-full"
                  animate={{ background: accent }}
                  transition={{ duration: 0.6, ease: DIGITAL_PRODUCT_EASE }}
                />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold text-white/95 truncate">{copy.coachName}</div>
              <div className="text-[10px] text-white/55 truncate">{copy.coachRole}</div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`badge-${activeIndex}`}
                initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                exit={reduceMotion ? undefined : { scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.22, ease: DIGITAL_PRODUCT_EASE }}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums shrink-0"
                style={{
                  background: `${accent}1f`,
                  color: accent,
                  boxShadow: `inset 0 0 0 1px ${accent}55`,
                }}
              >
                {item.badgeLabel}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col gap-2.5 flex-1 min-h-0"
            >
              {/* Eyebrow */}
              <motion.div
                variants={childVariants}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-white/85 h-4"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: accent }}
                    animate={
                      reduceMotion
                        ? undefined
                        : { boxShadow: [`0 0 0 0 ${accent}66`, `0 0 0 5px ${accent}00`] }
                    }
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                </span>
                <span className="text-white/55 truncate">{item.eyebrow}</span>
                <span className="text-white/30">·</span>
                <span className="truncate">{item.meta}</span>
              </motion.div>

              {/* Center scene */}
              <motion.div variants={childVariants} className="flex-1 min-h-0">
                <CoachingScene featureKey={item.key} accent={accent} reduceMotion={reduceMotion} />
              </motion.div>

              {/* Footer */}
              <motion.div
                variants={childVariants}
                className="flex items-end justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-[14px] sm:text-[15px] font-bold leading-[1.15] tracking-tight text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] leading-[1.35] text-white/55 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: [0.92, 1.04, 1], opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45, ease: DIGITAL_PRODUCT_EASE }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold text-[#07111D] shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  style={{ background: accent }}
                >
                  <span className="whitespace-nowrap">{item.ctaLabel}</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

type CoachingSceneProps = {
  accent: string;
  reduceMotion: boolean;
};

function CoachingScene({
  featureKey,
  accent,
  reduceMotion,
}: CoachingSceneProps & { featureKey: CoachingFeatureKey }) {
  switch (featureKey) {
    case 'agenda':
      return <AgendaScene accent={accent} reduceMotion={reduceMotion} />;
    case 'payment':
      return <PaymentScene accent={accent} reduceMotion={reduceMotion} />;
    case 'video':
      return <VideoCallScene accent={accent} reduceMotion={reduceMotion} />;
    case 'reminders':
      return <RemindersScene accent={accent} reduceMotion={reduceMotion} />;
    case 'reviews':
      return <ReviewsScene accent={accent} reduceMotion={reduceMotion} />;
    default:
      return null;
  }
}

function GoogleCalendarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <clipPath id="gcal-clip">
          <rect x="6" y="6" width="88" height="88" rx="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#gcal-clip)">
        <rect width="100" height="100" fill="#fff" />
        <rect x="0" y="0" width="62" height="62" fill="#4285F4" />
        <rect x="62" y="0" width="38" height="62" fill="#FBBC04" />
        <rect x="0" y="62" width="62" height="38" fill="#34A853" />
        <rect x="62" y="62" width="38" height="38" fill="#EA4335" />
        <rect x="22" y="22" width="40" height="40" fill="#fff" />
        <text
          x="42"
          y="52"
          fontFamily="Inter,Roboto,Arial,sans-serif"
          fontWeight="800"
          fontSize="26"
          fill="#1A73E8"
          textAnchor="middle"
        >
          31
        </text>
      </g>
    </svg>
  );
}

function ZoomBrandIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <rect width="100" height="100" rx="22" fill="#2D8CFF" />
      <path
        d="M22 38h36c2.2 0 4 1.8 4 4v18c0 2.2-1.8 4-4 4H22c-2.2 0-4-1.8-4-4V42c0-2.2 1.8-4 4-4Zm44 7 14-8c1-.6 2 .2 2 1.4v25.2c0 1.2-1 2-2 1.4l-14-8z"
        fill="#fff"
      />
    </svg>
  );
}

function TeamsBrandIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <rect width="100" height="100" rx="22" fill="#5059C9" />
      <text
        x="50"
        y="68"
        fontFamily="Inter,Roboto,Arial,sans-serif"
        fontWeight="800"
        fontSize="48"
        fill="#fff"
        textAnchor="middle"
      >
        T
      </text>
    </svg>
  );
}

function GoogleMeetBrandIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <rect width="100" height="100" rx="20" fill="#fff" />
      <path d="M58 50 80 36v28L58 50z" fill="#FBBC04" />
      <path d="M16 32h42v36H22a6 6 0 0 1-6-6V32z" fill="#00AC47" />
      <path d="M22 32h36v8H16v-2a6 6 0 0 1 6-6z" fill="#EA4335" />
      <rect x="80" y="36" width="6" height="28" rx="2" fill="#4285F4" />
    </svg>
  );
}

function AgendaScene({ accent, reduceMotion }: CoachingSceneProps) {
  const slots = [
    { time: '09:30', duration: '30 min', booked: false },
    { time: '11:00', duration: '45 min', booked: true },
    { time: '15:30', duration: '30 min', booked: false },
  ];
  const bookedAccent = '#22C55E';

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Integration chip */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -6 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: DIGITAL_PRODUCT_EASE }}
        className="flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-2 py-1 self-start"
      >
        <GoogleCalendarIcon size={13} />
        <span className="text-[10px] font-semibold text-white/90">Google Calendar</span>
        <span className="text-white/20 text-[10px]">·</span>
        <span className="text-[10px] font-semibold text-[#22C55E]">Conectado</span>
        <div className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-white/[0.08]">
          <ZoomBrandIcon size={11} />
          <TeamsBrandIcon size={11} />
        </div>
      </motion.div>

      {/* Time slots */}
      <div className="flex flex-col gap-1.5 flex-1 min-h-0 justify-center">
        {slots.map((s, i) => {
          const slotAccent = s.booked ? bookedAccent : accent;
          return (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { x: -14, opacity: 0 }}
              animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
              transition={{ delay: 0.18 + 0.06 * i, duration: 0.36, ease: DIGITAL_PRODUCT_EASE }}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
              style={{
                background: s.booked ? `${slotAccent}1f` : 'rgba(255,255,255,0.04)',
                border: s.booked
                  ? `1px solid ${slotAccent}80`
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {s.booked ? (
                <motion.div
                  initial={reduceMotion ? false : { scale: 0, rotate: -45 }}
                  animate={reduceMotion ? undefined : { scale: 1, rotate: 0 }}
                  transition={{ delay: 0.32, type: 'spring', stiffness: 360, damping: 18 }}
                  className="h-4 w-4 shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: slotAccent }}
                >
                  <Check className="h-2.5 w-2.5 text-black" strokeWidth={3.5} />
                </motion.div>
              ) : (
                <Calendar
                  className="h-3 w-3 shrink-0"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                />
              )}
              <span className="text-[11px] font-bold tabular-nums text-white/90">{s.time}</span>
              <span className="text-[10px] text-white/45">{s.duration}</span>
              {s.booked && (
                <motion.span
                  initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ delay: 0.42, type: 'spring', stiffness: 360, damping: 18 }}
                  className="ml-auto inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide"
                  style={{ background: slotAccent, color: '#06140A' }}
                >
                  Reservado
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PaymentScene({ accent, reduceMotion }: CoachingSceneProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2.5">
      <div className="relative flex items-center justify-center">
        <motion.span
          className="absolute h-14 w-14 rounded-full"
          style={{ background: `${accent}33` }}
          animate={reduceMotion ? undefined : { scale: [1, 1.6, 2], opacity: [0.55, 0.18, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 320, damping: 18 }}
          className="relative h-12 w-12 rounded-full flex items-center justify-center"
          style={{
            background: accent,
            boxShadow: `0 10px 28px ${accent}55, inset 0 0 0 4px ${accent}33`,
          }}
        >
          <Check className="h-6 w-6 text-[#07111D]" strokeWidth={3} />
        </motion.div>
      </div>
      <motion.div
        initial={reduceMotion ? false : { y: 8, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
        className="text-center"
      >
        <div className="text-[24px] font-bold text-white tabular-nums leading-none">$120 USD</div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/50">
          VISA · ••4242 · Stripe
        </div>
      </motion.div>
    </div>
  );
}

function VideoCallScene({ accent, reduceMotion }: CoachingSceneProps) {
  const tiles = [
    { initials: 'SM', live: true },
    { initials: 'JC', live: false },
  ];
  const controls = [
    { Icon: Mic, danger: false },
    { Icon: Video, danger: false },
    { Icon: PhoneOff, danger: true },
  ];

  return (
    <div className="h-full flex flex-col gap-1.5">
      {/* Google Meet pill */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -6 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: DIGITAL_PRODUCT_EASE }}
        className="flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-2 py-1 self-start"
      >
        <GoogleMeetBrandIcon size={13} />
        <span className="text-[10px] font-semibold text-white/90">Google Meet</span>
        <span className="text-white/20 text-[10px]">·</span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#22C55E]">
          <motion.span
            className="h-1 w-1 rounded-full bg-[#22C55E]"
            animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          Conectada
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 + 0.08 * i, duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
            className="relative rounded-xl border border-white/10 overflow-hidden flex items-end justify-start p-2"
            style={{
              background: `radial-gradient(130% 90% at ${i === 0 ? '30%' : '70%'} 25%, ${accent}38 0%, transparent 65%), linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
            }}
          >
            {t.initials === 'SM' ? (
              <img
                src={COACH_AVATAR_SRC}
                alt=""
                aria-hidden="true"
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <img
                src={COACHING_CALLER_AVATAR_SRC}
                alt=""
                aria-hidden="true"
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20"
                style={{ objectPosition: 'center 42%' }}
                loading="lazy"
                decoding="async"
              />
            )}
            {t.live && (
              <div className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-black/65 backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
                <motion.span
                  className="h-1 w-1 rounded-full"
                  style={{ background: '#EF4444' }}
                  animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                Live
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        {controls.map((c, i) => {
          const Icon = c.Icon;
          return (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { y: 8, opacity: 0 }}
              animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              transition={{ delay: 0.22 + 0.05 * i, duration: 0.32, ease: DIGITAL_PRODUCT_EASE }}
              className="h-7 w-7 rounded-full flex items-center justify-center"
              style={
                c.danger
                  ? { background: '#EF4444', boxShadow: '0 4px 14px rgba(239,68,68,0.5)' }
                  : {
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }
              }
            >
              <Icon className="h-3 w-3 text-white" strokeWidth={2.4} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function RemindersScene({ accent, reduceMotion }: CoachingSceneProps) {
  const reminders = [
    { time: '24 h antes', msg: 'Recordatorio enviado', state: 'sent' as const },
    { time: '1 h antes', msg: 'Tu sesión inicia pronto', state: 'sent' as const },
    { time: '15 min', msg: 'Conéctate ahora', state: 'live' as const },
  ];

  return (
    <div className="h-full flex flex-col gap-1.5 justify-center">
      {reminders.map((r, i) => {
        const isLive = r.state === 'live';
        return (
          <motion.div
            key={i}
            initial={reduceMotion ? false : { x: -16, opacity: 0 }}
            animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
            transition={{ delay: 0.05 + 0.07 * i, duration: 0.42, ease: DIGITAL_PRODUCT_EASE }}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            style={{
              background: isLive ? `${accent}1c` : 'rgba(255,255,255,0.04)',
              border: isLive
                ? `1px solid ${accent}66`
                : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="relative h-6 w-6 rounded-full flex items-center justify-center shrink-0"
              style={{ background: isLive ? accent : 'rgba(255,255,255,0.08)' }}
            >
              <Bell
                className="h-3 w-3"
                style={{ color: isLive ? '#07111D' : 'rgba(255,255,255,0.7)' }}
                strokeWidth={2.4}
              />
              {isLive && !reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${accent}` }}
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-wide text-white/45">
                {r.time}
              </div>
              <div className="text-[11px] font-semibold text-white/90 truncate">{r.msg}</div>
            </div>
            {r.state === 'sent' && (
              <Check className="h-3 w-3 shrink-0" style={{ color: accent }} strokeWidth={3} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function ReviewsScene({ accent, reduceMotion }: CoachingSceneProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-center px-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={reduceMotion ? false : { scale: 0, rotate: -45, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              delay: 0.05 + 0.08 * i,
              type: 'spring',
              stiffness: 360,
              damping: 18,
            }}
          >
            <Star
              className="h-4 w-4"
              style={{ color: accent }}
              fill={accent}
              strokeWidth={0}
            />
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={reduceMotion ? false : { y: 8, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
        className="text-[12px] leading-[1.35] text-white/85 italic"
      >
        «Una sesión increíble, súper recomendada.»
      </motion.p>
      <motion.div
        initial={reduceMotion ? false : { y: 8, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
        className="flex items-center gap-2"
      >
        <img
          src={COACHING_REVIEWER_AVATAR_SRC}
          alt=""
          aria-hidden="true"
          className="h-5 w-5 rounded-full object-cover ring-1 ring-white/15"
          style={{ objectPosition: 'center 28%' }}
          loading="lazy"
          decoding="async"
        />
        <span className="text-[11px] font-semibold text-white/85">María G.</span>
        <span className="text-[10px] text-white/45">· hace 2 días</span>
      </motion.div>
    </div>
  );
}

function VerifiedBadgePreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[168px] h-[168px] sm:w-[190px] sm:h-[190px] md:w-[220px] md:h-[220px] text-[#38BDF8]"
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

type DesignSiteTheme = {
  id: string;
  label: { en: string; es: string };
  swatch: string;
  bg: string;
  text: string;
  subtext: string;
  cardBg: string;
  cardBorder: string;
  glow: string;
  avatarRing: string;
};

const DESIGN_SITE_THEMES: DesignSiteTheme[] = [
  {
    id: 'onyx',
    label: { en: 'Onyx Black', es: 'Negro Onyx' },
    swatch: '#0A0F1A',
    bg: '#0A0F1A',
    text: '#FFFFFF',
    subtext: 'rgba(255,255,255,0.62)',
    cardBg: 'rgba(255,255,255,0.06)',
    cardBorder: 'rgba(255,255,255,0.08)',
    glow: 'radial-gradient(80% 60% at 50% 0%, rgba(90,75,255,0.18) 0%, transparent 60%)',
    avatarRing: 'rgba(255,255,255,0.18)',
  },
  {
    id: 'ivory',
    label: { en: 'Ivory Light', es: 'Marfil Claro' },
    swatch: '#F4F6FB',
    bg: '#F4F6FB',
    text: '#0A0F1A',
    subtext: 'rgba(10,15,26,0.55)',
    cardBg: 'rgba(255,255,255,0.92)',
    cardBorder: 'rgba(10,15,26,0.06)',
    glow: 'radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.32) 0%, transparent 60%)',
    avatarRing: 'rgba(10,15,26,0.10)',
  },
  {
    id: 'bora',
    label: { en: 'Bora Purple', es: 'Bora Púrpura' },
    swatch: '#D8CCFB',
    bg: '#D8CCFB',
    text: '#1B0F3D',
    subtext: 'rgba(27,15,61,0.62)',
    cardBg: 'rgba(255,255,255,0.55)',
    cardBorder: 'rgba(27,15,61,0.08)',
    glow: 'radial-gradient(80% 60% at 50% 0%, rgba(167,139,250,0.32) 0%, transparent 60%)',
    avatarRing: 'rgba(255,255,255,0.7)',
  },
  {
    id: 'blush',
    label: { en: 'Blush Pink', es: 'Rosa Blush' },
    swatch: '#FAC8D6',
    bg: '#FAC8D6',
    text: '#3D0F22',
    subtext: 'rgba(61,15,34,0.62)',
    cardBg: 'rgba(255,255,255,0.6)',
    cardBorder: 'rgba(61,15,34,0.08)',
    glow: 'radial-gradient(80% 60% at 50% 0%, rgba(255,170,196,0.34) 0%, transparent 60%)',
    avatarRing: 'rgba(255,255,255,0.7)',
  },
  {
    id: 'vibrant',
    label: { en: 'Hooks Vibrant', es: 'Hooks Vibrante' },
    swatch: 'linear-gradient(135deg, #FF6A4A 0%, #E94A6A 55%, #5A4BFF 100%)',
    bg: 'linear-gradient(135deg, #FF6A4A 0%, #E94A6A 55%, #5A4BFF 100%)',
    text: '#FFFFFF',
    subtext: 'rgba(255,255,255,0.78)',
    cardBg: 'rgba(255,255,255,0.18)',
    cardBorder: 'rgba(255,255,255,0.24)',
    glow: 'radial-gradient(80% 60% at 50% 0%, rgba(255,106,74,0.42) 0%, transparent 60%)',
    avatarRing: 'rgba(255,255,255,0.55)',
  },
];

const DESIGN_SITE_PREVIEW_COPY = {
  en: {
    eyebrow: 'Theme',
    name: 'Julia Ross',
    handle: '@whereisdonde',
    links: [
      { title: 'Book a 1:1 session', icon: 'calendar' as const },
      { title: 'Master the hooks that grow', icon: 'play' as const },
      { title: 'Your first $1,000 online', icon: 'compass' as const },
      { title: 'The art of telling stories that sell', icon: 'bookmark' as const },
    ],
  },
  es: {
    eyebrow: 'Tema',
    name: 'Julia Ross',
    handle: '@whereisdonde',
    links: [
      { title: 'Agendar una sesión 1:1', icon: 'calendar' as const },
      { title: 'Domina los hooks que hacen crecer', icon: 'play' as const },
      { title: 'Tus primeros $1,000 online', icon: 'compass' as const },
      { title: 'El arte de contar historias que venden', icon: 'bookmark' as const },
    ],
  },
};

const DESIGN_SITE_ROTATION_MS = 2600;
const DESIGN_SITE_AVATAR_SRC =
  '/images/local-photos/photo-1494790108377-be9c29b29330-160-7f6134f2.jpg';

function DesignSiteLinkIcon({
  name,
  color,
}: {
  name: 'calendar' | 'play' | 'compass' | 'bookmark';
  color: string;
}) {
  const props = { className: 'h-3 w-3', strokeWidth: 2.4, color } as const;
  switch (name) {
    case 'calendar':
      return <Calendar {...props} />;
    case 'play':
      return <Play {...props} fill={color} />;
    case 'compass':
      return <Compass {...props} />;
    case 'bookmark':
      return <Bookmark {...props} fill={color} />;
  }
}

function DesignSiteFeaturePreview() {
  const { locale } = useLanguage();
  const copy = DESIGN_SITE_PREVIEW_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % DESIGN_SITE_THEMES.length);
    }, DESIGN_SITE_ROTATION_MS);
    return () => clearInterval(interval);
  }, [isInView]);

  const activeTheme = DESIGN_SITE_THEMES[activeIndex];
  const activeLabel = activeTheme.label[locale];

  const screenTransition = {
    duration: reduceMotion ? 0 : 0.7,
    ease: DIGITAL_PRODUCT_EASE,
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-transparent px-4 py-5 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[360px] mt-2 max-h-[460px] min-h-[368px] rounded-[26px] border border-white/12 bg-[#07111D] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0)_34%),linear-gradient(180deg,_rgba(10,26,43,0.92),_#050913)]" />
        <div className="absolute inset-0 digital-product-grid opacity-45" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: activeTheme.glow }}
          transition={screenTransition}
        />

        <div className="relative h-full flex flex-col gap-2.5 px-3.5 py-3 sm:px-4 sm:py-3.5">
          {/* Theme picker strip */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/55">
              {copy.eyebrow}
            </span>
            <div className="flex items-center gap-1.5">
              {DESIGN_SITE_THEMES.map((theme, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={theme.id}
                    className="relative h-4 w-4 rounded-[5px] overflow-hidden"
                    style={{ background: theme.swatch }}
                    animate={{
                      scale: isActive && !reduceMotion ? 1.08 : 1,
                      boxShadow: isActive
                        ? '0 0 0 1.5px rgba(255,255,255,0.95), 0 4px 10px rgba(0,0,0,0.35)'
                        : '0 0 0 1px rgba(255,255,255,0.12)',
                    }}
                    transition={{ duration: 0.35, ease: DIGITAL_PRODUCT_EASE }}
                  />
                );
              })}
            </div>
            <div className="ml-auto min-w-0 flex-1 text-right overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeTheme.id}
                  className="block truncate text-[9px] font-bold tracking-[0.06em] text-white/85"
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.32, ease: DIGITAL_PRODUCT_EASE }}
                >
                  {activeLabel}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center">
            <div
              className="relative w-[208px] h-full max-h-[326px] min-h-[268px] rounded-[30px] border border-white/12 overflow-hidden shadow-[0_22px_56px_rgba(0,0,0,0.5)]"
              style={{ background: '#000' }}
            >
              {/* Animated screen background */}
              <motion.div
                className="absolute inset-0"
                animate={{ background: activeTheme.bg }}
                transition={screenTransition}
              />

              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-1.5 w-14 rounded-full bg-black/45" />

              {/* Soft top vignette to lift the avatar */}
              <motion.div
                className="absolute inset-x-0 top-0 h-14 pointer-events-none"
                animate={{
                  background:
                    activeTheme.id === 'ivory' || activeTheme.id === 'bora' || activeTheme.id === 'blush'
                      ? 'linear-gradient(180deg, rgba(0,0,0,0.04), transparent)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent)',
                }}
                transition={screenTransition}
              />

              <div className="relative h-full flex flex-col items-center px-3 pt-6 pb-3">
                {/* Avatar */}
                <motion.div
                  className="h-[50px] w-[50px] rounded-full overflow-hidden shrink-0"
                  animate={{ boxShadow: `0 0 0 2px ${activeTheme.avatarRing}` }}
                  transition={screenTransition}
                >
                  <img
                    src={DESIGN_SITE_AVATAR_SRC}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="mt-2 text-[13px] font-extrabold leading-none tracking-tight"
                  animate={{ color: activeTheme.text }}
                  transition={screenTransition}
                >
                  {copy.name}
                </motion.div>
                <motion.div
                  className="mt-1 text-[9px] font-semibold leading-none"
                  animate={{ color: activeTheme.subtext }}
                  transition={screenTransition}
                >
                  {copy.handle}
                </motion.div>

                {/* Social row */}
                <div className="mt-2 flex items-center gap-1">
                  {(
                    [
                      { bg: '#000000', glyph: 'TT', fg: '#FFFFFF' },
                      { bg: '#E94A6A', glyph: 'IG', fg: '#FFFFFF' },
                      { bg: '#1DA1F2', glyph: 'X', fg: '#FFFFFF' },
                      { bg: '#1877F2', glyph: 'F', fg: '#FFFFFF' },
                      { bg: '#0A66C2', glyph: 'in', fg: '#FFFFFF' },
                      { bg: '#1DB954', glyph: 'S', fg: '#FFFFFF' },
                    ] as const
                  ).map((s, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-extrabold"
                      style={{ background: s.bg, color: s.fg }}
                    >
                      {s.glyph}
                    </div>
                  ))}
                </div>

                {/* Link cards */}
                <div className="mt-2.5 w-full flex flex-col gap-1.5 overflow-hidden">
                  {copy.links.map((link, i) => {
                    const thumbColors = ['#5B7FE0', '#7C5CD7', '#E08C4D', '#FF6A4A'];
                    return (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 rounded-[10px] border px-2 py-2"
                        animate={{
                          backgroundColor: activeTheme.cardBg,
                          borderColor: activeTheme.cardBorder,
                        }}
                        transition={screenTransition}
                      >
                        <div
                          className="h-6 w-6 rounded-[6px] shrink-0 flex items-center justify-center"
                          style={{
                            background: thumbColors[i % thumbColors.length],
                          }}
                        >
                          <DesignSiteLinkIcon name={link.icon} color="#FFFFFF" />
                        </div>
                        <motion.div
                          className="flex-1 min-w-0 text-left text-[9px] font-bold leading-[1.15]"
                          animate={{ color: activeTheme.text }}
                          transition={screenTransition}
                        >
                          <span className="line-clamp-2">{link.title}</span>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsFeaturePreview() {
  return <AnalyticsRotatingPreview />;
}

type AnalyticsFeatureKey = 'weekly' | 'countries' | 'liveClicks' | 'sources';

type AnalyticsFeatureItem = {
  key: AnalyticsFeatureKey;
  eyebrow: string;
  meta: string;
  title: string;
  description: string;
  ctaLabel: string;
  badgeLabel: string;
  accent: string;
};

type AnalyticsPreviewCopy = {
  brand: string;
  brandSub: string;
  items: AnalyticsFeatureItem[];
};

const ANALYTICS_PREVIEW_COPY: Record<'en' | 'es', AnalyticsPreviewCopy> = {
  es: {
    brand: 'Estadísticas en vivo',
    brandSub: '1.2M visitas · esta semana',
    items: [
      {
        key: 'weekly',
        eyebrow: 'Vista semanal',
        meta: 'Últimos 7 días',
        title: 'Detecta tus picos de tráfico',
        description: 'Visualiza qué días convierten mejor en tiempo real.',
        ctaLabel: 'Ver',
        badgeLabel: '+18%',
        accent: '#6366F1',
      },
      {
        key: 'countries',
        eyebrow: 'Países líderes',
        meta: '23 regiones activas',
        title: 'Conoce a tu audiencia global',
        description: 'Saber de dónde vienen te ayuda a crecer mejor.',
        ctaLabel: 'Mapa',
        badgeLabel: 'Top 3',
        accent: '#14B8A6',
      },
      {
        key: 'liveClicks',
        eyebrow: 'Clics en vivo',
        meta: 'Hace 1 segundo',
        title: 'Mide cada toque que convierte',
        description: 'Mira tu actividad crecer minuto a minuto.',
        ctaLabel: 'Ver',
        badgeLabel: 'Live',
        accent: '#F43F5E',
      },
      {
        key: 'sources',
        eyebrow: 'Origen del tráfico',
        meta: 'TikTok lidera',
        title: 'Sabe dónde enfocar',
        description: 'Identifica qué canal trae los mejores clics.',
        ctaLabel: 'Detalle',
        badgeLabel: 'TikTok',
        accent: '#8B5CF6',
      },
    ],
  },
  en: {
    brand: 'Live insights',
    brandSub: '1.2M views · this week',
    items: [
      {
        key: 'weekly',
        eyebrow: 'Weekly view',
        meta: 'Last 7 days',
        title: 'Spot your traffic peaks',
        description: 'See which days convert best in real time.',
        ctaLabel: 'View',
        badgeLabel: '+18%',
        accent: '#6366F1',
      },
      {
        key: 'countries',
        eyebrow: 'Top countries',
        meta: '23 active regions',
        title: 'Know your global audience',
        description: 'Learning where your fans come from drives growth.',
        ctaLabel: 'Map',
        badgeLabel: 'Top 3',
        accent: '#14B8A6',
      },
      {
        key: 'liveClicks',
        eyebrow: 'Live clicks',
        meta: '1 second ago',
        title: 'Track every converting tap',
        description: 'Watch your activity climb minute by minute.',
        ctaLabel: 'View',
        badgeLabel: 'Live',
        accent: '#F43F5E',
      },
      {
        key: 'sources',
        eyebrow: 'Traffic sources',
        meta: 'TikTok leads',
        title: 'Know where to invest',
        description: 'Spot the channels driving your best clicks.',
        ctaLabel: 'Detail',
        badgeLabel: 'TikTok',
        accent: '#8B5CF6',
      },
    ],
  },
};

const ANALYTICS_ROTATION_MS = 3100;

function AnalyticsRotatingPreview() {
  const { locale } = useLanguage();
  const copy = ANALYTICS_PREVIEW_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % copy.items.length);
    }, ANALYTICS_ROTATION_MS);
    return () => clearInterval(interval);
  }, [copy.items.length, isInView]);

  const item = copy.items[activeIndex];
  const accent = item.accent;

  const containerVariants: Variants = {
    initial: {},
    enter: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        staggerDirection: -1,
      },
    },
  };

  const childVariants: Variants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.42, ease: DIGITAL_PRODUCT_EASE } },
    exit: { opacity: 0, y: reduceMotion ? 0 : -10, transition: { duration: 0.22, ease: 'easeIn' } },
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-transparent px-4 py-5 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[360px] h-full max-h-[332px] min-h-[280px] rounded-[26px] border border-white/[0.08] bg-[#07111D] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0)_34%),linear-gradient(180deg,_rgba(10,26,43,0.92),_#050913)]" />
        <div className="absolute inset-0 digital-product-grid opacity-45" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(120% 70% at 0% 0%, ${accent}30 0%, transparent 65%), radial-gradient(80% 60% at 100% 100%, ${accent}1c 0%, transparent 60%)`,
          }}
          transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
        />

        <div className="relative h-full p-3.5 sm:p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 h-9 shrink-0">
            <div className="relative h-9 w-9 shrink-0 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-[10px]"
                animate={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}88 100%)` }}
                transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
              />
              <motion.div
                className="absolute -inset-1 rounded-[12px] pointer-events-none"
                animate={{ boxShadow: `0 0 0 1px ${accent}38, 0 0 18px ${accent}44` }}
                transition={{ duration: 0.7, ease: DIGITAL_PRODUCT_EASE }}
              />
              <BarChart3 className="relative h-4 w-4 text-white" strokeWidth={2.4} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold text-white/95 truncate">{copy.brand}</div>
              <div className="flex items-center gap-1 text-[10px] text-white/55 truncate">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: '#22C55E' }}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            boxShadow: [
                              '0 0 0 0 rgba(34,197,94,0.6)',
                              '0 0 0 5px rgba(34,197,94,0)',
                            ],
                          }
                    }
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                </span>
                <span className="truncate">{copy.brandSub}</span>
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`badge-${activeIndex}`}
                initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                exit={reduceMotion ? undefined : { scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.22, ease: DIGITAL_PRODUCT_EASE }}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums shrink-0"
                style={{
                  background: `${accent}1f`,
                  color: accent,
                  boxShadow: `inset 0 0 0 1px ${accent}55`,
                }}
              >
                {item.badgeLabel}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col gap-2.5 flex-1 min-h-0"
            >
              <motion.div
                variants={childVariants}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-white/85 h-4"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: accent }}
                    animate={
                      reduceMotion
                        ? undefined
                        : { boxShadow: [`0 0 0 0 ${accent}66`, `0 0 0 5px ${accent}00`] }
                    }
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                </span>
                <span className="text-white/55 truncate">{item.eyebrow}</span>
                <span className="text-white/30">·</span>
                <span className="truncate">{item.meta}</span>
              </motion.div>

              <motion.div variants={childVariants} className="flex-1 min-h-0">
                <AnalyticsScene
                  featureKey={item.key}
                  accent={accent}
                  reduceMotion={reduceMotion}
                  locale={locale}
                />
              </motion.div>

              <motion.div variants={childVariants} className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-[14px] sm:text-[15px] font-bold leading-[1.15] tracking-tight text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] leading-[1.35] text-white/55 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: [0.92, 1.04, 1], opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45, ease: DIGITAL_PRODUCT_EASE }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold text-[#07111D] shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  style={{ background: accent }}
                >
                  <span className="whitespace-nowrap">{item.ctaLabel}</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

type AnalyticsSceneProps = {
  accent: string;
  reduceMotion: boolean;
  locale: 'en' | 'es';
};

function AnalyticsScene({
  featureKey,
  accent,
  reduceMotion,
  locale,
}: AnalyticsSceneProps & { featureKey: AnalyticsFeatureKey }) {
  switch (featureKey) {
    case 'weekly':
      return <WeeklyBarsScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    case 'countries':
      return <CountriesScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    case 'liveClicks':
      return <LiveClicksScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    case 'sources':
      return <SourcesScene accent={accent} reduceMotion={reduceMotion} locale={locale} />;
    default:
      return null;
  }
}

function WeeklyBarsScene({ accent, reduceMotion, locale }: AnalyticsSceneProps) {
  const heights = [0.32, 0.55, 0.42, 0.7, 0.5, 0.85, 0.95];
  const labels =
    locale === 'es'
      ? ['L', 'M', 'X', 'J', 'V', 'S', 'D']
      : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const peakIndex = 6;

  return (
    <div className="h-full flex items-end gap-1 pb-1">
      {heights.map((h, i) => {
        const isPeak = i === peakIndex;
        return (
          <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
            <div className="relative w-full flex-1">
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-[3px]"
                style={{
                  background: isPeak
                    ? `linear-gradient(180deg, ${accent} 0%, ${accent}88 100%)`
                    : 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
                  boxShadow: isPeak ? `0 0 14px ${accent}66` : 'none',
                }}
                initial={reduceMotion ? false : { height: 0 }}
                animate={reduceMotion ? undefined : { height: `${h * 100}%` }}
                transition={{
                  delay: i * 0.06 + 0.05,
                  duration: 0.55,
                  ease: DIGITAL_PRODUCT_EASE,
                }}
              />
            </div>
            <span
              className="text-[8.5px] font-bold tabular-nums leading-none"
              style={{ color: isPeak ? accent : 'rgba(255,255,255,0.42)' }}
            >
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LiveClicksScene({ accent, reduceMotion, locale }: AnalyticsSceneProps) {
  const todayLabel = locale === 'es' ? 'hoy' : 'today';
  const vsYesterday = locale === 'es' ? 'vs ayer' : 'vs yesterday';
  const clicksLabel = locale === 'es' ? 'clics' : 'clicks';
  const gradId = `spark-${accent.replace('#', '')}`;

  return (
    <div className="h-full flex flex-col items-center justify-center gap-0.5">
      <motion.div
        className="text-[28px] font-extrabold leading-none tracking-tight tabular-nums text-white"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
      >
        1,247
      </motion.div>
      <div className="text-[9.5px] font-semibold text-white/55 tracking-wide">
        {clicksLabel} · {todayLabel}
      </div>
      <svg viewBox="0 0 120 32" className="w-[150px] h-7 mt-0.5" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,24 L15,20 L30,22 L45,16 L60,18 L75,12 L90,14 L105,8 L120,4 L120,32 L0,32 Z"
          fill={`url(#${gradId})`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: DIGITAL_PRODUCT_EASE }}
        />
        <motion.path
          d="M0,24 L15,20 L30,22 L45,16 L60,18 L75,12 L90,14 L105,8 L120,4"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: DIGITAL_PRODUCT_EASE }}
        />
        <motion.circle
          cx="120"
          cy="4"
          r="2.5"
          fill={accent}
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.3 }}
          style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
        />
      </svg>
      <motion.div
        className="text-[9.5px] font-bold tabular-nums mt-0.5"
        style={{ color: accent }}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.3 }}
      >
        +12% {vsYesterday}
      </motion.div>
    </div>
  );
}

function SourcesScene({ accent, reduceMotion, locale }: AnalyticsSceneProps) {
  const sources = [
    { name: 'TikTok', pct: 62, color: accent },
    { name: 'Instagram', pct: 22, color: '#FF6B9D' },
    { name: 'YouTube', pct: 11, color: '#FF4D4D' },
    { name: locale === 'es' ? 'Otros' : 'Other', pct: 5, color: 'rgba(255,255,255,0.32)' },
  ];

  let cumulative = 0;
  const segments = sources.map((s) => {
    const fraction = s.pct / 100;
    const result = { ...s, fraction, start: cumulative };
    cumulative += fraction;
    return result;
  });

  return (
    <div className="h-full flex items-center gap-3 px-1">
      <motion.div
        className="relative h-[78px] w-[78px] shrink-0"
        initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: DIGITAL_PRODUCT_EASE }}
      >
        <svg viewBox="0 0 60 60" className="absolute inset-0 -rotate-90">
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          {segments.map((seg, i) => (
            <motion.circle
              key={i}
              cx="30"
              cy="30"
              r="22"
              fill="none"
              stroke={seg.color}
              strokeWidth="6"
              strokeLinecap="butt"
              pathLength={1}
              strokeDashoffset={-seg.start}
              initial={reduceMotion ? false : { strokeDasharray: '0 1' }}
              animate={
                reduceMotion ? undefined : { strokeDasharray: `${seg.fraction} ${1 - seg.fraction}` }
              }
              transition={{
                delay: i * 0.12 + 0.08,
                duration: 0.7,
                ease: DIGITAL_PRODUCT_EASE,
              }}
              style={{ filter: i === 0 ? `drop-shadow(0 0 5px ${accent}88)` : 'none' }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-[14px] font-extrabold tabular-nums leading-none"
            style={{ color: accent }}
          >
            62%
          </div>
          <div className="text-[7.5px] font-semibold uppercase tracking-[0.12em] text-white/50 mt-0.5 leading-none">
            TikTok
          </div>
        </div>
      </motion.div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {sources.map((s, i) => (
          <motion.div
            key={s.name}
            initial={reduceMotion ? false : { x: -8, opacity: 0 }}
            animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
            transition={{
              delay: i * 0.06 + 0.25,
              duration: 0.35,
              ease: DIGITAL_PRODUCT_EASE,
            }}
            className="flex items-center gap-1.5"
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: s.color }}
            />
            <span className="text-[10px] font-medium text-white/85 truncate flex-1">
              {s.name}
            </span>
            <span className="text-[10px] font-bold tabular-nums text-white/65 shrink-0">
              {s.pct}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CountriesScene({ accent, reduceMotion, locale }: AnalyticsSceneProps) {
  const data = [
    {
      flag: 'BR',
      name: locale === 'es' ? 'Brasil' : 'Brazil',
      value: '307k',
      width: 1,
      gradient: 'linear-gradient(135deg, #009C3B 0%, #FFDF00 100%)',
    },
    {
      flag: 'US',
      name: locale === 'es' ? 'EE. UU.' : 'USA',
      value: '198k',
      width: 0.62,
      gradient: 'linear-gradient(135deg, #B22234 0%, #3C3B6E 100%)',
    },
    {
      flag: 'PT',
      name: 'Portugal',
      value: '117k',
      width: 0.4,
      gradient: 'linear-gradient(135deg, #006233 0%, #FF0000 100%)',
    },
  ];

  return (
    <div className="h-full flex flex-col gap-2 justify-center">
      {data.map((row, i) => (
        <motion.div
          key={i}
          initial={reduceMotion ? false : { x: -10, opacity: 0 }}
          animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
          transition={{
            delay: i * 0.08 + 0.05,
            duration: 0.4,
            ease: DIGITAL_PRODUCT_EASE,
          }}
          className="flex items-center gap-2"
        >
          <div
            className="h-4 w-5 rounded-[3px] shrink-0 flex items-center justify-center text-[7px] font-extrabold text-white/95 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
            style={{ background: row.gradient }}
          >
            {row.flag}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-semibold text-white/95 truncate">
                {row.name}
              </span>
              <span className="text-[9.5px] font-bold tabular-nums text-white/65 shrink-0">
                {row.value}
              </span>
            </div>
            <div className="mt-1 relative h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${accent} 0%, ${accent}aa 100%)`,
                  boxShadow: `0 0 10px ${accent}44`,
                }}
                initial={reduceMotion ? false : { width: 0 }}
                animate={reduceMotion ? undefined : { width: `${row.width * 100}%` }}
                transition={{
                  delay: i * 0.08 + 0.18,
                  duration: 0.7,
                  ease: DIGITAL_PRODUCT_EASE,
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
