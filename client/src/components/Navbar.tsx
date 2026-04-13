import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LinkmeIcon } from './LinkmeIcon';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ['Características', 'Testimonios', 'Precios'];

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
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0.4)',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="container h-full flex items-center justify-between md:justify-start md:gap-14 lg:gap-20">
          <div className="flex items-center gap-3">
            <LinkmeIcon size={40} />
            <span className="text-white text-[28px] font-bold tracking-[-0.02em] leading-none">Hooks</span>
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
            <a href="#" className="text-white text-[15px] font-medium opacity-85 hover:opacity-100 transition-opacity">Log In</a>
            <button className="bg-white text-black text-[15px] font-semibold px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              Start for free
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
          className={`absolute right-0 top-16 w-72 h-[calc(100vh-64px)] bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-white/[0.06] p-8 flex flex-col gap-6 transition-transform duration-300 ease-out ${
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
        </div>
      </div>
    </>
  );
}
