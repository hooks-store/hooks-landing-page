import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage, type SupportedLocale } from "@/contexts/LanguageContext";
import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

const PLAN_PRICE_CENTS = 1499;
const STANDARD_RATE_PERCENT = 25;
const FOUNDING_RATE_PERCENT = 35;
const COOKIE_DAYS = 90;
const PAYOUT_THRESHOLD_CENTS = 5000;
const FOUNDING_SLOTS = 15;
const FOUNDING_BONUS_CENTS = 25000;
const EARNINGS_REFERRAL_COUNTS = [10, 25, 100, 250];
// Commission accrues per invoice, so each month's amount is rounded to whole cents.
const MONTHLY_COMMISSION_CENTS = Math.round((PLAN_PRICE_CENTS * STANDARD_RATE_PERCENT) / 100);

const EYEBROW_CLASS = "mb-3 text-base font-semibold text-[#FF624F]";
const SECTION_TITLE_CLASS =
  "text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-balance sm:text-[40px]";
const SPLIT_GRID_CLASS = "grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16";
const CTA_CLASS =
  "button-shine button-shine-primary button-gradient-cta inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold leading-tight text-black transition-[background,color,box-shadow,scale] duration-200 sm:w-auto sm:text-[16px]";
const TABLE_CELL_CLASS = "px-3 py-4 text-right text-[14px] sm:px-6 sm:py-5 sm:text-base";

function formatUsd(cents: number, locale: SupportedLocale) {
  const amount = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(cents / 100);

  return `$${amount}`;
}

type Stat = { value: string; label: string };

type PartnerCopy = {
  applyEmail: string;
  applyBody: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    applySubject: string;
    stats: Stat[];
  };
  earnings: {
    eyebrow: string;
    title: string;
    body: string;
    headers: string[];
    footnote: string;
  };
  terms: {
    eyebrow: string;
    title: string;
    rows: { label: string; value: string }[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  fit: {
    eyebrow: string;
    title: string;
    bestTitle: string;
    best: string[];
    poorTitle: string;
    poor: string[];
  };
  founding: {
    title: string;
    stats: Stat[];
    paragraphs: string[];
    closing: string;
    cta: string;
    applySubject: string;
  };
};

const PARTNER_COPY: Record<SupportedLocale, PartnerCopy> = {
  es: {
    applyEmail: "equipo@hooks.store",
    applyBody:
      "Nombre:\nSitio web o canales:\nQuién es tu audiencia:\nCómo piensas promocionar Hooks:\n",
    hero: {
      eyebrow: "Programa de afiliados de Hooks",
      title: "Cobra cada mes que tus referidos sigan creando.",
      body: `Hooks te paga el ${STANDARD_RATE_PERCENT}% de los ingresos por suscripción de cada cuenta que refieras, cada mes y durante toda la vida de esa cuenta. Cookie de ${COOKIE_DAYS} días. Sin topes, sin niveles que escalar y sin audiencia mínima.`,
      cta: "Solicita unirte al programa",
      applySubject: "Solicitud para el programa de afiliados",
      stats: [
        { value: `${STANDARD_RATE_PERCENT}%`, label: "Comisión recurrente" },
        { value: "De por vida", label: "En cada cuenta referida" },
        { value: `${COOKIE_DAYS} días`, label: "Cookie de último clic" },
      ],
    },
    earnings: {
      eyebrow: "Los números",
      title: "Lo que realmente ganas",
      body: `Con el plan de ${formatUsd(PLAN_PRICE_CENTS, "es")} al mes y un ${STANDARD_RATE_PERCENT}% de comisión, cada referido activo te genera ${formatUsd(MONTHLY_COMMISSION_CENTS, "es")} al mes durante todo el tiempo que se quede. Y se acumula, porque los referidos del mes pasado te siguen pagando este mes.`,
      headers: ["Referidos activos", "Al mes", "Al año", "En tres años"],
      footnote: `Calculado a ${formatUsd(PLAN_PRICE_CENTS, "es")} al mes. Las cifras suponen que las cuentas siguen activas.`,
    },
    terms: {
      eyebrow: "Las condiciones",
      title: "Todas las condiciones, por escrito",
      rows: [
        { label: "Comisión", value: `${STANDARD_RATE_PERCENT}% de los ingresos por suscripción` },
        { label: "Duración", value: "Toda la vida de la cuenta. Sin límite de 12 meses." },
        {
          label: "Ventana de cookie",
          value: `${COOKIE_DAYS} días, último clic. Se mantiene durante la prueba gratuita.`,
        },
        { label: "Cuándo se genera la comisión", value: "Con el primer pago de la cuenta referida" },
        { label: "Mínimo para cobrar", value: formatUsd(PAYOUT_THRESHOLD_CENTS, "es") },
        {
          label: "Calendario de pagos",
          value: "Net 30, una vez cerrado el periodo de reembolso de 30 días",
        },
        { label: "Métodos de pago", value: "PayPal, transferencia bancaria" },
        { label: "Autorreferidos", value: "No son elegibles" },
        {
          label: "Puja por la marca",
          value: 'No se permite pujar por "Hooks" ni por variantes cercanas',
        },
        {
          label: "Combinar cupones",
          value: "No permitido. Los códigos de afiliado no se combinan con otras ofertas.",
        },
        { label: "Aprobación", value: "Manual, normalmente en un día hábil" },
      ],
    },
    benefits: {
      eyebrow: "Herramientas y soporte",
      title: "Lo que recibes",
      items: [
        {
          title: "Un panel en tiempo real",
          body: "Clics, registros, pruebas, conversiones, MRR activo y comisiones pendientes frente a pagadas. Sin esperar a un correo mensual.",
        },
        {
          title: "Links directos a cualquier página",
          body: "Y tu propio código de cupón, si lo quieres.",
        },
        {
          title: "Una cuenta gratuita con todo desbloqueado",
          body: "Para que reseñes el producto con honestidad y no a partir de capturas.",
        },
        {
          title: "Recursos de marca, imágenes del producto y grabaciones de pantalla",
          body: "Libres para usar en tu contenido.",
        },
        {
          title: "Contacto directo con una persona",
          body: "No una bandeja de entrada compartida. Pide una tarifa personalizada, una landing o datos, y tendrás una respuesta real.",
        },
      ],
    },
    fit: {
      eyebrow: "Audiencia ideal",
      title: "Para quién convierte",
      bestTitle: "Convierte mejor si escribes para",
      best: [
        "Creadores que quieren cobrar: vendedores de cursos, autores de newsletters, coaches y creadores de video corto que están montando su tienda",
        "Audiencias que ya buscan herramientas de monetización, link en bio o cobros para creadores",
        'Comparativas y contenido tipo "cómo cobrar como creador", donde la intención es alta y el lector está a mitad de su decisión',
      ],
      poorTitle: "Convierte poco para",
      poor: [
        "Audiencias generales de negocios o productividad sin relación con creadores",
        "Tráfico de parte alta del embudo sin intención de monetizar",
      ],
    },
    founding: {
      title: "Afiliados fundadores",
      stats: [
        {
          value: `${FOUNDING_RATE_PERCENT}%`,
          label: `De por vida, en lugar del ${STANDARD_RATE_PERCENT}%`,
        },
        {
          value: formatUsd(FOUNDING_BONUS_CENTS, "es"),
          label: "Cuando convierta tu tercer referido",
        },
        { value: `${FOUNDING_SLOTS}`, label: "Plazas, y luego la oferta se cierra" },
      ],
      paragraphs: [
        "Te lo decimos claro: el programa es nuevo y todavía no hemos pagado mucho. Preferimos decirlo ahora a que lo descubras después.",
        `Por eso, los primeros ${FOUNDING_SLOTS} afiliados reciben condiciones que no volveremos a ofrecer: ${FOUNDING_RATE_PERCENT}% de por vida en lugar del ${STANDARD_RATE_PERCENT}%, fijado a tu cuenta para siempre, más ${formatUsd(FOUNDING_BONUS_CENTS, "es")} cuando conviertas a tu tercer referido. Esa tarifa sigue siendo tuya, hagamos lo que hagamos después con el programa estándar.`,
      ],
      closing: "Te sumas a un programa sin historial. La tarifa es lo que recibes a cambio.",
      cta: "Reserva tu plaza de fundador",
      applySubject: "Solicitud de afiliado fundador",
    },
  },
  en: {
    applyEmail: "support@hooks.store",
    applyBody:
      "Name:\nWebsite or channels:\nWho your audience is:\nHow you plan to promote Hooks:\n",
    hero: {
      eyebrow: "Hooks Partner Program",
      title: "Get paid every month your referrals keep creating.",
      body: `Hooks pays ${STANDARD_RATE_PERCENT}% of subscription revenue on every account you refer, recurring for the lifetime of that account. ${COOKIE_DAYS}-day cookie. No caps, no tiers to climb, no minimum audience.`,
      cta: "Apply to the partner program",
      applySubject: "Partner program application",
      stats: [
        { value: `${STANDARD_RATE_PERCENT}%`, label: "Recurring commission" },
        { value: "Lifetime", label: "On every referred account" },
        { value: `${COOKIE_DAYS} days`, label: "Last-click cookie" },
      ],
    },
    earnings: {
      eyebrow: "The arithmetic",
      title: "What this actually pays",
      body: `On the ${formatUsd(PLAN_PRICE_CENTS, "en")}/month plan at ${STANDARD_RATE_PERCENT}%, every active referral pays you ${formatUsd(MONTHLY_COMMISSION_CENTS, "en")} a month for as long as they stay. That compounds, because last month's referrals are still paying this month.`,
      headers: ["Active referrals", "Per month", "Per year", "Over three years"],
      footnote: `Worked at ${formatUsd(PLAN_PRICE_CENTS, "en")}/month. Figures assume accounts stay active.`,
    },
    terms: {
      eyebrow: "The terms",
      title: "Every term, stated",
      rows: [
        { label: "Commission", value: `${STANDARD_RATE_PERCENT}% of subscription revenue` },
        { label: "Duration", value: "Lifetime of the account. Not capped at 12 months." },
        {
          label: "Cookie window",
          value: `${COOKIE_DAYS} days, last click. Survives a free trial.`,
        },
        { label: "Commission triggers", value: "On the referred account's first payment" },
        { label: "Payout threshold", value: formatUsd(PAYOUT_THRESHOLD_CENTS, "en") },
        { label: "Payout schedule", value: "Net 30, after the 30-day refund window closes" },
        { label: "Payout methods", value: "PayPal, bank transfer" },
        { label: "Self-referrals", value: "Not eligible" },
        { label: "Brand bidding", value: 'Not permitted on "Hooks" or close variants' },
        {
          label: "Coupon stacking",
          value: "Not permitted. Partner codes can't be combined with other offers.",
        },
        { label: "Approval", value: "Manual, usually within one business day" },
      ],
    },
    benefits: {
      eyebrow: "Tools and support",
      title: "What you get",
      items: [
        {
          title: "A real-time dashboard",
          body: "Clicks, signups, trials, conversions, active MRR, and pending versus paid commission. No waiting for a monthly email.",
        },
        {
          title: "Deep links to any page",
          body: "Plus your own coupon code if you want one.",
        },
        {
          title: "A free account with everything unlocked",
          body: "So you can review the product honestly rather than from screenshots.",
        },
        {
          title: "Brand assets, product shots and screen recordings",
          body: "Free to use in your content.",
        },
        {
          title: "A direct line to a person",
          body: "Not a shared inbox. Ask for a custom rate, a landing page or data and you'll get an actual answer.",
        },
      ],
    },
    fit: {
      eyebrow: "Audience fit",
      title: "Who it converts for",
      bestTitle: "Converts best if you write for",
      best: [
        "Creators trying to get paid: course sellers, newsletter operators, coaches, short-form creators building a storefront",
        "Audiences already shopping for creator monetization, link-in-bio or payout tooling",
        'Comparison and "how to get paid as a creator" content, where intent is high and the reader is mid-decision',
      ],
      poorTitle: "Converts poorly for",
      poor: [
        "General business or productivity audiences with no creator overlap",
        "Pure top-of-funnel traffic with no monetization intent",
      ],
    },
    founding: {
      title: "Founding partners",
      stats: [
        {
          value: `${FOUNDING_RATE_PERCENT}%`,
          label: `For life, instead of ${STANDARD_RATE_PERCENT}%`,
        },
        {
          value: formatUsd(FOUNDING_BONUS_CENTS, "en"),
          label: "When your third referral converts",
        },
        { value: `${FOUNDING_SLOTS}`, label: "Slots, then the offer closes" },
      ],
      paragraphs: [
        "Straight answer on where this program is: it's new, and we haven't paid out much yet. We'd rather say that than let you find out later.",
        `So the first ${FOUNDING_SLOTS} partners get terms we won't offer again: ${FOUNDING_RATE_PERCENT}% for life instead of ${STANDARD_RATE_PERCENT}%, locked to your account permanently, plus ${formatUsd(FOUNDING_BONUS_CENTS, "en")} once you've converted your third referral. That rate stays yours no matter what we do with the standard program later.`,
      ],
      closing: "You're taking a program without a track record. The rate is what you get for that.",
      cta: "Claim a founding slot",
      applySubject: "Founding partner application",
    },
  },
};

function StatList({ stats, className = "" }: { stats: Stat[]; className?: string }) {
  return (
    <ul className={`border-t border-white/[0.08] sm:grid sm:grid-cols-3 sm:gap-6 ${className}`}>
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="flex items-baseline justify-between gap-4 border-b border-white/[0.08] py-4 sm:block sm:border-b-0 sm:pt-6 sm:pb-0"
        >
          <p className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px] md:text-[32px] lg:text-[40px]">
            {stat.value}
          </p>
          <p className="text-right text-[13px] leading-5 text-[#8A8F98] sm:mt-2 sm:text-left sm:text-sm">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

function PartnerSection({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="container pb-16 md:pb-24">
      <div className={`border-t border-white/[0.08] pt-12 md:pt-16 ${SPLIT_GRID_CLASS}`}>
        <div>
          <p className={EYEBROW_CLASS}>{eyebrow}</p>
          <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
          {intro ? (
            <p className="mt-5 max-w-[480px] text-base leading-[1.65] text-[#8A8F98]">{intro}</p>
          ) : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default function Partners() {
  const { locale } = useLanguage();
  const copy = PARTNER_COPY[locale];
  const getApplyHref = (subject: string) =>
    `mailto:${copy.applyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(copy.applyBody)}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main>
        <section className="container pt-36 pb-16 sm:pt-44 md:pb-24">
          <div className="max-w-[920px]">
            <p className={EYEBROW_CLASS}>{copy.hero.eyebrow}</p>
            <h1 className="text-[36px] font-bold leading-[1.06] tracking-[-0.02em] text-balance sm:text-[52px] md:text-[64px] lg:text-[72px]">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-[640px] text-base leading-[1.6] text-[#C8CDD4] md:text-[18px]">
              {copy.hero.body}
            </p>
            <a href={getApplyHref(copy.hero.applySubject)} className={`${CTA_CLASS} mt-10`}>
              <span>{copy.hero.cta}</span>
            </a>
            <StatList stats={copy.hero.stats} className="mt-14" />
          </div>
        </section>

        <PartnerSection
          eyebrow={copy.earnings.eyebrow}
          title={copy.earnings.title}
          intro={copy.earnings.body}
        >
          <div className="overflow-x-auto rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full border-collapse text-left tabular-nums">
              <thead>
                <tr>
                  {copy.earnings.headers.map((header, index) => (
                    <th
                      key={header}
                      scope="col"
                      className={`px-3 pt-5 pb-3 text-[12px] font-semibold leading-4 text-[#8A8F98] sm:px-6 sm:text-[13px] ${index === 0 ? "" : "text-right"}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EARNINGS_REFERRAL_COUNTS.map((referrals) => {
                  const monthlyCents = MONTHLY_COMMISSION_CENTS * referrals;

                  return (
                    <tr key={referrals} className="border-t border-white/[0.08]">
                      <th
                        scope="row"
                        className="px-3 py-4 text-[15px] font-semibold text-white sm:px-6 sm:py-5 sm:text-[17px]"
                      >
                        {referrals}
                      </th>
                      <td className={`${TABLE_CELL_CLASS} text-[#C8CDD4]`}>
                        {formatUsd(monthlyCents, locale)}
                      </td>
                      <td className={`${TABLE_CELL_CLASS} text-[#C8CDD4]`}>
                        {formatUsd(monthlyCents * 12, locale)}
                      </td>
                      <td className={`${TABLE_CELL_CLASS} font-semibold text-white`}>
                        {formatUsd(monthlyCents * 36, locale)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#8A8F98]">{copy.earnings.footnote}</p>
        </PartnerSection>

        <PartnerSection eyebrow={copy.terms.eyebrow} title={copy.terms.title}>
          <dl className="rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
            {copy.terms.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-t border-white/[0.08] px-5 py-4 first:border-t-0 sm:grid-cols-[minmax(0,190px)_minmax(0,1fr)] sm:gap-8 sm:px-6"
              >
                <dt className="text-[15px] font-semibold leading-6 text-white">{row.label}</dt>
                <dd className="text-[15px] leading-6 text-[#C8CDD4]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </PartnerSection>

        <PartnerSection eyebrow={copy.benefits.eyebrow} title={copy.benefits.title}>
          <ul className="divide-y divide-white/[0.08]">
            {copy.benefits.items.map((item) => (
              <li key={item.title} className="py-5 first:pt-0 last:pb-0 sm:py-6">
                <p className="text-[17px] font-semibold leading-snug text-white">{item.title}</p>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-[#8A8F98]">{item.body}</p>
              </li>
            ))}
          </ul>
        </PartnerSection>

        <PartnerSection eyebrow={copy.fit.eyebrow} title={copy.fit.title}>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-[17px] font-semibold text-white">{copy.fit.bestTitle}</h3>
              <ul className="mt-5 space-y-4">
                {copy.fit.best.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-[#C8CDD4]">
                    <Check aria-hidden="true" className="mt-[5px] h-4 w-4 shrink-0 text-[#FF624F]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-white">{copy.fit.poorTitle}</h3>
              <ul className="mt-5 space-y-4">
                {copy.fit.poor.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-[#8A8F98]">
                    <X aria-hidden="true" className="mt-[5px] h-4 w-4 shrink-0 text-[#5C6068]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PartnerSection>

        <section className="container pb-20 md:pb-28">
          <div className="rounded-[20px] border border-white/[0.08] bg-[linear-gradient(180deg,_#0B1926_0%,_#0A0A0A_100%)] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <div className={SPLIT_GRID_CLASS}>
              <h2 className={SECTION_TITLE_CLASS}>{copy.founding.title}</h2>
              <div className="min-w-0">
                <StatList stats={copy.founding.stats} />
                <div className="mt-10 space-y-5 text-base leading-[1.7] text-[#C8CDD4] md:text-[17px]">
                  {copy.founding.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="font-semibold text-white">{copy.founding.closing}</p>
                </div>
                <a
                  href={getApplyHref(copy.founding.applySubject)}
                  className={`${CTA_CLASS} mt-10`}
                >
                  <span>{copy.founding.cta}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
