import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { SupportedLocale } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";

export type LegalPageKind = "privacy" | "terms";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  subsections?: LegalSection[];
};

type LegalDocument = {
  heading: string;
  sections: LegalSection[];
};

type LegalCopy = {
  privacy: LegalDocument;
  terms: LegalDocument;
};

const LEGAL_COPY: Record<SupportedLocale, LegalCopy> = {
  es: {
    privacy: {
      heading: "Política de Privacidad",
      sections: [
        {
          title: "1. Introducción",
          paragraphs: [
            "En hooks.store nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información personal.",
          ],
        },
        {
          title: "2. Información que Recopilamos",
          paragraphs: ["Recopilamos la siguiente información:"],
          items: [
            "Información de registro: nombre, email, país de residencia.",
            "Información de verificación KYC: documento de identidad, dirección.",
            "Información financiera: datos bancarios para pagos.",
            "Información de uso: cómo interactúas con la plataforma.",
          ],
        },
        {
          title: "3. Uso de la Información",
          paragraphs: ["Utilizamos tu información para:"],
          items: [
            "Proporcionar y mejorar nuestros servicios.",
            "Procesar transacciones y pagos.",
            "Comunicarnos contigo sobre tu cuenta.",
            "Cumplir con obligaciones legales.",
          ],
        },
        {
          title: "4. Compartir Información",
          paragraphs: ["No vendemos tu información personal. Podemos compartirla con:"],
          items: [
            "Proveedores de servicios de pago (Stripe).",
            "Autoridades legales cuando sea requerido por ley.",
          ],
        },
        {
          title: "5. Seguridad",
          paragraphs: [
            "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información, incluyendo encriptación SSL y almacenamiento seguro.",
          ],
        },
        {
          title: "6. Tus Derechos (RGPD)",
          paragraphs: ["Tienes derecho a:"],
          items: [
            "Acceder a tus datos personales.",
            "Rectificar datos inexactos.",
            "Solicitar la eliminación de tus datos.",
            "Oponerte al procesamiento de tus datos.",
            "Portabilidad de datos.",
          ],
        },
        {
          title: "7. Cookies",
          paragraphs: [
            "Utilizamos cookies para mejorar tu experiencia. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.",
          ],
        },
        {
          title: "8. Cambios a esta Política",
          paragraphs: [
            "Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos.",
          ],
        },
        {
          title: "9. Contacto",
          paragraphs: ["Para consultas sobre privacidad:"],
          items: ["Email: privacy@hooks.store", "hooks.store - Dublin, Irlanda"],
        },
      ],
    },
    terms: {
      heading: "Términos y Condiciones de Uso",
      sections: [
        {
          title: "1. Aceptación de los Términos",
          paragraphs: [
            'El presente documento establece los Términos y Condiciones de Uso ("Términos") aplicables al uso de la plataforma digital hooks.store ("la Plataforma", "nosotros", "nuestro") disponible en https://hooks.store y sus servicios asociados ("los Servicios").',
            "Al registrarte, acceder o utilizar la Plataforma, aceptas estos Términos y nuestra Política de Privacidad. Si no estás de acuerdo, no debes utilizar los Servicios.",
          ],
        },
        {
          title: "2. Objeto y Alcance del Servicio",
          paragraphs: [
            'hooks.store es una plataforma global para Creadores de contenido digital ("Creadores") que les permite ofrecer, comercializar y distribuir productos o servicios digitales ("Contenido del Creador") a sus usuarios finales o compradores ("Usuarios").',
            "Los Servicios incluyen:",
          ],
          items: [
            "Alojamiento de páginas de venta y contenido digital.",
            "Procesamiento de cobros y pagos.",
            "Gestión de cuentas para Creadores.",
            "Herramientas de marketing y analíticas.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "hooks.store no es el vendedor del Contenido, sino un intermediario comercial que actúa en nombre del Creador según el contrato de mandato descrito más adelante.",
              ],
            },
          ],
        },
        {
          title: "3. Naturaleza Jurídica: Contrato de Mandato Comercial",
          paragraphs: [
            "El Creador autoriza expresamente a hooks.store a actuar como mandatario comercial, con facultades para:",
          ],
          items: [
            "a) Cobrar los importes de las ventas realizadas a través de la Plataforma en nombre y por cuenta del Creador.",
            "b) Recibir, custodiar temporalmente y distribuir los fondos resultantes de dichas ventas, descontando previamente las comisiones aplicables.",
            "c) Emitir facturas y comprobantes de pago a los Usuarios finales en nombre del Creador, cuando corresponda.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "hooks.store no adquiere la titularidad de los productos o servicios vendidos ni asume la relación contractual entre el Creador y el Usuario final.",
                "El Creador es el único responsable de:",
              ],
              items: [
                "La legalidad, calidad y veracidad de su contenido.",
                "El cumplimiento de las obligaciones fiscales y tributarias derivadas de sus ventas.",
                "El cumplimiento de las leyes locales aplicables (protección al consumidor, propiedad intelectual, comercio electrónico, etc.).",
              ],
            },
          ],
        },
        {
          title: "4. Registro y Cuentas de Usuario (Creadores)",
          paragraphs: [
            "Para utilizar los Servicios, el Creador y el Usuario deberán registrarse en la Plataforma, proporcionando información veraz, actual y completa.",
            "El Creador debe completar el proceso de verificación KYC (Know Your Customer), que incluye:",
          ],
          items: [
            "Nombre completo y país de residencia.",
            "Documento de identidad (imagen).",
            "Dirección de residencia.",
            "Datos bancarios (IBAN, SWIFT o cuentas locales).",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "El Usuario es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas bajo su cuenta.",
              ],
            },
          ],
        },
        {
          title: "5. Pagos, Comisiones y Retiros",
          subsections: [
            {
              title: "5.1 Procesamiento de pagos",
              paragraphs: [
                "hooks.store utiliza proveedores externos de pago, dependiendo del país y del método de cobro o retiro. El procesamiento de pagos se rige también por los términos y políticas de cada proveedor. Los fondos obtenidos por las ventas realizadas desde su tienda de creador, estarán disponibles después de 15 días para ser retirados.",
              ],
            },
            {
              title: "5.2 Comisiones de hooks.store",
              paragraphs: [
                "hooks.store retendrá automáticamente una comisión de servicio sobre cada transacción procesada. El porcentaje y las tarifas aplicables se detallan a continuación:",
              ],
              items: [
                "9,99% + 0,5 USD por cada transacción de venta realizada en Dólares",
                "9,99% + 0,5 EUR por cada transacción de venta realizada en Euros",
              ],
            },
            {
              title: "5.3 Custodia y liquidación",
              paragraphs: [
                "Los fondos cobrados por hooks.store se mantendrán en custodia temporal hasta su liquidación al Creador, descontando las comisiones aplicables y gastos de procesamiento.",
              ],
            },
            {
              title: "5.4 Pagos a Creadores (Payouts)",
              paragraphs: [
                "Los pagos a Creadores se realizarán mediante transferencia bancaria o plataformas de payout compatibles, una vez cumplidos los requisitos de verificación y umbrales mínimos. Los tiempos de acreditación pueden variar según el país, banco o proveedor. hooks.store no se hace responsable de retrasos o costos asociados a transferencias internacionales o rutas SWIFT.",
              ],
              items: [
                "Cantidad mínima a retirar: 50 USD (costes de transacción aplicables)",
                "hooks.store no se hace responsable por comisiones o retenciones aplicadas por el banco de la cuenta de destino del creador.",
              ],
            },
          ],
        },
        {
          title: "6. Obligaciones de los Creadores",
          paragraphs: ["El Creador se compromete a:"],
          items: [
            "Cumplir todas las leyes locales, fiscales y de propiedad intelectual aplicables.",
            "No publicar ni comercializar contenido ilícito, ofensivo o que infrinja derechos de terceros.",
            "Mantener actualizados sus datos bancarios y fiscales.",
            "Indemnizar a hooks.store por cualquier reclamación de terceros derivada de su actividad en la Plataforma.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "hooks.store podrá suspender o cancelar cuentas que violen estas normas sin previo aviso.",
              ],
            },
          ],
        },
        {
          title: "7. Propiedad Intelectual",
          paragraphs: [
            "El Creador conserva la titularidad sobre su Contenido. Al subirlo a la Plataforma, otorga a hooks.store una licencia no exclusiva, mundial y gratuita para alojar, distribuir y mostrar dicho contenido con el único fin de operar los Servicios.",
            "hooks.store y su logotipo son marcas registradas. Queda prohibido su uso sin autorización expresa.",
          ],
        },
        {
          title: "8. Limitación de Responsabilidad",
          paragraphs: [
            "hooks.store actúa únicamente como intermediario tecnológico y financiero.",
            "No garantiza:",
          ],
          items: [
            "La legalidad o calidad del contenido ofrecido por los Creadores.",
            "El cumplimiento de las obligaciones entre Creadores y Usuarios.",
            "La ausencia de interrupciones o errores en el servicio.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "En ningún caso hooks.store será responsable por pérdidas indirectas, lucro cesante, daños consecuenciales o reclamaciones de terceros.",
              ],
            },
          ],
        },
        {
          title: "9. Privacidad y Datos Personales",
          paragraphs: [
            "El tratamiento de datos personales se rige por la Política de Privacidad de hooks.store, conforme al Reglamento General de Protección de Datos (RGPD) de la Unión Europea y demás normativas aplicables.",
          ],
        },
        {
          title: "10. Suspensión y Terminación",
          paragraphs: [
            "hooks.store podrá suspender o cancelar cuentas por incumplimiento de estos Términos o por actividad sospechosa. El Creador podrá cancelar su cuenta en cualquier momento, pero seguirá siendo responsable de las obligaciones generadas hasta la fecha de cancelación.",
          ],
        },
        {
          title: "11. Modificaciones de los Términos",
          paragraphs: [
            "hooks.store podrá modificar estos Términos en cualquier momento. El uso continuado de la Plataforma implica la aceptación de las nuevas condiciones.",
          ],
        },
        {
          title: "12. Ley Aplicable y Jurisdicción",
          paragraphs: [
            "Estos Términos se regirán por las leyes de Irlanda. Cualquier disputa será sometida a la jurisdicción exclusiva de los tribunales de Dublín, salvo que la ley disponga lo contrario.",
          ],
        },
        {
          title: "13. Contacto",
          paragraphs: ["Para cualquier consulta sobre estos Términos, puedes comunicarte con:"],
          items: ["Email: legal@hooks.store", "hooks.store - Dublin, Irlanda"],
        },
      ],
    },
  },
  en: {
    privacy: {
      heading: "Privacy Policy",
      sections: [
        {
          title: "1. Introduction",
          paragraphs: [
            "At hooks.store, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.",
          ],
        },
        {
          title: "2. Information We Collect",
          paragraphs: ["We collect the following information:"],
          items: [
            "Registration information: name, email, country of residence.",
            "KYC verification information: identity document, address.",
            "Financial information: bank details for payments.",
            "Usage information: how you interact with the platform.",
          ],
        },
        {
          title: "3. Use of Information",
          paragraphs: ["We use your information to:"],
          items: [
            "Provide and improve our services.",
            "Process transactions and payments.",
            "Communicate with you about your account.",
            "Comply with legal obligations.",
          ],
        },
        {
          title: "4. Sharing Information",
          paragraphs: ["We do not sell your personal information. We may share it with:"],
          items: [
            "Payment service providers (Stripe).",
            "Legal authorities when required by law.",
          ],
        },
        {
          title: "5. Security",
          paragraphs: [
            "We implement technical and organizational security measures to protect your information, including SSL encryption and secure storage.",
          ],
        },
        {
          title: "6. Your Rights (GDPR)",
          paragraphs: ["You have the right to:"],
          items: [
            "Access your personal data.",
            "Correct inaccurate data.",
            "Request deletion of your data.",
            "Object to the processing of your data.",
            "Data portability.",
          ],
        },
        {
          title: "7. Cookies",
          paragraphs: [
            "We use cookies to improve your experience. You can configure your browser to reject cookies, although this may affect site functionality.",
          ],
        },
        {
          title: "8. Changes to this Policy",
          paragraphs: [
            "We may update this policy periodically. We will notify you of significant changes.",
          ],
        },
        {
          title: "9. Contact",
          paragraphs: ["For privacy inquiries:"],
          items: ["Email: privacy@hooks.store", "hooks.store - Dublin, Ireland"],
        },
      ],
    },
    terms: {
      heading: "Terms and Conditions of Use",
      sections: [
        {
          title: "1. Acceptance of the Terms",
          paragraphs: [
            'This document sets out the Terms and Conditions of Use ("Terms") applicable to the use of the hooks.store digital platform ("the Platform", "we", "our") available at https://hooks.store and its associated services ("the Services").',
            "By registering, accessing, or using the Platform, you accept these Terms and our Privacy Policy. If you do not agree, you must not use the Services.",
          ],
        },
        {
          title: "2. Purpose and Scope of the Service",
          paragraphs: [
            'hooks.store is a global platform for digital content Creators ("Creators") that enables them to offer, market, and distribute digital products or services ("Creator Content") to their end users or buyers ("Users").',
            "The Services include:",
          ],
          items: [
            "Hosting sales pages and digital content.",
            "Processing charges and payments.",
            "Managing accounts for Creators.",
            "Marketing and analytics tools.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "hooks.store is not the seller of the Content, but a commercial intermediary acting on behalf of the Creator under the mandate agreement described below.",
              ],
            },
          ],
        },
        {
          title: "3. Legal Nature: Commercial Mandate Agreement",
          paragraphs: [
            "The Creator expressly authorizes hooks.store to act as a commercial agent, with authority to:",
          ],
          items: [
            "a) Collect the amounts from sales made through the Platform in the name and on behalf of the Creator.",
            "b) Receive, temporarily hold, and distribute the funds resulting from those sales, after deducting the applicable commissions.",
            "c) Issue invoices and payment receipts to end Users in the name of the Creator, where applicable.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "hooks.store does not acquire ownership of the products or services sold and does not assume the contractual relationship between the Creator and the end User.",
                "The Creator is solely responsible for:",
              ],
              items: [
                "The legality, quality, and accuracy of their content.",
                "Compliance with tax obligations arising from their sales.",
                "Compliance with applicable local laws (consumer protection, intellectual property, electronic commerce, etc.).",
              ],
            },
          ],
        },
        {
          title: "4. Registration and User Accounts (Creators)",
          paragraphs: [
            "To use the Services, the Creator and the User must register on the Platform by providing truthful, current, and complete information.",
            "The Creator must complete the KYC (Know Your Customer) verification process, which includes:",
          ],
          items: [
            "Full name and country of residence.",
            "Identity document (image).",
            "Residential address.",
            "Bank details (IBAN, SWIFT, or local accounts).",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "The User is responsible for maintaining the confidentiality of their credentials and for all activities carried out under their account.",
              ],
            },
          ],
        },
        {
          title: "5. Payments, Commissions, and Withdrawals",
          subsections: [
            {
              title: "5.1 Payment processing",
              paragraphs: [
                "hooks.store uses external payment providers depending on the country and the collection or withdrawal method. Payment processing is also governed by each provider's terms and policies. Funds obtained from sales made from the creator's store will be available for withdrawal after 15 days.",
              ],
            },
            {
              title: "5.2 hooks.store commissions",
              paragraphs: [
                "hooks.store will automatically retain a service commission on each processed transaction. The applicable percentage and fees are detailed below:",
              ],
              items: [
                "9.99% + 0.5 USD for each sale transaction made in Dollars.",
                "9.99% + 0.5 EUR for each sale transaction made in Euros.",
              ],
            },
            {
              title: "5.3 Custody and settlement",
              paragraphs: [
                "The funds collected by hooks.store will be held in temporary custody until settlement to the Creator, after deducting applicable commissions and processing expenses.",
              ],
            },
            {
              title: "5.4 Payments to Creators (Payouts)",
              paragraphs: [
                "Payments to Creators will be made by bank transfer or compatible payout platforms once verification requirements and minimum thresholds have been met. Crediting times may vary by country, bank, or provider. hooks.store is not responsible for delays or costs associated with international transfers or SWIFT routes.",
              ],
              items: [
                "Minimum withdrawal amount: 50 USD (applicable transaction costs).",
                "hooks.store is not responsible for fees or withholdings applied by the bank of the creator's destination account.",
              ],
            },
          ],
        },
        {
          title: "6. Creator Obligations",
          paragraphs: ["The Creator agrees to:"],
          items: [
            "Comply with all applicable local, tax, and intellectual property laws.",
            "Not publish or market unlawful, offensive, or third-party-infringing content.",
            "Keep their bank and tax information up to date.",
            "Indemnify hooks.store for any third-party claim arising from their activity on the Platform.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "hooks.store may suspend or cancel accounts that violate these rules without prior notice.",
              ],
            },
          ],
        },
        {
          title: "7. Intellectual Property",
          paragraphs: [
            "The Creator retains ownership of their Content. By uploading it to the Platform, they grant hooks.store a non-exclusive, worldwide, royalty-free license to host, distribute, and display that content solely for the purpose of operating the Services.",
            "hooks.store and its logo are registered trademarks. Their use without express authorization is prohibited.",
          ],
        },
        {
          title: "8. Limitation of Liability",
          paragraphs: [
            "hooks.store acts solely as a technological and financial intermediary.",
            "It does not guarantee:",
          ],
          items: [
            "The legality or quality of the content offered by Creators.",
            "Fulfillment of obligations between Creators and Users.",
            "The absence of interruptions or errors in the service.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "Under no circumstances will hooks.store be liable for indirect losses, loss of profit, consequential damages, or third-party claims.",
              ],
            },
          ],
        },
        {
          title: "9. Privacy and Personal Data",
          paragraphs: [
            "The processing of personal data is governed by the hooks.store Privacy Policy, in accordance with the European Union General Data Protection Regulation (GDPR) and other applicable regulations.",
          ],
        },
        {
          title: "10. Suspension and Termination",
          paragraphs: [
            "hooks.store may suspend or cancel accounts for breach of these Terms or suspicious activity. The Creator may cancel their account at any time, but will remain responsible for obligations generated up to the cancellation date.",
          ],
        },
        {
          title: "11. Changes to the Terms",
          paragraphs: [
            "hooks.store may modify these Terms at any time. Continued use of the Platform implies acceptance of the new conditions.",
          ],
        },
        {
          title: "12. Governing Law and Jurisdiction",
          paragraphs: [
            "These Terms will be governed by the laws of Ireland. Any dispute will be submitted to the exclusive jurisdiction of the courts of Dublin, unless the law provides otherwise.",
          ],
        },
        {
          title: "13. Contact",
          paragraphs: ["For any inquiry about these Terms, you can contact:"],
          items: ["Email: legal@hooks.store", "hooks.store - Dublin, Ireland"],
        },
      ],
    },
  },
};

interface LegalPageProps {
  documentType: LegalPageKind;
}

function LegalSectionBlock({
  section,
  nested = false,
}: {
  section: LegalSection;
  nested?: boolean;
}) {
  return (
    <section className={nested ? "space-y-3" : "space-y-4"}>
      {section.title ? (
        nested ? (
          <h4 className="text-[15px] font-semibold leading-snug text-white">
            {section.title}
          </h4>
        ) : (
          <h3 className="text-lg font-semibold leading-snug text-white">
            {section.title}
          </h3>
        )
      ) : null}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-7 text-[#C8CDD4]">
          {paragraph}
        </p>
      ))}
      {section.items?.length ? (
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#C8CDD4]">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.subsections?.length ? (
        <div className="space-y-5">
          {section.subsections.map((subsection, index) => (
            <LegalSectionBlock
              key={`${subsection.title}-${index}`}
              section={subsection}
              nested={true}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <article className="space-y-8">
      <div className="space-y-8">
        {document.sections.map((section) => (
          <LegalSectionBlock key={section.title} section={section} />
        ))}
      </div>
    </article>
  );
}

export default function LegalPage({ documentType }: LegalPageProps) {
  const { locale } = useLanguage();
  const document = LEGAL_COPY[locale][documentType];
  const pageCopy = {
    eyebrow: locale === "es" ? "Legal" : "Legal",
    description:
      locale === "es"
        ? "Información legal de hooks.store."
        : "Legal information for hooks.store.",
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="container pt-32 pb-20 sm:pt-36">
        <div className="mx-auto max-w-[880px]">
          <div className="mb-12 border-b border-white/[0.08] pb-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#FF624F]">
              {pageCopy.eyebrow}
            </p>
            <h1 className="text-[36px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[48px]">
              {document.heading}
            </h1>
            <p className="mt-4 max-w-[620px] text-base leading-7 text-[#8A8F98]">
              {pageCopy.description}
            </p>
          </div>
          <LegalDocumentView document={document} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
