import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage, type SupportedLocale } from "@/contexts/LanguageContext";
import { Mail, ChevronDown } from "lucide-react";

type DetailItem = {
  title: string;
  description?: string;
};

type FAQBlock =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "orderedDetails"; items: DetailItem[] }
  | { type: "steps"; items: string[] }
  | { type: "commission"; rate: string; caption: string; items: string[] }
  | { type: "example"; title: string; text: string }
  | { type: "timeline"; items: { label: string; text: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; title: string; text: string; tone?: "default" | "warning" | "success" };

type FAQItem = {
  question: string;
  answer: FAQBlock[];
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

type FAQCopy = {
  title: string;
  subtitle: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
  categories: FAQCategory[];
};

const FAQ_COPY: Record<SupportedLocale, FAQCopy> = {
  es: {
    title: "FAQs",
    subtitle: "Comisiones, retiros y todo lo que necesitas saber sobre hooks.store.",
    contactTitle: "¿No encontraste lo que buscabas?",
    contactBody: "Escríbenos y te ayudaremos con cualquier duda.",
    contactCta: "Contactar soporte",
    categories: [
      {
        title: "Comisiones",
        items: [
          {
            question: "¿Cómo funcionan las comisiones en hooks.store?",
            answer: [
              {
                type: "text",
                text: "En hooks.store queremos que tengas el control total de tus ganancias. El proceso es simple:",
              },
              {
                type: "orderedDetails",
                items: [
                  {
                    title: "El cliente paga el precio total que tú estableces",
                    description: "Precio mínimo permitido: 1,50 USD o equivalente.",
                  },
                  {
                    title: "Actuamos como intermediario comercial",
                    description: "Procesamos el pago de forma segura según el contrato de mandato.",
                  },
                  {
                    title: "Descontamos nuestra comisión",
                    description: "Solo ganamos cuando tú ganas.",
                  },
                ],
              },
              {
                type: "commission",
                rate: "9,99% + 0,50 USD",
                caption: "por transacción",
                items: [
                  "Licencia plataforma",
                  "Pasarela de pago",
                  "Soporte",
                  "Infraestructura y seguridad",
                ],
              },
              {
                type: "example",
                title: "Ejemplo práctico",
                text: "Si vendes un producto por $100 USD, recibirás $89,50 USD en tu saldo disponible.",
              },
            ],
          },
          {
            question: "¿Cuál es el precio mínimo que puedo poner a mis productos?",
            answer: [
              {
                type: "text",
                text: "El precio mínimo permitido es de 1,50 USD o su equivalente en otras monedas. Esto asegura que las comisiones de procesamiento de pago sean viables.",
              },
            ],
          },
        ],
      },
      {
        title: "Tiempos de Pago",
        items: [
          {
            question: "¿Cuándo recibiré el dinero de mis ventas?",
            answer: [
              {
                type: "text",
                text: "Cada venta pasa por un proceso de verificación para garantizar seguridad y evitar contracargos. Este período es de 15 días hábiles.",
              },
              {
                type: "timeline",
                items: [
                  { label: "Día 1", text: "Generas una venta" },
                  { label: "Día 1-15", text: "Período de verificación" },
                  { label: "Día 16", text: "Fondos disponibles para retiro" },
                ],
              },
              {
                type: "note",
                title: "¿Por qué 15 días?",
                text: "Esto asegura transacciones seguras para ti y para tus clientes, protegiéndote de posibles contracargos o fraudes.",
              },
            ],
          },
        ],
      },
      {
        title: "Retiros",
        items: [
          {
            question: "¿Qué necesito para poder retirar mi dinero?",
            answer: [
              {
                type: "text",
                text: "Debes completar tu perfil con la siguiente información:",
              },
              {
                type: "list",
                items: [
                  "Nombre completo",
                  "País, ciudad y dirección",
                  "Teléfono",
                  "Documento de identidad (KYC)",
                  "Datos bancarios / cuenta Payoneer / Wise",
                ],
              },
              {
                type: "note",
                tone: "warning",
                title: "Importante",
                text: "Sin estos datos completos, no podremos procesar tu retiro.",
              },
            ],
          },
          {
            question: "¿Cuál es el monto mínimo de retiro y las tarifas?",
            answer: [
              {
                type: "text",
                text: "El monto mínimo de retiro es 50 USD. Las tarifas varían según el monto:",
              },
              {
                type: "table",
                headers: ["Rango de retiro (USD)", "Tarifa"],
                rows: [
                  ["$50 - $99", "$7,50"],
                  ["$100 - $150", "$6,00"],
                  ["$151 - $199", "$5,00"],
                  ["$200 o más", "3%"],
                ],
              },
              {
                type: "note",
                tone: "success",
                title: "Tip",
                text: "Mientras más acumules antes de retirar, menor será el porcentaje de tarifa.",
              },
            ],
          },
          {
            question: "¿Cómo solicito un retiro?",
            answer: [
              {
                type: "text",
                text: "El proceso es muy sencillo:",
              },
              {
                type: "steps",
                items: [
                  "Entra a tu cuenta",
                  "Ve a Ingresos",
                  "Confirma que tu saldo disponible es igual o superior a 50 USD",
                  "Haz clic en Retirar dinero",
                  "Confirma los datos",
                  "Recibirás un correo cuando se procese",
                ],
              },
              {
                type: "note",
                title: "Tiempo de procesamiento",
                text: "Hasta 5 días hábiles.",
              },
            ],
          },
          {
            question: "¿Hay comisiones adicionales de los bancos?",
            answer: [
              {
                type: "text",
                text: "hooks.store cubre los costes estándar de procesamiento, pero no las comisiones del banco receptor, como:",
              },
              {
                type: "list",
                items: [
                  "Tarifas por recibir transferencias internacionales",
                  "Conversión de moneda",
                  "Intermediarios SWIFT",
                ],
              },
              {
                type: "text",
                text: "Te recomendamos usar cuentas en USD, como Payoneer o Wise, para minimizar estos costos.",
              },
            ],
          },
        ],
      },
      {
        title: "Seguridad",
        items: [
          {
            question: "¿Mis retiros son seguros?",
            answer: [
              {
                type: "text",
                text: "Absolutamente. Todos los retiros pasan por controles automáticos y manuales para detectar actividad inusual.",
              },
              {
                type: "text",
                text: "En casos excepcionales, podríamos solicitar información adicional para verificar tu identidad y proteger tus fondos.",
              },
            ],
          },
        ],
      },
      {
        title: "Ejemplo del Ciclo Completo",
        items: [
          {
            question: "¿Cómo es el proceso completo desde la venta hasta recibir mi dinero?",
            answer: [
              {
                type: "text",
                text: "Aquí tienes un ejemplo real del ciclo completo:",
              },
              {
                type: "table",
                headers: ["Día", "Evento", "Estado"],
                rows: [
                  ["1", "Venta por $120", "En proceso"],
                  ["15", "Fin de verificación", "Disponible"],
                  ["16", "Solicitas retiro", "En revisión"],
                  ["18-21", "Pago enviado", "Completado"],
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  en: {
    title: "FAQs",
    subtitle: "Commissions, withdrawals, and everything you need to know about hooks.store.",
    contactTitle: "Did not find what you were looking for?",
    contactBody: "Write to us and we will help with any question.",
    contactCta: "Contact support",
    categories: [
      {
        title: "Commissions",
        items: [
          {
            question: "How do commissions work at hooks.store?",
            answer: [
              {
                type: "text",
                text: "At hooks.store, we want you to have full control over your earnings. The process is simple:",
              },
              {
                type: "orderedDetails",
                items: [
                  {
                    title: "The customer pays the full price you set",
                    description: "Minimum allowed price: 1.50 USD or equivalent.",
                  },
                  {
                    title: "We act as a commercial intermediary",
                    description: "We process the payment securely under the mandate agreement.",
                  },
                  {
                    title: "We deduct our commission",
                    description: "We only earn when you earn.",
                  },
                ],
              },
              {
                type: "commission",
                rate: "9.99% + 0.50 USD",
                caption: "per transaction",
                items: [
                  "Platform license",
                  "Payment gateway",
                  "Support",
                  "Infrastructure and security",
                ],
              },
              {
                type: "example",
                title: "Practical example",
                text: "If you sell a product for $100 USD, you will receive $89.50 USD in your available balance.",
              },
            ],
          },
          {
            question: "What is the minimum price I can set for my products?",
            answer: [
              {
                type: "text",
                text: "The minimum allowed price is 1.50 USD or its equivalent in other currencies. This ensures payment processing commissions remain viable.",
              },
            ],
          },
        ],
      },
      {
        title: "Payment Timing",
        items: [
          {
            question: "When will I receive the money from my sales?",
            answer: [
              {
                type: "text",
                text: "Each sale goes through a verification process to ensure security and avoid chargebacks. This period is 15 business days.",
              },
              {
                type: "timeline",
                items: [
                  { label: "Day 1", text: "You generate a sale" },
                  { label: "Day 1-15", text: "Verification period" },
                  { label: "Day 16", text: "Funds available for withdrawal" },
                ],
              },
              {
                type: "note",
                title: "Why 15 days?",
                text: "This ensures safe transactions for you and your customers, protecting you from possible chargebacks or fraud.",
              },
            ],
          },
        ],
      },
      {
        title: "Withdrawals",
        items: [
          {
            question: "What do I need to withdraw my money?",
            answer: [
              {
                type: "text",
                text: "You must complete your profile with the following information:",
              },
              {
                type: "list",
                items: [
                  "Full name",
                  "Country, city, and address",
                  "Phone number",
                  "Identity document (KYC)",
                  "Bank details / Payoneer / Wise account",
                ],
              },
              {
                type: "note",
                tone: "warning",
                title: "Important",
                text: "Without this complete information, we will not be able to process your withdrawal.",
              },
            ],
          },
          {
            question: "What is the minimum withdrawal amount and what are the fees?",
            answer: [
              {
                type: "text",
                text: "The minimum withdrawal amount is 50 USD. Fees vary depending on the amount:",
              },
              {
                type: "table",
                headers: ["Withdrawal range (USD)", "Fee"],
                rows: [
                  ["$50 - $99", "$7.50"],
                  ["$100 - $150", "$6.00"],
                  ["$151 - $199", "$5.00"],
                  ["$200 or more", "3%"],
                ],
              },
              {
                type: "note",
                tone: "success",
                title: "Tip",
                text: "The more you accumulate before withdrawing, the lower the fee percentage will be.",
              },
            ],
          },
          {
            question: "How do I request a withdrawal?",
            answer: [
              {
                type: "text",
                text: "The process is very simple:",
              },
              {
                type: "steps",
                items: [
                  "Log in to your account",
                  "Go to Income",
                  "Confirm that your available balance is at least 50 USD",
                  "Click Withdraw money",
                  "Confirm the details",
                  "You will receive an email when it is processed",
                ],
              },
              {
                type: "note",
                title: "Processing time",
                text: "Up to 5 business days.",
              },
            ],
          },
          {
            question: "Are there additional bank fees?",
            answer: [
              {
                type: "text",
                text: "hooks.store covers standard processing costs, but not receiving bank fees, such as:",
              },
              {
                type: "list",
                items: [
                  "Fees for receiving international transfers",
                  "Currency conversion",
                  "SWIFT intermediaries",
                ],
              },
              {
                type: "text",
                text: "We recommend using USD accounts, such as Payoneer or Wise, to minimize these costs.",
              },
            ],
          },
        ],
      },
      {
        title: "Security",
        items: [
          {
            question: "Are my withdrawals secure?",
            answer: [
              {
                type: "text",
                text: "Absolutely. All withdrawals go through automatic and manual checks to detect unusual activity.",
              },
              {
                type: "text",
                text: "In exceptional cases, we may request additional information to verify your identity and protect your funds.",
              },
            ],
          },
        ],
      },
      {
        title: "Full Cycle Example",
        items: [
          {
            question: "What is the full process from sale to receiving my money?",
            answer: [
              {
                type: "text",
                text: "Here is a real example of the full cycle:",
              },
              {
                type: "table",
                headers: ["Day", "Event", "Status"],
                rows: [
                  ["1", "Sale for $120", "In process"],
                  ["15", "Verification ends", "Available"],
                  ["16", "You request withdrawal", "Under review"],
                  ["18-21", "Payment sent", "Completed"],
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

function FAQAnswerBlock({ block }: { block: FAQBlock }) {
  switch (block.type) {
    case "text":
      return <p className="text-sm leading-7 text-[#C8CDD4]">{block.text}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#C8CDD4]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "orderedDetails":
      return (
        <ol className="space-y-3 text-sm leading-7 text-[#C8CDD4]">
          {block.items.map((item, index) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#0A0A0A]">
                {index + 1}
              </span>
              <span>
                <strong className="font-semibold text-white">{item.title}</strong>
                {item.description ? (
                  <span className="block text-[#8A8F98]">{item.description}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className="space-y-3 text-sm leading-7 text-[#C8CDD4]">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.16] text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "commission":
      return (
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.06] p-5 text-white">
          <div className="text-2xl font-bold tracking-[-0.01em]">{block.rate}</div>
          <div className="mt-1 text-sm text-[#C8CDD4]">{block.caption}</div>
          <ul className="mt-4 grid gap-2 text-sm text-[#C8CDD4] sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "example":
      return (
        <div className="rounded-lg border-l-2 border-[#FF624F] bg-white/[0.04] p-4">
          <div className="mb-1 text-sm font-semibold text-white">{block.title}</div>
          <p className="text-sm leading-7 text-[#C8CDD4]">{block.text}</p>
        </div>
      );
    case "timeline":
      return (
        <div className="space-y-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="flex gap-4 border-b border-white/[0.08] pb-3 last:border-b-0 last:pb-0"
            >
              <span className="min-w-[88px] text-sm font-semibold text-white">{item.label}</span>
              <span className="text-sm text-[#C8CDD4]">{item.text}</span>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.06] text-white">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[#C8CDD4]">
              {block.rows.map((row) => (
                <tr key={row.join("-")} className="border-t border-white/[0.08]">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note": {
      const toneClass =
        block.tone === "warning"
          ? "border-[#FFC859]/30 bg-[#FFC859]/10"
          : block.tone === "success"
            ? "border-[#51E29A]/30 bg-[#51E29A]/10"
            : "border-white/[0.08] bg-white/[0.04]";

      return (
        <div className={`rounded-lg border p-4 ${toneClass}`}>
          <div className="text-sm font-semibold text-white">{block.title}</div>
          <p className="mt-1 text-sm leading-7 text-[#C8CDD4]">{block.text}</p>
        </div>
      );
    }
  }
}

export default function FAQ() {
  const { locale } = useLanguage();
  const copy = FAQ_COPY[locale];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="container pt-32 pb-20 sm:pt-36">
        <div className="mx-auto max-w-[880px]">
          <div className="mb-12 border-b border-white/[0.08] pb-8">
            <h1 className="text-[42px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[56px]">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-[620px] text-base leading-7 text-[#8A8F98]">
              {copy.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            {copy.categories.map((category) => (
              <section key={category.title} className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-lg border border-white/[0.08] bg-white/[0.03]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#8A8F98] transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="space-y-5 px-5 pb-5">
                        {item.answer.map((block, index) => (
                          <FAQAnswerBlock key={`${block.type}-${index}`} block={block} />
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-lg border border-white/[0.08] bg-white/[0.04] p-6 text-center">
            <h2 className="text-xl font-semibold text-white">{copy.contactTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-[#8A8F98]">{copy.contactBody}</p>
            <a
              href="mailto:hola@hooks.store"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              <Mail className="h-4 w-4" />
              {copy.contactCta}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
