/*
 * Linkme Landing Page — "Midnight Editorial" Design
 * Dark-mode only, near-black (#0A0A0A) bg, navy-teal cards (#0B1926-#0F2840),
 * orange accent (#E8930C), Inter font, magazine-scale typography.
 */

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import UrlInputBar from '@/components/UrlInputBar';
import CreatorCarousel from '@/components/CreatorCarousel';
import WorldMap from '@/components/WorldMap';
import AppIconGrid from '@/components/AppIconGrid';
import { LinkmeIcon } from '@/components/LinkmeIcon';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import {
  Eye, Globe, ShoppingBag, Lock,
  DollarSign, ChevronDown, BarChart3, Users,
  Instagram, Facebook, Youtube, Music2, Check
} from 'lucide-react';

// Image URLs
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/hero-bg-UR5rzfvPVvMwDzTyCqzw6u.webp';
const CREATOR_LIFESTYLE = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/creator-lifestyle-eAePL9YnBxbQUubnYhm3fa.webp';
const FEMALE_CREATOR = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/female-creator-KoNNQiTsKfMVtWm8xvoSep.webp';
const CREATOR_CTA_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/creator-cta-bg-C9mdqCe3aNkVQnH8bbSzUM.webp';
const FEATURE_VIDEO_DIGITAL_PRODUCT = '/videos/features/digital-product-builder.mov';
const FEATURE_VIDEO_COURSE_BUILDER = '/videos/features/course-builder.mov';
const COACHING_FRAMES = [
  '/images/coaching-frames/frame-03.png',
  '/images/coaching-frames/frame-04.png',
  '/images/coaching-frames/frame-05.png',
];

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div
            className="absolute left-0 top-0 h-full w-[56%]"
            style={{
              background:
                'radial-gradient(80% 58% at 24% 24%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.97) 52%, rgba(0,0,0,0.74) 78%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/20" />
        </div>

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 py-20">
          <div className="lg:w-[55%]">
            <h1
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.2s',
              }}
            >
              <span className="italic">Construye tu marca</span>
              <br />
              y vende desde un solo link
            </h1>
            <p
              className="text-[#C0C0C0] text-base md:text-[17px] max-w-[550px] leading-[1.6] mb-8"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.5s',
              }}
            >
              Productos digitales, cursos, consultorías, membresías y más. Hooks reúne lo que necesitas para convertir tu audiencia en ingresos.
            </p>
            <div
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
            className="lg:w-[45%] flex justify-center lg:justify-end lg:pr-2 xl:pr-4"
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
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-bold leading-[1.12] tracking-[-0.02em] max-w-[1000px]">
              <span className="text-white">La plataforma para la nueva economía de creadores. </span>
              <span className="text-[#B0B0B0]">Haz crecer tu audiencia. </span>
              <span className="text-[#808080]">Convierte seguidores en clientes. </span>
              <span className="text-[#E85D75]">Vende productos. Ofrece servicios. </span>
              <span className="text-[#555555]">Monetiza tu contenido.</span>
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
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] max-w-[600px] mb-12 md:mb-16">
              For everyone from creators to enterprise
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {[
              {
                title: 'Digital Product Builder',
                desc: 'Create and sell digital products directly from your Linkme profile with checkout-ready product cards.',
                videoSrc: FEATURE_VIDEO_DIGITAL_PRODUCT,
                videoClassName: 'object-contain p-2 bg-[#0B1926]',
                overlayClass: 'from-[#0B1926]/34 via-[#0B1926]/8 to-transparent',
                metricLabel: 'Total Sales',
                metricValue: '$6,467',
                icon: <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />,
              },
              {
                title: 'Course Builder',
                desc: 'Publish paid courses in minutes so followers can learn from you and buy access in one tap.',
                videoSrc: FEATURE_VIDEO_COURSE_BUILDER,
                overlayClass: 'from-[#0B1926]/36 via-[#0B1926]/9 to-transparent',
                metricLabel: 'Enrolled Students',
                metricValue: '1,204',
                icon: <Check className="w-3.5 h-3.5 text-blue-500" />,
              },
              {
                title: 'Coaching Calls',
                desc: 'Promote paid coaching calls from your profile to turn consultorías into booked sessions.',
                preview: <CoachingCallsFeaturePreview />,
                overlayClass: 'from-[#0B1926]/38 via-[#0B1926]/12 to-transparent',
                metricLabel: 'Calls Booked',
                metricValue: '34 this week',
                icon: <Users className="w-3.5 h-3.5 text-green-600" />,
              },
              {
                title: 'Memberships',
                desc: 'Offer members-only content behind a paywall to build recurring revenue from your audience.',
                preview: <MembershipsFeaturePreview />,
                overlayClass: 'from-[#0B1926]/30 via-[#0B1926]/7 to-transparent',
                metricLabel: 'Active Members',
                metricValue: '892',
                icon: <Lock className="w-3.5 h-3.5 text-purple-500" />,
              },
              {
                title: 'Analytics',
                desc: 'Track clicks, earnings, and engagement in real time from a single analytics dashboard.',
                preview: <AnalyticsFeaturePreview />,
                overlayClass: 'from-[#0B1926]/30 via-[#0B1926]/6 to-transparent',
                metricLabel: 'Profile Views',
                metricValue: '1.2M',
                icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />,
              },
            ].map((card, i) => (
              <SectionWrapper key={card.title} delay={i * 80}>
                <div className="border border-white/[0.08] rounded-[20px] overflow-hidden h-full hover:border-white/[0.12] transition-all duration-300 group">
                  <div className="h-[350px] relative overflow-hidden">
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
                    <div className="absolute bottom-5 left-5 right-5 bg-white/95 rounded-xl p-3 shadow-xl z-10">
                      <div className="flex items-center gap-2 text-gray-500 text-[10px] font-medium">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">{card.icon}</span>
                        {card.metricLabel}
                      </div>
                      <div className="text-black font-bold text-lg mt-1 leading-tight">{card.metricValue}</div>
                    </div>
                  </div>
                  <div className="bg-[#0A0A0A] p-6 pt-5">
                    <h3 className="text-white text-[22px] font-semibold mb-2">{card.title}</h3>
                    <p className="text-[#8A8F98] text-[15px] leading-[1.6]">{card.desc}</p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. ANALYTICS SECTION ===== */}
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionWrapper>
            <p className="text-[#E8930C] text-base font-semibold mb-3">Around the world</p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] mb-12 md:mb-16">
              Track your global analytics
            </h2>
          </SectionWrapper>

          <SectionWrapper delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-navy-teal overflow-hidden p-5 md:p-6 transition-all duration-300">
                <div className="relative h-[260px] md:h-[340px] lg:h-[380px]">
                  <WorldMap />
                  {/* Floating stat cards */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white rounded-xl p-3 shadow-xl animate-bob z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Eye className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium">Profile Views</div>
                        <div className="text-black font-bold text-lg leading-tight">1.2M</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-20 left-4 md:top-24 md:left-6 bg-white rounded-xl p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium">Link Clicks</div>
                        <div className="text-black font-bold text-lg leading-tight">14k</div>
                      </div>
                    </div>
                  </div>

                  {/* Country breakdown */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-xl p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '1.5s' }}>
                    <div className="space-y-2.5">
                      {[
                        { flag: '🇧🇷', country: 'Brazil', views: '307k views', rank: 1 },
                        { flag: '🇺🇸', country: 'USA', views: '96k views', rank: 2 },
                        { flag: '🇵🇹', country: 'Portugal', views: '117k views', rank: 3 },
                      ].map((item) => (
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
                  <h3 className="text-white font-bold text-xl mb-3">Real-time global analytics, for free.</h3>
                  <p className="text-[#8A8F98] text-[15px] leading-[1.6] max-w-[700px]">
                    Linkme makes sure your profile is accessible worldwide, providing seamless access whether you receive hundreds or millions of clicks. We keep everything running smoothly and show you where your profile is being viewed, giving you all the analytics you need.
                  </p>
                </div>
              </div>

              <div className="card-navy-teal overflow-hidden p-5 md:p-6 transition-all duration-300">
                <div className="relative h-[260px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-[#050814]">
                  <iframe
                    src="/videos/features/premium_analytics_loop_v2.html"
                    title="Premium analytics animation"
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h3 className="text-white font-bold text-xl mb-3">Premium analytics animation loop.</h3>
                  <p className="text-[#8A8F98] text-[15px] leading-[1.6]">
                    A polished live analytics canvas that complements your global stats view with richer motion and performance storytelling.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 8. PLATFORM/MANAGEMENT SECTION ===== */}
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionWrapper>
            <p className="text-[#E8930C] text-base font-semibold mb-3">One platform</p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] mb-12 md:mb-16">
              Manage everything in one place
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionWrapper>
              <DashboardCard />
            </SectionWrapper>
            <SectionWrapper delay={120}>
              <MobileCard />
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ===== 10. INTEGRATIONS GRID ===== */}
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] max-w-[700px] mb-4">
              Add all your favorite apps to your Linkme profile
            </h2>
            <p className="text-[#8A8F98] text-[17px] leading-[1.6] max-w-[600px] mb-12 md:mb-16">
              Easily integrate the platforms you already use like Instagram, TikTok, and YouTube. Linkme brings all your favorite apps together in one seamless profile.
            </p>
          </SectionWrapper>
          <SectionWrapper delay={200}>
            <AppIconGrid />
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 11. SOCIAL PROOF / STATS ===== */}
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-center mb-16 md:mb-24">
              There's no better place<br className="hidden sm:block" /> for creators
            </h2>
          </SectionWrapper>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
              <SectionWrapper>
                <h3 className="text-[28px] md:text-[36px] font-bold mb-8">All in one platform.</h3>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-16 mb-6">
                  <StatBlock label="More Conversions" value={39} suffix="%" />
                  <div className="w-px bg-white/10 self-stretch hidden md:block" />
                  <StatBlock label="Countries Global Reach" value={180} suffix="+" />
                </div>
                <div className="w-64 h-0.5 bg-[#E8930C] mb-6" />
                <p className="text-[#8A8F98] text-base leading-[1.6] max-w-[500px]">
                  LinkMe gives creators everything they need to grow, earn, and succeed in one powerful platform, no tech skills required. From featured links to digital product sales, it's the easiest way to turn followers into revenue.
                </p>
              </SectionWrapper>
            </div>

            <div className="lg:w-1/2 relative">
              <SectionWrapper delay={200}>
                <SocialProofMockup />
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12. SPEED/PERFORMANCE SECTION ===== */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
              <SectionWrapper>
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={CREATOR_LIFESTYLE} alt="Creator using phone" className="w-full h-[500px] object-cover" />
                  {/* Floating stat badges */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl animate-bob">
                    <div className="text-gray-400 text-[10px] font-medium">Total Sales</div>
                    <div className="text-black font-bold text-xl">$3,622.71</div>
                    <div className="text-green-500 text-xs font-semibold mt-0.5">↗ 204%</div>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl animate-bob" style={{ animationDelay: '0.5s' }}>
                    <div className="text-gray-400 text-[10px] font-medium">New Followers</div>
                    <div className="text-black font-bold text-xl">62.44K</div>
                    <span className="text-purple-600 text-[10px] font-semibold bg-purple-100 rounded px-1.5 py-0.5 mt-0.5 inline-block">↗ 311%</span>
                  </div>
                  {[
                    { flag: '🇺🇸', country: 'USA', pct: '84%', style: { top: '45%', left: '12%' } },
                    { flag: '🇨🇦', country: 'Canada', pct: '56%', style: { top: '62%', left: '8%' } },
                    { flag: '🇧🇷', country: 'Brazil', pct: '36%', style: { top: '55%', right: '8%' } },
                    { flag: '🇲🇽', country: 'Mexico', pct: '33%', style: { bottom: '12%', left: '12%' } },
                    { flag: '🇦🇺', country: 'Australia', pct: '48%', style: { bottom: '12%', right: '12%' } },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="absolute bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-xl flex items-center gap-2 animate-bob"
                      style={{ ...badge.style, animationDelay: `${i * 0.4}s` } as React.CSSProperties}
                    >
                      <span className="text-base">{badge.flag}</span>
                      <span className="text-black text-xs font-bold">{badge.country}</span>
                      <span className="text-green-500 text-xs font-semibold">↗{badge.pct}</span>
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            </div>

            <div className="lg:w-1/2">
              <SectionWrapper delay={200}>
                <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                  Blazingly Fast
                </h2>
                <p className="text-[#8A8F98] text-[17px] leading-[1.6]">
                  Linkme loads in a blink. We know time is money. If a page is slow, people leave. Your fans want to see your stuff right away, so Linkme shows it all instantly and keeps them with you.
                </p>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 13. FINAL CTA SECTION ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionWrapper>
            <div className="max-w-[750px] mx-auto px-6 md:px-8 text-center">
              <h2 className="text-5xl md:text-6xl font-bold leading-[0.98] tracking-tight text-[#F1F3F7]">
                Build your store.<br />
                Share your links.<br />
                Get paid.
              </h2>

              <button
                type="button"
                className="mt-12 min-w-[132px] bg-white text-black text-[15px] font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:bg-[#e45b73] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e45b73]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                Start for free
              </button>

              <div className="mt-6 flex flex-col items-center gap-6 text-[#B6BCC7] text-[15px]">
                <p>✓ No card required</p>
                <p>✓ Live in minutes</p>
                <p>✓ Built for creators</p>
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

function PhoneMockup() {
  return (
    <div className="relative w-64 sm:w-72 md:w-[19rem] lg:w-[22.5rem] xl:w-[24rem] aspect-[9/16]">
      <div className="w-full h-full">
        <div className="h-full rounded-[2rem] overflow-hidden bg-[#060A10]">
          <div className="relative h-full rounded-[2rem] overflow-hidden border border-white/12">
            <img src={FEMALE_CREATOR} alt="" className="absolute inset-x-0 -top-[24%] h-[150%] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />

            <div className="absolute left-2.5 right-2.5 bottom-[31%]">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-white text-[20px] leading-none font-bold">IShowSpeed</h3>
                <span className="w-[18px] h-[18px] rounded-full bg-[#3B82F6] border border-blue-200/45 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </span>
              </div>
              <p className="text-white/70 text-[10px] text-center mt-0.5">@ishowspeed</p>

              <div className="mt-2 flex items-center justify-center gap-1.5">
                {[
                  <Youtube key="yt" className="w-3.5 h-3.5 text-[#EF4444]" />,
                  <Instagram key="ig" className="w-3.5 h-3.5 text-[#D946EF]" />,
                  <span key="snap" className="text-[9px] font-bold text-black">S</span>,
                  <Facebook key="fb" className="w-3.5 h-3.5 text-[#2563EB]" />,
                  <span key="x" className="text-[10px] font-semibold text-[#111827]">X</span>,
                  <Music2 key="tt" className="w-3.5 h-3.5 text-[#0F172A]" />,
                  <LinkmeIcon key="hooks" size={11} />,
                ].map((icon, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                  >
                    {icon}
                  </div>
                ))}
              </div>

              <p className="text-white text-[10px] font-semibold text-center mt-2">
                132.4M Total Followers <ChevronDown className="w-3 h-3 inline -mt-0.5" />
              </p>
              <p className="text-white/95 text-[10px] tracking-[0.12em] font-semibold text-center mt-1">ALL MY LINKS</p>
            </div>

            <div className="absolute left-2.5 right-2.5 bottom-2.5 grid grid-rows-[1fr_auto] gap-2">
              <div className="relative h-28 sm:h-32 rounded-[1rem] overflow-hidden border border-white/12">
                <img src={CREATOR_LIFESTYLE} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <Youtube className="w-3.5 h-3.5 text-[#EF4444]" />
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[11px] font-semibold">YouTube</p>
              </div>

              <div className="grid grid-cols-2 gap-2 h-16 sm:h-20">
                <div className="relative rounded-[0.95rem] overflow-hidden border border-white/10">
                  <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 border border-black/10 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-black">S</span>
                  </div>
                </div>

                <div className="relative rounded-[0.95rem] overflow-hidden border border-white/10">
                  <img src={CREATOR_CTA_BG} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 border border-black/10 flex items-center justify-center">
                    <span className="text-[10px] leading-none text-black">x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembershipsFeaturePreview() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#D9E0EE] to-[#BCC7DA] p-5 flex items-center justify-center">
      <div className="w-[72%] h-[94%] bg-[#F5F8FE] rounded-[22px] overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.25)] border border-white/70 relative">
        <div className="h-[27%] bg-gradient-to-r from-[#2B84FF] via-[#5B68FF] to-[#6FDD9E] relative overflow-hidden">
          <div className="absolute -top-8 left-14 w-40 h-24 rounded-full bg-[#9EF2C8]/45 blur-sm animate-bob" />
          <div className="absolute top-2 left-28 w-36 h-16 rounded-full bg-[#A2A1FF]/55 blur-sm animate-bob" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-8 left-20 w-28 h-12 rounded-full bg-[#4740B8]/45 blur-sm animate-bob" style={{ animationDelay: '0.9s' }} />
        </div>
        <div className="px-4 pt-4">
          <h4 className="text-[#1F2535] text-[14px] font-bold leading-tight">Creator Circle Membership</h4>
          <p className="text-[#1F2535] text-[13px] font-bold mt-1">$12 <span className="font-medium text-[#5B657E]">/ month</span></p>
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
          <span className="text-white text-[11px] font-semibold">Get this now</span>
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

function AnalyticsFeaturePreview() {
  return (
    <iframe
      src="/videos/features/premium_analytics_loop_v2.html"
      className="w-full h-full border-0 pointer-events-none"
      loading="lazy"
      title="Premium analytics animation"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

function DashboardCard() {
  return (
    <div className="card-navy-teal overflow-hidden h-full transition-all duration-300">
      <div className="h-[420px] relative p-6 overflow-hidden bg-gradient-to-br from-[#0B1926] to-[#0F2840]">
        <div className="bg-[#111827] rounded-xl p-5 shadow-2xl max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <LinkmeIcon size={20} />
            <span className="text-white text-sm font-semibold">Hooks</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: <Lock className="w-4 h-4 text-gray-500" />, label: 'Total Sales', value: '1,391', color: 'text-green-400' },
              { icon: <DollarSign className="w-4 h-4 text-gray-500" />, label: 'Total revenue', value: '$6,467.31', color: 'text-green-400' },
              { icon: <Eye className="w-4 h-4 text-gray-500" />, label: 'Profile Views', value: '3.2 M', color: 'text-green-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1F2937] rounded-lg p-3">
                {stat.icon}
                <div className="text-gray-500 text-[9px] mt-1.5">{stat.label}</div>
                <div className="text-white font-bold text-sm mt-0.5">{stat.value}</div>
                <div className={`${stat.color} text-[9px] mt-0.5 font-medium`}>↗ +12%</div>
              </div>
            ))}
          </div>
          <div className="text-gray-500 text-xs mb-2 font-medium">Top Locations</div>
          <div className="space-y-1.5">
            {['Miami', 'Los Angeles', 'New York', 'London'].map((city, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-xs">
                <span className="text-gray-600 w-3">{i + 1}.</span> {city}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <h3 className="text-white text-xl font-semibold mb-2">Track your growth in real-time</h3>
        <p className="text-[#8A8F98] text-[15px] leading-[1.6]">View clicks, earnings, and engagement all in one place with Linkme's powerful analytics.</p>
      </div>
    </div>
  );
}

function MobileCard() {
  return (
    <div className="card-navy-teal overflow-hidden h-full transition-all duration-300">
      <div className="h-[420px] relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1926] to-[#0F2840]">
        <div className="w-52 h-[380px] bg-black rounded-[2.5rem] border-[3px] border-gray-700 p-1.5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-10" />
          <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-amber-400 via-orange-400 to-orange-500 relative">
            <div className="absolute top-3 left-4 text-white/70 text-[10px]">1:47</div>
            <div className="absolute top-3 right-4 flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1,2,3,4].map(i => <div key={i} className="w-[3px] h-[6px] bg-white/70 rounded-sm" style={{height: `${i*2+2}px`}} />)}
              </div>
              <div className="text-white/70 text-[8px]">⚡</div>
            </div>
            <div className="absolute top-12 left-0 right-0 text-center">
              <div className="text-white/80 text-[11px]">Tuesday, July 29</div>
              <div className="text-white text-5xl font-bold mt-1 tracking-tight">1:47</div>
            </div>
            <div className="absolute bottom-6 left-3 right-3 space-y-2">
              {[
                { msg: 'Brand deal accepted for $5,000!', time: '1:47' },
                { msg: 'Hat sale of $19!', time: '1:47' },
              ].map((notif, i) => (
                <div key={i} className="bg-white/25 backdrop-blur-md rounded-2xl p-2.5 flex items-center gap-2.5">
                  <LinkmeIcon size={22} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-[10px] font-semibold">Hooks</div>
                    <div className="text-white/90 text-[9px] truncate">{notif.msg}</div>
                  </div>
                  <span className="text-white/50 text-[8px] shrink-0">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <h3 className="text-white text-xl font-semibold mb-2">Run your business from anywhere</h3>
        <p className="text-[#8A8F98] text-[15px] leading-[1.6]">Do it all on the go with the full-featured Linkme mobile app, your business, in your pocket.</p>
      </div>
    </div>
  );
}

const HOODIE_PRODUCT = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/hoodie-product-GRZbibXBHC57GZStZ4Zchj.webp';

function SocialProofMockup() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center relative">
        <img src={HOODIE_PRODUCT} alt="Hoodie product" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Order summary */}
      <div className="absolute top-6 -right-2 md:right-2 bg-white rounded-xl p-4 shadow-2xl w-52 animate-bob z-10">
        <h4 className="text-black font-bold text-sm mb-3">Order summary</h4>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded" />
          <div>
            <div className="text-black text-[11px] font-medium">Limited EP</div>
            <div className="text-gray-400 text-[9px]">Grey Hoodie</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg px-2 py-1.5 mb-2">
          <span className="text-gray-400 text-[10px]">Discount code</span>
        </div>
        <div className="text-[10px] text-gray-500 space-y-1">
          <div className="flex justify-between"><span>Subtotal</span><span className="text-black font-medium">$45.00</span></div>
          <div className="flex justify-between"><span>Shipping</span><span className="text-black font-medium">$5.00</span></div>
          <div className="flex justify-between font-bold text-black text-[11px] pt-1 border-t border-gray-100"><span>Total</span><span>$50.00</span></div>
        </div>
      </div>

      {/* Payment method */}
      <div className="absolute bottom-6 right-0 md:right-4 bg-white rounded-xl p-3 shadow-2xl w-52 animate-bob z-10" style={{ animationDelay: '1s' }}>
        <div className="text-black text-[11px] font-medium mb-2 flex items-center gap-1.5">
          <span>💳</span> Choose a Payment Method
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5">
            <span className="text-[10px]">💳</span>
            <span className="text-gray-700 text-[10px]">Credit or debit card</span>
            <div className="ml-auto w-3 h-3 rounded-full border-2 border-blue-500 bg-blue-500" />
          </div>
          <div className="flex items-center gap-2 border border-gray-100 rounded-lg px-2 py-1.5">
            <span className="text-blue-600 text-[10px] font-bold">P</span>
            <span className="text-gray-500 text-[10px]">PayPal</span>
          </div>
          <div className="flex items-center gap-2 border border-gray-100 rounded-lg px-2 py-1.5">
            <span className="text-[10px]">🍎</span>
            <span className="text-gray-500 text-[10px]">Apple Pay</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function StatBlock({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const animatedValue = useCountUp(value, 1500, isVisible);

  return (
    <div ref={ref}>
      <p className="text-[#E8930C] text-sm font-semibold mb-2">{label}</p>
      <p className="text-white text-[48px] md:text-[64px] font-bold tracking-tight leading-none">
        {animatedValue}{suffix}
      </p>
    </div>
  );
}
