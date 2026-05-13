import { HooksLogo } from './HooksIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hooks_crea?igsh=cncwYmx0amtqdGJ',
    icon: '/images/icons/instagram-glyph-white.svg',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@tradingsharksoficial?_r=1&_t=ZN-95kiUln8K5C',
    icon: '/images/icons/tiktok-social-icon-circle-black.svg',
  },
];

type FooterColumn = {
  title: string;
  links: string[];
};

type FooterLegalLink = {
  label: string;
  href: string;
};

export default function Footer() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const contactEmail = isSpanish ? 'equipo@hooks.store' : 'support@hooks.store';

  const copy = {
    brandSentence: isSpanish
      ? 'Hooks es la plataforma para creadores que quieren vender, crecer y monetizar desde un solo link.'
      : 'The creator economy platform behind it all.',
    columns: (isSpanish
      ? [
          // {
          //   title: 'Producto',
          //   links: ['Características', 'Herramientas para creadores'],
          // },
          // {
          //   title: 'Empresa',
          //   links: ['Quiénes somos', 'Contacto'],
          // },
          // {
          //   title: 'Recursos',
          //   links: ['Centro de ayuda', 'Comunidad'],
          // },
          // {
          //   title: 'Legal',
          //   links: ['Política de privacidad', 'Términos de servicio', 'Política de cookies'],
          // },
        ]
      : [
          // {
          //   title: 'People',
          //   links: ['Features', 'Pricing', 'Templates', 'Integrations', 'Creator Tools'],
          // },
          // {
          //   title: 'Company',
          //   links: ['About', 'Careers', 'Press', 'Blog', 'Contact'],
          // },
          // {
          //   title: 'Resources',
          //   links: ['Help Center', 'Community', 'Tutorials', 'API Docs', 'Status'],
          // },
          // {
          //   title: 'Legal',
          //   links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'DMCA', 'Accessibility'],
          // },
        ]) as FooterColumn[],
    rightsReserved: isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.',
    contactLabel: isSpanish ? 'Contacto' : 'Contact',
    legalShort: (isSpanish
      ? [
          { label: 'Privacidad', href: '/privacy' },
          { label: 'Términos', href: '/terms' },
          { label: 'FAQs', href: '/faqs' },
        ]
      : [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
          { label: 'FAQs', href: '/faqs' },
        ]) as FooterLegalLink[],
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06] pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-5 md:gap-12 md:text-left">
          <div className="col-span-1 mx-auto flex flex-col items-center sm:col-span-2 md:col-span-1 md:mx-0 md:items-start">
            <HooksLogo />
            <p className="text-[#8A8F98] text-sm mt-4 max-w-[200px] leading-relaxed">
              {copy.brandSentence}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-[#8A8F98] text-sm mt-4 inline-block hover:text-white transition-colors"
            >
              {copy.contactLabel}: {contactEmail}
            </a>
            {/* Social icons */}
            <div className="flex justify-center gap-3 mt-6 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#8A8F98] text-xs hover:bg-white/10 hover:text-white hover:border-white/20 transition-[background-color,border-color,color,transform] duration-200 hover:scale-110"
                  title={social.name}
                  aria-label={social.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={social.icon} alt="" className="h-4 w-4 object-contain" />
                </a>
              ))}
            </div>
          </div>
          {copy.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-[#8A8F98] text-sm inline-block">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[#8A8F98] text-sm text-center md:text-left">&copy; {new Date().getFullYear()} Hooks. {copy.rightsReserved}</p>
          <div className="flex flex-wrap justify-center gap-6">
            {copy.legalShort.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#8A8F98] text-xs transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
