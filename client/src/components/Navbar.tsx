import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HooksIcon } from './HooksIcon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const navItems: string[] = [];

  const copy = {
    login: isSpanish ? 'Iniciar sesión' : 'Log In',
    primaryCta: isSpanish ? 'Crear gratis' : 'Start for free',
    toggleMenuAria: isSpanish ? 'Abrir o cerrar menú' : 'Toggle menu',
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background: '#000',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="container h-full flex items-center justify-between md:justify-start md:gap-14 lg:gap-20">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <HooksIcon size={36} />
            <span className="text-white text-[24px] sm:text-[28px] font-bold tracking-[-0.02em] leading-none">Hooks</span>
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
            <a href="#" className="text-white text-[15px] font-medium opacity-85 hover:opacity-100 hover:text-[#D94B78] transition-opacity">{copy.login}</a>
            <button className="bg-white text-black text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              {copy.primaryCta}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={copy.toggleMenuAria}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute right-0 top-16 h-[calc(100vh-64px)] w-full max-w-72 bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-white/[0.06] p-8 flex flex-col gap-6 transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item, i) => (
            <a
              key={item}
              href="#"
              className="text-white text-lg font-medium hover:text-[#E8930C] transition-all duration-300"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.3s ease-out ${0.1 + i * 0.05}s`,
              }}
            >
              {item}
            </a>
          ))}
          <div className="mt-auto pt-6 border-t border-white/[0.08] flex flex-col gap-3">
            <a href="#" className="text-white text-[15px] font-medium opacity-85 hover:opacity-100 hover:text-[#D94B78] transition-opacity">
              {copy.login}
            </a>
            <button className="bg-white text-black text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-[linear-gradient(135deg,_#FF6A4A_0%,_#E94A6A_50%,_#5A4BFF_100%)] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              {copy.primaryCta}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
