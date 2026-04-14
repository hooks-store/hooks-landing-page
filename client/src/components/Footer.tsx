import { HooksLogo } from './HooksIcon';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  { name: 'Twitter', icon: '𝕏' },
  { name: 'Instagram', icon: '◎' },
  { name: 'TikTok', icon: '♪' },
  { name: 'YouTube', icon: '▶' },
];

export default function Footer() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  const copy = {
    brandSentence: isSpanish
      ? 'Hooks es la plataforma para creadores que quieren vender, crecer y monetizar desde un solo link.'
      : 'The creator economy platform behind it all.',
    columns: isSpanish
      ? [
          {
            title: 'Producto',
            links: ['Características', 'Precios', 'Plantillas', 'Integraciones', 'Herramientas para creadores'],
          },
          {
            title: 'Empresa',
            links: ['Quiénes somos', 'Empleos', 'Prensa', 'Blog', 'Contacto'],
          },
          {
            title: 'Recursos',
            links: ['Centro de ayuda', 'Comunidad', 'Tutoriales', 'Documentación API', 'Estado'],
          },
          {
            title: 'Legal',
            links: ['Política de privacidad', 'Términos de servicio', 'Política de cookies', 'DMCA', 'Accesibilidad'],
          },
        ]
      : [
          {
            title: 'People',
            links: ['Features', 'Pricing', 'Templates', 'Integrations', 'Creator Tools'],
          },
          {
            title: 'Company',
            links: ['About', 'Careers', 'Press', 'Blog', 'Contact'],
          },
          {
            title: 'Resources',
            links: ['Help Center', 'Community', 'Tutorials', 'API Docs', 'Status'],
          },
          {
            title: 'Legal',
            links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'DMCA', 'Accessibility'],
          },
        ],
    rightsReserved: isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.',
    legalShort: isSpanish ? ['Privacidad', 'Términos', 'Cookies'] : ['Privacy', 'Terms', 'Cookies'],
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06] pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <HooksLogo />
            <p className="text-[#8A8F98] text-sm mt-4 max-w-[200px] leading-relaxed">
              {copy.brandSentence}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#8A8F98] text-xs hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-110"
                  title={social.name}
                >
                  {social.icon}
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
                    <a
                      href="#"
                      className="text-[#8A8F98] text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8A8F98] text-sm">&copy; {new Date().getFullYear()} Hooks. {copy.rightsReserved}</p>
          <div className="flex gap-6">
            {copy.legalShort.map((item) => (
              <a key={item} href="#" className="text-[#8A8F98] text-xs hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
