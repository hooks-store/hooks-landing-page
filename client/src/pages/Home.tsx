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
import EarningsCalculator from '@/components/EarningsCalculator';
import { LinkmeIcon } from '@/components/LinkmeIcon';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import {
  Eye, Globe, ShoppingBag, Lock,
  DollarSign, ChevronDown, BarChart3, Users, TrendingUp
} from 'lucide-react';

// Image URLs
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/hero-bg-UR5rzfvPVvMwDzTyCqzw6u.webp';
const CREATOR_LIFESTYLE = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/creator-lifestyle-eAePL9YnBxbQUubnYhm3fa.webp';
const FEMALE_CREATOR = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/female-creator-KoNNQiTsKfMVtWm8xvoSep.webp';
const CREATOR_CTA_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/creator-cta-bg-C9mdqCe3aNkVQnH8bbSzUM.webp';

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />
        </div>

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 py-20">
          <div className="lg:w-[55%]">
            <h1
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-bold leading-[1.08] tracking-[-0.02em] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.2s',
              }}
            >
              <span className="italic">Build a Brand</span>
              <br />
              with the best link in bio.
            </h1>
            <p
              className="text-[#C0C0C0] text-base md:text-[17px] max-w-[550px] leading-[1.6] mb-8"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.5s',
              }}
            >
              Linkme puts everything you sell—courses, ebooks, merch, products, even paid calls—into one link so fans can buy in seconds and you get paid fast.
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
            className="lg:w-[45%] flex justify-center lg:justify-end animate-float-slow"
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
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-bold leading-[1.12] tracking-[-0.02em] max-w-[1000px]">
              <span className="text-white">The creator economy platform behind it all. </span>
              <span className="text-[#B0B0B0]">Grow your audience. </span>
              <span className="text-[#808080]">Turn your followers into customers. </span>
              <span className="text-[#E8930C]">Sell products. Sell services. </span>
              <span className="text-[#555555]">Collect Emails.</span>
            </h2>
          </SectionWrapper>
        </div>
        <div className="mt-16 md:mt-24">
          <SectionWrapper delay={200}>
            <CreatorCarousel />
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 3. THREE-AUDIENCE SECTION ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] max-w-[600px] mb-12 md:mb-16">
              For everyone from creators to enterprise
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Show the world who you are',
                title: 'For People',
                desc: 'Show the world who you are with a profile that unites your socials, content, and products in one place. Capture leads, sell products, and build your brand while owning your data, tracking every click, and unlocking monetization tools to grow across every platform.',
                bgClass: 'bg-gradient-to-br from-[#0F1923] to-[#162030]',
                mockup: <PeopleMockup />,
              },
              {
                label: 'Show the world what you can do',
                title: 'For Business',
                desc: 'Transform your digital presence into a conversion hub. Capture leads, drive sales, and grow your brand with customizable profiles, advanced analytics, and our integrated ads platform to reach and retarget customers in real time.',
                bgClass: 'bg-gradient-to-br from-[#0F1923] to-[#162030]',
                mockup: <BusinessMockup />,
              },
              {
                label: 'Show the world why you',
                title: 'For Agencies',
                desc: 'Manage and scale all your talent or clients from one powerful dashboard. Create profiles, track performance with advanced analytics, and open new revenue streams with built-in monetization tools, data capture, and cross-platform growth.',
                bgClass: 'bg-gradient-to-br from-[#2D1B69] to-[#4C1D95]/60',
                mockup: <AgenciesMockup />,
              },
            ].map((card, i) => (
              <SectionWrapper key={i} delay={i * 120}>
                <div className="border border-white/[0.08] rounded-[20px] overflow-hidden h-full hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group">
                  <div className={`h-[350px] ${card.bgClass} relative p-6 overflow-hidden`}>
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                      <div className="w-2 h-2 rounded-full bg-[#E8930C]" />
                      <span className="text-white/80 text-[13px]">{card.label}</span>
                    </div>
                    {card.mockup}
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

      {/* ===== 4. MONETIZATION SECTION ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionWrapper>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-12 md:mb-16">
              <div>
                <p className="text-[#E8930C] text-base font-semibold mb-3">Online and in person</p>
                <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em]">
                  Make money everywhere
                </h2>
              </div>
              <p className="text-[#8A8F98] text-[17px] leading-[1.6] max-w-[400px] lg:text-right">
                Start selling fast with AI-powered design, pick a modern theme, or go fully custom for total creative freedom.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={150}>
            <MerchCard />
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 5. TWO-COLUMN FEATURE CARDS ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionWrapper>
              <DigitalProductsCard />
            </SectionWrapper>
            <SectionWrapper delay={120}>
              <PaywallCard />
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ===== 6. THREE-COLUMN FEATURE CARDS ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Email Marketing', desc: 'Build your newsletter and send emails to your followers.', content: <EmailMarketingMockup /> },
              { title: 'Collect Tips', desc: 'Accept tips from anyone through your Linkme profile.', content: <CollectTipsMockup /> },
              { title: 'Course Builder', desc: 'Create courses and charge for access.', content: <CourseBuilderMockup /> },
            ].map((card, i) => (
              <SectionWrapper key={i} delay={i * 120}>
                <div className="card-navy-teal overflow-hidden h-full hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <div className="h-[380px] relative overflow-hidden">{card.content}</div>
                  <div className="p-6 pt-4">
                    <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-[#8A8F98] text-[15px] leading-[1.6]">{card.desc}</p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. ANALYTICS SECTION ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionWrapper>
            <p className="text-[#E8930C] text-base font-semibold mb-3">Around the world</p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] mb-12 md:mb-16">
              Track your global analytics
            </h2>
          </SectionWrapper>

          <SectionWrapper delay={150}>
            <div className="card-navy-teal overflow-hidden p-6 md:p-10 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
              <div className="relative h-[300px] md:h-[420px]">
                <WorldMap />
                {/* Floating stat cards */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white rounded-xl p-3 shadow-xl animate-bob z-10">
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

                <div className="absolute top-24 left-4 md:top-28 md:left-8 bg-white rounded-xl p-3 shadow-xl animate-bob z-10" style={{ animationDelay: '0.5s' }}>
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

                {/* Creator profile card */}
                <div className="absolute top-4 left-1/2 -translate-x-1/4 bg-white/10 backdrop-blur-md rounded-xl p-4 hidden md:block animate-bob z-10" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">D</div>
                    <div>
                      <div className="text-white font-bold text-sm">Diego Lopes</div>
                      <div className="text-white/60 text-xs">@diegolopesmma</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                    <div className="w-7 h-7 rounded-full bg-blue-600" />
                  </div>
                </div>

                {/* Country breakdown */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white rounded-xl p-4 shadow-xl animate-bob z-10" style={{ animationDelay: '1.5s' }}>
                  <div className="space-y-3">
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

              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-white font-bold text-xl mb-3">Real-time global analytics, for free.</h3>
                <p className="text-[#8A8F98] text-[15px] leading-[1.6] max-w-[700px]">
                  Linkme makes sure your profile is accessible worldwide, providing seamless access whether you receive hundreds or millions of clicks. We keep everything running smoothly and show you where your profile is being viewed, giving you all the analytics you need.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 8. PLATFORM/MANAGEMENT SECTION ===== */}
      <section className="py-24 md:py-36">
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

      {/* ===== 9. EARNINGS CALCULATOR ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionWrapper>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] mb-12 md:mb-16">
              See how much you can make:
            </h2>
          </SectionWrapper>
          <SectionWrapper delay={150}>
            <EarningsCalculator />
          </SectionWrapper>
        </div>
      </section>

      {/* ===== 10. INTEGRATIONS GRID ===== */}
      <section className="py-24 md:py-36">
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
      <section className="py-24 md:py-36">
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
                <div className="flex gap-8 md:gap-16 mb-6">
                  <StatBlock label="More Conversions" value={38} suffix="%" />
                  <div className="w-px bg-white/10 self-stretch hidden md:block" />
                  <StatBlock label="Countries Global Reach" value={179} suffix="+" />
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
      <section className="py-24 md:py-36">
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
                <div className="inline-flex items-center gap-2 bg-[#E8930C]/10 border border-[#E8930C]/20 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#E8930C] animate-pulse" />
                  <span className="text-[#E8930C] text-sm font-medium">99.9% Uptime</span>
                </div>
                <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                  Blazingly Fast
                </h2>
                <p className="text-[#8A8F98] text-[17px] leading-[1.6] mb-8">
                  Linkme loads in a blink. We know time is money. If a page is slow, people leave. Your fans want to see your stuff right away, so Linkme shows it all instantly and keeps them with you.
                </p>
                <div className="flex gap-4">
                  <button className="bg-white text-black text-[15px] font-semibold px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                    Get Started
                  </button>
                  <button className="border border-white/20 text-white text-[15px] font-medium px-6 py-2.5 rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 13. FINAL CTA SECTION ===== */}
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionWrapper>
            <div className="rounded-[20px] overflow-hidden relative border border-white/[0.08]">
              <div className="flex flex-col lg:flex-row min-h-[500px]">
                <div className="absolute inset-0 overflow-hidden">
                  <img src={CREATOR_CTA_BG} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
                </div>

                <div className="relative z-10 lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    Global Icons<br />Choose Linkme
                  </h2>
                  <p className="text-white/70 text-base leading-[1.6] max-w-[500px] mb-8">
                    See why creators, entrepreneurs, and brands around the world rely on LinkMe to deliver instant access, seamless sharing, and unmatched performance, no matter the audience size.
                  </p>
                  <UrlInputBar />
                </div>

                <div className="relative z-10 lg:w-[45%] flex items-center justify-center p-8 animate-float-slow">
                  <CTAPhoneMockup />
                </div>
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
    <div className="relative">
      <div className="w-64 md:w-72 bg-[#1A1A1A] rounded-[2rem] border border-white/10 p-3 shadow-2xl">
        <div className="rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mb-3 flex items-center justify-center text-2xl font-bold">AE</div>
            <h3 className="text-white font-bold text-base">Anthony Edwards</h3>
            <p className="text-white/50 text-xs mb-2">@anthonyedwards</p>
            <div className="flex gap-1.5 mb-3">
              {[
                { bg: '#FFFC00', label: '⚡' },
                { bg: '#1877F2', label: 'f' },
                { bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', label: '📷' },
                { bg: '#000', label: '𝕏' },
                { bg: '#000', label: '♪' },
                { bg: '#FF0000', label: '▶' },
                { bg: '#000', label: '◎' },
                { bg: 'linear-gradient(135deg, #F472B6, #FB923C)', label: 'me' },
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] text-white font-bold"
                  style={{ background: icon.bg }}
                >
                  {icon.label}
                </div>
              ))}
            </div>
            <p className="text-white text-xs mb-1">7.5M Total Followers <ChevronDown className="w-3 h-3 inline" /></p>
            <p className="text-white/50 text-[10px] tracking-wider mb-3">LOCK IN WITH ME</p>
            <div className="w-full bg-white/10 rounded-lg p-2 flex items-center gap-2 mb-3">
              <span className="text-white/30 text-xs flex-1">your@email.com</span>
              <button className="bg-blue-500 text-white text-[9px] font-semibold px-2.5 py-1 rounded">Connect with</button>
            </div>
            <div className="w-full h-28 bg-white/5 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10">
                <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
              </div>
              <div className="absolute bottom-1 left-2 text-white/40 text-[8px]">Epilogue | Year Five with Anthon...</div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating photo cards */}
      {[
        { className: 'absolute -top-4 -right-8 w-16 h-16', bg: 'from-red-500 to-orange-500', delay: '0.3s' },
        { className: 'absolute top-1/3 -right-14 w-12 h-12', bg: 'from-blue-500 to-purple-500', delay: '0.8s' },
        { className: 'absolute bottom-12 -left-10 w-14 h-14', bg: 'from-green-500 to-teal-500', delay: '1.2s' },
      ].map((item, i) => (
        <div
          key={i}
          className={`${item.className} rounded-full bg-gradient-to-br ${item.bg} border-2 border-white/20 animate-bob shadow-lg`}
          style={{ animationDelay: item.delay }}
        />
      ))}
    </div>
  );
}

function CTAPhoneMockup() {
  return (
    <div className="w-48 h-[360px] bg-black/40 backdrop-blur-sm rounded-[2rem] border border-white/10 p-2 overflow-hidden shadow-2xl">
      <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-3">
        <div className="flex flex-col items-center pt-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 mb-2" />
          <div className="text-white text-sm font-bold">Alissa Violet</div>
          <div className="text-white/50 text-[10px]">@alissaviolet</div>
          <div className="flex gap-1.5 mt-2">
            {['📷', '♪', '▶', '𝕏', 'f'].map((s, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[7px] text-white">{s}</div>
            ))}
          </div>
          <div className="text-white text-[10px] mt-2 font-medium">21.9M Total Followers</div>
          <div className="text-white/40 text-[8px] mt-0.5">funnier in person</div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {['Snapchat', 'Youtube', 'Instagram', 'TikTok'].map((platform, i) => (
            <div key={i} className="bg-white/8 rounded-lg h-16 flex items-end p-1.5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
              <span className="text-white/50 text-[7px] relative z-10">{platform}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PeopleMockup() {
  return (
    <div className="absolute inset-x-6 top-14 bottom-4 flex flex-col gap-2">
      <div className="bg-white/8 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shrink-0" />
        <div className="flex-1">
          <div className="h-2 w-20 bg-white/30 rounded" />
          <div className="h-1.5 w-32 bg-white/15 rounded mt-1.5" />
        </div>
      </div>
      <div className="bg-white/8 backdrop-blur-sm rounded-xl p-3">
        <div className="flex gap-2 mb-2">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400/30 to-green-600/30" />
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400/30 to-orange-600/30" />
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400/30 to-blue-600/30" />
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-white/15" />
          ))}
        </div>
        <div className="text-white/40 text-[10px] mt-2 text-center">3.2M Total Followers</div>
      </div>
      <div className="bg-white/8 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
        <div className="h-2 w-12 bg-white/20 rounded" />
        <div className="h-6 w-16 bg-white/15 rounded-lg" />
      </div>
    </div>
  );
}

function BusinessMockup() {
  return (
    <div className="absolute inset-x-6 top-14 bottom-4 flex flex-col gap-3 items-center justify-center">
      <div className="bg-white rounded-xl p-4 shadow-lg w-52">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className="text-black text-sm font-semibold">Revenue</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-black text-sm">Avg. engagement</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-purple-500" />
          <span className="text-black text-sm">Avg. reach</span>
        </div>
        <div className="text-black text-3xl font-bold text-center my-2">38,2%</div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-orange-500" />
          <span className="text-black text-sm">Post frequency</span>
        </div>
        <div className="w-full h-1 bg-green-400 rounded mt-2" />
        <div className="text-gray-500 text-xs text-center mt-1">Medium</div>
      </div>
    </div>
  );
}

function AgenciesMockup() {
  return (
    <div className="absolute inset-x-6 top-14 bottom-4 flex gap-3">
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
          <LinkmeIcon size={16} />
          <span className="text-white text-xs font-semibold">Linkme</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total Sales', value: '1,260' },
            { label: 'Total Revenue', value: '$5,857.60' },
            { label: 'Profile Views', value: '2.9M' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/8 rounded-lg p-2">
              <div className="text-white/40 text-[7px]">{stat.label}</div>
              <div className="text-white font-bold text-[10px]">{stat.value}</div>
              <div className="text-green-400 text-[7px]">↗ +8%</div>
            </div>
          ))}
        </div>
        <div className="bg-white/8 rounded-xl p-2">
          <div className="text-white/40 text-[8px] mb-1">Top Locations</div>
          {['Miami', 'Los Angeles', 'Paris', 'San Francisco'].map((city, i) => (
            <div key={i} className="text-white/60 text-[8px]">{i + 1}. {city}</div>
          ))}
        </div>
      </div>
      <div className="w-24 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-white/20 text-[8px] text-center p-2">North America<br />Map View</div>
      </div>
    </div>
  );
}

function MerchCard() {
  return (
    <div className="card-navy-teal overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div className="h-[450px] md:h-[500px] relative p-6 md:p-10 flex items-center justify-center">
        {/* T-shirt thumbnails */}
        <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {[
            { bg: '#f5f5f5', border: 'border-white/40' },
            { bg: '#333', border: 'border-white/10' },
            { bg: '#555', border: 'border-white/10' },
            { bg: '#222', border: 'border-white/10' },
            { bg: '#1a1a6e', border: 'border-white/10' },
            { bg: '#2563eb', border: 'border-white/10' },
            { bg: '#1e40af', border: 'border-white/10' },
          ].map((item, i) => (
            <div
              key={i}
              className={`w-11 h-11 md:w-12 md:h-12 rounded-lg ${item.border} border flex items-center justify-center overflow-hidden`}
              style={{ background: item.bg }}
            >
              <span className="text-base md:text-lg opacity-80">👕</span>
            </div>
          ))}
        </div>

        {/* Color swatches */}
        <div className="absolute left-20 md:left-28 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full py-3 px-2 flex flex-col items-center gap-2.5 z-10">
          {['#fff', '#1a1a1a', '#555', '#E8930C', '#3B82F6'].map((color, i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: color }} />
          ))}
        </div>

        {/* Hero t-shirt */}
        <div className="relative">
          <div className="w-44 h-44 md:w-56 md:h-56 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="tshirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              {/* T-shirt shape */}
              <path d="M60,30 L40,40 L20,60 L35,70 L50,55 L50,170 L150,170 L150,55 L165,70 L180,60 L160,40 L140,30 L120,35 Q100,45 80,35 Z" fill="url(#tshirtGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Size selector */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full py-3 px-2 flex flex-col items-center gap-2 z-10">
          {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
            <div
              key={size}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${
                size === 'L' ? 'bg-white text-black ring-2 ring-blue-500 shadow-lg' : 'text-white/70 hover:text-white'
              }`}
            >
              {size}
            </div>
          ))}
        </div>

        {/* Generate with AI button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <button className="bg-[#1A1A1A] text-white text-sm font-medium px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
            Generate with AI
          </button>
        </div>
      </div>
      <div className="p-6 md:px-10 pt-4">
        <h3 className="text-white text-xl font-semibold mb-2">Create & Sell Merch</h3>
        <p className="text-[#8A8F98] text-[15px] leading-[1.6]">Sell custom products in minutes through your Linkme profile.</p>
      </div>
    </div>
  );
}

function DigitalProductsCard() {
  return (
    <div className="card-navy-teal overflow-hidden h-full hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div className="h-[420px] relative p-6 overflow-hidden">
        <div className="absolute top-5 left-5 bg-white rounded-xl px-3 py-2 shadow-xl z-10 animate-bob">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <div>
              <div className="text-[9px] text-gray-400 font-medium">Total sales</div>
              <div className="text-black font-bold text-base">1</div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-5 bg-white rounded-xl px-3 py-2 shadow-xl z-10 animate-bob" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-green-500" />
            <div>
              <div className="text-[9px] text-gray-400 font-medium">Total revenue</div>
              <div className="text-black font-bold">$53.02</div>
            </div>
          </div>
        </div>

        {/* Book mockups */}
        <div className="absolute left-5 top-20 w-[140px]">
          <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-lg p-3 shadow-lg">
            <div className="text-blue-700 font-black text-[11px] leading-tight mb-1">HOW TO BREAK THE ALGORITHM</div>
            <div className="text-pink-600 text-[7px] font-bold mt-1">MASTER THE SCIENCE OF ATTENTION.</div>
            <div className="bg-blue-600 text-white text-[7px] text-center py-1 rounded mt-2 font-semibold">DIGITAL VERSION</div>
          </div>
          <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-3 shadow-lg mt-2 opacity-60">
            <div className="text-white font-bold text-[9px]">The Creator's Blueprint for Explosive Reach</div>
            <div className="bg-green-700 text-white text-[7px] text-center py-1 rounded mt-2">DOWNLOAD EBOOK</div>
          </div>
        </div>

        {/* Product info */}
        <div className="absolute right-5 top-24 w-[180px]">
          <h4 className="text-white font-bold text-sm mb-1.5">Built to Break the Algorithm</h4>
          <p className="text-[#8A8F98] text-[11px] leading-relaxed mb-2">Learn how to craft content that stops the scroll, grabs attention, and spreads fast.</p>
          <p className="text-[#E8930C] font-bold text-base mb-3">$49.99</p>
          <div className="flex gap-2">
            <button className="bg-white text-black text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow">Buy ebook</button>
            <button className="border border-white/20 text-white text-[11px] px-3 py-1.5 rounded-lg">Preview</button>
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <h3 className="text-white text-xl font-semibold mb-2">Sell Digital Products</h3>
        <p className="text-[#8A8F98] text-[15px] leading-[1.6]">Create and sell digital products through your Linkme profile.</p>
      </div>
    </div>
  );
}

function PaywallCard() {
  return (
    <div className="card-navy-teal overflow-hidden h-full hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div className="h-[420px] relative p-6 overflow-hidden">
        <div className="absolute top-4 right-5 bg-white rounded-xl px-3 py-2 shadow-xl z-10 animate-bob">
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-green-500" />
            <div>
              <div className="text-[9px] text-gray-400 font-medium">Total revenue</div>
              <div className="text-black font-bold">$339.99</div>
            </div>
          </div>
        </div>

        {/* Emoji reactions */}
        <div className="absolute left-5 top-16 flex flex-col gap-3 z-10">
          {['💎', '🔥', '💃', '😍', '❤️'].map((emoji, i) => (
            <span key={i} className="text-2xl animate-bob" style={{ animationDelay: `${i * 0.5}s` }}>{emoji}</span>
          ))}
        </div>

        {/* Content preview */}
        <div className="absolute top-12 left-16 right-5 bottom-5 bg-white/8 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
          <div className="w-full h-full bg-gradient-to-b from-teal-500/30 to-teal-700/30 flex flex-col items-center justify-center p-4">
            <div className="w-20 h-20 rounded-full bg-white/10 mb-3 flex items-center justify-center">
              <span className="text-3xl">💃</span>
            </div>
            <h4 className="text-white font-bold text-lg mb-4">Behind The Scenes</h4>
            <div className="bg-white rounded-lg px-5 py-2.5 flex items-center gap-2 shadow-lg">
              <span className="text-black text-sm font-medium">Pay with</span>
              <span className="text-black font-bold text-sm"> Pay</span>
            </div>
            <p className="text-[#E8930C] font-bold text-base mt-3">$4.99</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <h3 className="text-white text-xl font-semibold mb-2">Paywall Content</h3>
        <p className="text-[#8A8F98] text-[15px] leading-[1.6]">Share exclusive content and get paid through your Linkme profile.</p>
      </div>
    </div>
  );
}

function EmailMarketingMockup() {
  return (
    <div className="p-6 h-full flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 shadow-xl w-56">
        <div className="w-full h-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg mb-3 flex items-center justify-center">
          <div className="flex -space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-white" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-2 border-white" />
          </div>
        </div>
        <div className="text-gray-400 text-[10px] font-medium">Sales driven by marketing</div>
        <div className="text-black font-bold text-2xl mt-0.5">$12,470</div>
        <div className="inline-flex items-center bg-green-50 text-green-600 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1">
          <TrendingUp className="w-3 h-3 mr-0.5" />+21%
        </div>
        <div className="mt-3 h-16 flex items-end gap-[3px]">
          {[30, 45, 35, 55, 40, 60, 50, 70, 65, 80, 75, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t overflow-hidden" style={{ height: `${h}%` }}>
              <div className="w-full h-full bg-gradient-to-t from-green-500 to-green-300 opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectTipsMockup() {
  return (
    <div className="h-full relative overflow-hidden">
      <img src={FEMALE_CREATOR} alt="Creator" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B1926] via-[#0B1926]/80 to-transparent h-1/2" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl p-4 shadow-xl w-52">
        <div className="flex justify-center gap-4 mb-3">
          <button className="w-10 h-10 rounded-full bg-gray-50 text-lg hover:scale-110 transition-transform">😊</button>
          <button className="w-10 h-10 rounded-full bg-gray-50 text-lg hover:scale-110 transition-transform">😍</button>
        </div>
        <div className="h-1 bg-gray-100 rounded-full" />
      </div>
    </div>
  );
}

function CourseBuilderMockup() {
  return (
    <div className="p-6 h-full flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 shadow-xl w-56">
        <div className="w-full h-20 bg-gradient-to-br from-pink-50 to-yellow-50 rounded-lg mb-3" />
        <h4 className="text-black font-bold text-sm">Viral Growth Masterclass</h4>
        <p className="text-gray-400 text-[10px] mt-1 leading-relaxed">Learn the proven strategies to explode your reach and go viral as a content creator.</p>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-black font-bold text-sm">$99.99</span>
          <span className="text-yellow-500 text-xs font-medium">★ 4.8</span>
          <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1.5 py-0.5 rounded">50% OFF</span>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-black text-white text-[10px] font-semibold py-2 rounded-lg">Get Started</button>
          <button className="flex-1 border border-gray-200 text-gray-500 text-[10px] py-2 rounded-lg">Preview</button>
        </div>
      </div>
    </div>
  );
}

function DashboardCard() {
  return (
    <div className="card-navy-teal overflow-hidden h-full hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div className="h-[420px] relative p-6 overflow-hidden bg-gradient-to-br from-[#0B1926] to-[#0F2840]">
        <div className="bg-[#111827] rounded-xl p-5 shadow-2xl max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <LinkmeIcon size={20} />
            <span className="text-white text-sm font-semibold">Linkme</span>
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
    <div className="card-navy-teal overflow-hidden h-full hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
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
                    <div className="text-white text-[10px] font-semibold">Linkme</div>
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

      {/* Floating avatars */}
      {[
        { top: '-10px', right: '-10px', bg: 'from-blue-400 to-cyan-500', delay: '0s' },
        { top: '35%', right: '-24px', bg: 'from-red-400 to-pink-500', delay: '0.7s' },
        { bottom: '25%', left: '-16px', bg: 'from-green-400 to-emerald-500', delay: '1.4s' },
        { bottom: '-8px', left: '25%', bg: 'from-purple-400 to-violet-500', delay: '2.1s' },
        { top: '15%', left: '-20px', bg: 'from-amber-400 to-orange-500', delay: '0.3s' },
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 rounded-full bg-gradient-to-br ${pos.bg} border-2 border-[#0A0A0A] shadow-lg animate-bob`}
          style={{ top: pos.top, right: pos.right, bottom: pos.bottom, left: pos.left, animationDelay: pos.delay } as React.CSSProperties}
        />
      ))}
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
