import { useEffect, useState } from 'react';
import { HooksIcon } from './HooksIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLoginUrl } from '@/const';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const navItems: string[] = [];
  const loginUrl = getLoginUrl();

  const copy = {
    login: isSpanish ? 'Iniciar sesión' : 'Log In',
    mobileLogin: isSpanish ? 'Iniciar sesión' : 'Log In',
    primaryCta: isSpanish ? 'Crear gratis' : 'Start for free',
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[74px] transition-[border-color,backdrop-filter] duration-300"
        style={{
          background: '#000',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="container h-full flex items-center justify-between px-4 sm:px-10 md:justify-start md:gap-14 lg:gap-20 lg:px-20">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <HooksIcon size={36} />
            <span className="text-white text-[24px] sm:text-[28px] font-bold tracking-[-0.02em] leading-none max-[370px]:hidden">Hooks</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white text-[21px] font-semibold opacity-90 hover:opacity-100 transition-opacity leading-none"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6 ml-auto">
            <a
              href={loginUrl}
              className="button-shine button-shine-login inline-flex items-center rounded text-[15px] font-medium opacity-85 hover:opacity-100 transition-opacity duration-200"
            >
              {copy.login}
            </a>
            <a
              href={loginUrl}
              className="button-shine button-shine-primary inline-flex items-center justify-center bg-white text-black text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-[background,color,box-shadow,transform] duration-200"
            >
              {copy.primaryCta}
            </a>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden ml-3 flex min-w-0 flex-1 items-center justify-end gap-1.5 min-[375px]:gap-2">
            <a
              href={loginUrl}
              className="button-shine button-shine-outline group min-w-0 rounded-full bg-white p-px active:scale-[0.98] hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] active:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] focus-visible:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] focus-visible:outline-none transition-[background,transform] duration-200"
            >
              <span className="flex h-8 min-w-0 items-center justify-center rounded-full bg-black px-2 min-[360px]:px-2.5 min-[400px]:h-9 min-[400px]:px-3">
                <span className="block truncate text-white text-[10.5px] min-[360px]:text-[11px] min-[400px]:text-[13px] font-semibold leading-none transition-colors duration-200 group-hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] group-hover:bg-clip-text group-hover:text-transparent group-active:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] group-active:bg-clip-text group-active:text-transparent group-focus-visible:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] group-focus-visible:bg-clip-text group-focus-visible:text-transparent">
                  {copy.mobileLogin}
                </span>
              </span>
            </a>
            <a
              href={loginUrl}
              className="button-shine button-shine-primary flex h-8 min-w-0 items-center justify-center truncate rounded-full bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] px-2.5 text-[10.5px] font-semibold leading-none text-white active:scale-[0.98] transition-transform duration-200 min-[360px]:px-3 min-[360px]:text-[11px] min-[400px]:h-9 min-[400px]:px-4 min-[400px]:text-[13px]"
            >
              {copy.primaryCta}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
