import { useEffect, useState } from 'react';
import { HooksIcon } from './HooksIcon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UrlInputBar() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const defaultSlug = isSpanish ? 'tu-nombre' : 'your-name';
  const [slug, setSlug] = useState(defaultSlug);

  useEffect(() => {
    setSlug((currentSlug) => {
      const isDefaultSlug = currentSlug === 'tu-nombre' || currentSlug === 'your-name' || currentSlug === '';
      return isDefaultSlug ? defaultSlug : currentSlug;
    });
  }, [defaultSlug]);

  const handleFocus = () => {
    if (slug === defaultSlug) {
      setSlug('');
    }
  };

  return (
    <div className="flex flex-nowrap items-center bg-white rounded-full h-14 max-w-[480px] w-full pl-2.5 pr-1.5 sm:pl-4 gap-1.5 sm:gap-3 shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-shadow duration-500">
      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-1 basis-0 min-w-0">
        <HooksIcon size={20} />
        <span className="text-gray-400 text-[13px] sm:text-base select-none shrink-0 whitespace-nowrap">hooks.store/</span>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onFocus={handleFocus}
          className={`bg-transparent text-[13px] sm:text-base flex-1 min-w-0 outline-none ${slug === defaultSlug ? 'text-gray-400' : 'text-gray-900'}`}
          aria-label={isSpanish ? 'Tu enlace de Hooks' : 'Your Hooks link'}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <button className="shrink-0 bg-black text-white text-[13px] sm:text-base font-semibold px-4 sm:px-5 py-2.5 rounded-full hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap">
        {isSpanish ? 'Crear gratis' : 'Start for free'}
      </button>
    </div>
  );
}
