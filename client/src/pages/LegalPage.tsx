import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { SupportedLocale } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  COOKIE_DAYS,
  FOUNDING_RATE_PERCENT,
  FOUNDING_SLOTS,
  PAYOUT_THRESHOLD_CENTS,
  REFUND_WINDOW_DAYS,
  STANDARD_RATE_PERCENT,
  formatUsd,
} from "@/lib/partnerProgram";

export type LegalPageKind = "privacy" | "terms" | "partner";

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
  partner: LegalDocument;
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
    partner: {
      heading: "Acuerdo del Programa de Afiliados",
      sections: [
        {
          title: "1. Sobre este Acuerdo",
          paragraphs: [
            'Este Acuerdo del Programa de Afiliados ("Acuerdo") establece las condiciones del Programa de Afiliados de Hooks ("Programa"), gestionado por hooks.store ("Hooks", "nosotros"). Es un acuerdo entre Hooks y la persona o empresa aprobada para participar en el Programa ("Afiliado", "tú").',
            "Al solicitar tu participación o participar en el Programa, aceptas este Acuerdo. El uso de la plataforma de Hooks, incluida cualquier cuenta de afiliado que te proporcionemos, se rige también por nuestros Términos y Condiciones de Uso y nuestra Política de Privacidad. Si esos documentos entran en conflicto con este Acuerdo en una cuestión del Programa, prevalece este Acuerdo.",
            "Última actualización: 29 de septiembre de 2026.",
          ],
        },
        {
          title: "2. Definiciones",
          items: [
            '"Enlace de Referido" es el enlace o código de seguimiento único que te asignamos.',
            '"Cliente Referido" es una cuenta nueva de Hooks que se registra a través de tu Enlace de Referido dentro de la Ventana de Cookie y que se te atribuye conforme a la sección 4.',
            '"Ingresos Netos por Suscripción" es el importe que Hooks cobra efectivamente a un Cliente Referido por una suscripción Pro o Growth, excluidos impuestos (incluidos IVA e impuestos sobre ventas), reembolsos, contracargos, créditos y descuentos.',
            `"Ventana de Cookie" son los ${COOKIE_DAYS} días siguientes a un clic en tu Enlace de Referido.`,
          ],
        },
        {
          title: "3. Incorporación al Programa",
          paragraphs: [
            "Las solicitudes se revisan manualmente y normalmente respondemos en un día hábil. Podemos aceptar o rechazar cualquier solicitud a nuestra discreción, incluso cuando tu audiencia o tus métodos de promoción no encajen con el Programa.",
            "Debes tener al menos 18 años, o la mayoría de edad donde vivas, y capacidad para celebrar un contrato vinculante. Debes proporcionarnos información veraz y mantenerla actualizada.",
            "Cada Afiliado puede tener una sola cuenta de afiliado. Tu cuenta y tu Enlace de Referido son personales y no pueden transferirse ni venderse.",
          ],
        },
        {
          title: "4. Seguimiento y Atribución",
          paragraphs: [
            `Los referidos se registran mediante una cookie que se establece cuando alguien hace clic en tu Enlace de Referido. La cookie dura ${COOKIE_DAYS} días y la atribución es por último clic: si esa persona hace clic después en el enlace de otro afiliado, el clic más reciente recibe el crédito.`,
            "Un registro dentro de la Ventana de Cookie se te atribuye aunque la cuenta empiece con una prueba gratuita y realice su primer pago después de que termine la Ventana de Cookie.",
            "Un registro no se considera Cliente Referido si:",
          ],
          items: [
            "La cuenta ya existía, o ya estaba atribuida a otro afiliado, antes del clic.",
            "La cuenta pertenece o está controlada por ti, por un miembro de tu hogar o por una empresa que posees o controlas (autorreferido).",
            "Se obtuvo mediante un método prohibido en la sección 8.",
            "No se pudo registrar el clic, por ejemplo porque las cookies estaban bloqueadas o se borraron.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "Nuestros registros de seguimiento determinan la atribución. Si crees que no se registró un referido, contáctanos dentro de los 60 días siguientes al registro y lo revisaremos de buena fe.",
              ],
            },
          ],
        },
        {
          title: "5. Comisión",
          subsections: [
            {
              title: "5.1 Tarifa estándar",
              paragraphs: [
                `Ganas el ${STANDARD_RATE_PERCENT}% de los Ingresos Netos por Suscripción de cada Cliente Referido, tanto en Pro como en Growth. La comisión empieza con el primer pago del Cliente Referido y continúa en cada pago posterior durante toda la vida de la cuenta, sin límite de duración ni de importe, mientras sigas en el Programa conforme a la sección 11.`,
              ],
            },
            {
              title: "5.2 Cambios de plan",
              paragraphs: [
                "La comisión sigue los pagos reales del Cliente Referido, con facturación mensual o anual. Si mejora su plan, por ejemplo de Pro a Growth, tu comisión sube con su factura. Si lo reduce, baja.",
              ],
            },
            {
              title: "5.3 Cancelación y reactivación",
              paragraphs: [
                "No se genera comisión mientras la suscripción de un Cliente Referido esté cancelada o impagada. Si la misma cuenta vuelve a suscribirse más adelante, sigue atribuida a ti y la comisión se reanuda sobre sus nuevos pagos.",
              ],
            },
            {
              title: "5.4 Qué no genera comisión",
              items: [
                "Las comisiones por transacción que Hooks cobra a los Creadores sobre sus propias ventas.",
                "Impuestos, reembolsos, contracargos, créditos y descuentos.",
                "Pagos de cuentas que no cumplan la sección 4.",
                "Cualquier producto, servicio o cargo distinto de una suscripción Pro o Growth.",
              ],
            },
            {
              title: "5.5 Reembolsos y contracargos",
              paragraphs: [
                `La comisión sobre un pago solo es pagadera una vez que ese pago ha superado el periodo de reembolso de ${REFUND_WINDOW_DAYS} días. Si un pago se reembolsa o sufre un contracargo después de haberte pagado su comisión, la descontaremos de tus pagos futuros.`,
              ],
            },
            {
              title: "5.6 Tarifas personalizadas",
              paragraphs: [
                "Cualquier tarifa o condición distinta de las de esta sección solo se aplica si Hooks la acepta por escrito. Un correo electrónico es suficiente.",
              ],
            },
          ],
        },
        {
          title: "6. Afiliados Fundadores",
          paragraphs: [
            `Los primeros ${FOUNDING_SLOTS} Afiliados que aprobemos como afiliados fundadores ("Afiliados Fundadores") reciben las condiciones siguientes. Las plazas se asignan por orden de aprobación y la oferta se cierra cuando se cubren todas.`,
          ],
          items: [
            `Tarifa de fundador: ${FOUNDING_RATE_PERCENT}% de los Ingresos Netos por Suscripción de cada Cliente Referido, en lugar de la tarifa estándar.`,
            "Fijada de por vida: la tarifa de fundador queda vinculada a tu cuenta de afiliado mientras sigas en el Programa. No se reducirá por ningún cambio posterior del Programa estándar, incluidos los cambios realizados conforme a la sección 12.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "La condición de Afiliado Fundador es personal y no puede transferirse. Termina si tu participación se cancela por incumplimiento o fraude conforme a la sección 11.",
              ],
            },
          ],
        },
        {
          title: "7. Pagos",
          items: [
            "La comisión se calcula mensualmente. La comisión que supera el periodo de reembolso durante un mes natural se paga dentro de los 30 días siguientes al final de ese mes (Net 30).",
            `El mínimo para cobrar es de ${formatUsd(PAYOUT_THRESHOLD_CENTS, "es")}. Si tu saldo disponible es inferior, se acumula al mes siguiente hasta alcanzar el mínimo.`,
            "Los pagos se realizan en dólares estadounidenses por PayPal o transferencia bancaria. Debes proporcionar datos de pago correctos, y no somos responsables de pagos enviados a los datos que nos facilitaste. Las comisiones de tu banco, de PayPal o de intermediarios, y cualquier conversión de divisa, corren por tu cuenta.",
            "Antes de tu primer pago podemos pedirte información fiscal, como un formulario W-9 o W-8BEN o un número de IVA. Podemos retener los pagos hasta recibirla y aplicar las retenciones que exija la ley.",
            "Tu panel de afiliado muestra clics, registros, pruebas, conversiones, ingresos activos y comisiones pendientes frente a pagadas. Si crees que un pago es incorrecto, avísanos dentro de los 60 días siguientes a la fecha de pago.",
          ],
        },
        {
          title: "8. Normas de Promoción",
          paragraphs: [
            "Puedes promocionar Hooks a través de tu propio contenido y tus canales. Al hacerlo, no debes:",
          ],
          items: [
            'Pujar por "Hooks", "hooks.store" o variantes cercanas o errores ortográficos como palabras clave en anuncios de búsqueda o redes sociales, ni usarlos en el texto o las URL visibles de anuncios, sin nuestro permiso por escrito.',
            'Registrar dominios, perfiles sociales o nombres de aplicaciones que incluyan "Hooks" o puedan confundirse con nuestra marca.',
            "Presentarte como Hooks ni dar a entender que trabajas para nosotros o hablas en nuestro nombre.",
            "Hacer afirmaciones falsas, engañosas o sin fundamento sobre Hooks, incluidas las relativas a precios, funciones o lo que un Creador puede esperar ganar.",
            "Enviar correos o mensajes no solicitados, ni promocionar Hooks incumpliendo leyes antispam o normas de las plataformas.",
            "Usar cookie stuffing, clics forzados, marcos ocultos, adware, extensiones de navegador que inyecten enlaces o cualquier otro método que establezca una cookie sin un clic genuino.",
            "Ofrecer dinero, reembolsos u otros incentivos por registrarse, ni publicar códigos de cupón o descuentos que no te hayamos proporcionado.",
            "Promocionar Hooks junto a contenido ilícito, de odio, sexualmente explícito o que infrinja derechos de terceros.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "Si detectamos actividad prohibida, podemos revertir la comisión afectada, retener la comisión pendiente relacionada y suspender o cancelar tu participación.",
              ],
            },
          ],
        },
        {
          title: "9. Divulgación",
          paragraphs: [
            'Debes indicar claramente tu relación con Hooks allí donde lo promociones, de forma que tu audiencia lo vea antes de hacer clic, por ejemplo: "Gano una comisión si te registras con este enlace". Una divulgación situada solo en un pie de página, en una página de información o dentro del propio enlace no es suficiente.',
            "Eres responsable de cumplir las normas de publicidad y recomendaciones que te apliquen, incluidas las Endorsement Guides de la FTC de EE. UU., la normativa de protección al consumidor de la UE y el Reino Unido, y las políticas de cada plataforma en la que publiques.",
          ],
        },
        {
          title: "10. Recursos de Marca y Cuenta de Afiliado",
          paragraphs: [
            "Mientras participes en el Programa, te concedemos una licencia limitada, no exclusiva, intransferible y revocable para usar el nombre, el logotipo, los recursos de marca, las imágenes del producto y las grabaciones de pantalla de Hooks que te proporcionemos, únicamente para promocionar Hooks conforme a este Acuerdo. No puedes modificar nuestras marcas ni recursos, ni usarlos de forma que sugiera que respaldamos algo distinto de Hooks. Nos reservamos todos los derechos no concedidos expresamente.",
            "Podemos darte una cuenta gratuita de Hooks con funciones desbloqueadas para que puedas reseñar el producto. Es para evaluación y creación de contenido promocional, está sujeta a nuestros Términos y Condiciones de Uso, y puede reducirse o cerrarse cuando termine tu participación.",
          ],
        },
        {
          title: "11. Duración y Terminación",
          paragraphs: [
            "Este Acuerdo empieza cuando aprobamos tu solicitud y continúa hasta que cualquiera de las partes lo termine.",
            "Puedes salir del Programa en cualquier momento enviándonos un correo. Podemos terminar tu participación por cualquier motivo con 30 días de preaviso por correo electrónico, o de inmediato si incumples este Acuerdo, cometes fraude o dañas la reputación de Hooks.",
            "Cuando termina tu participación:",
          ],
          items: [
            "Si sales tú, o si la terminamos por incumplimiento o fraude, la comisión deja de generarse en la fecha de terminación. La comisión disponible se abona en un pago final aunque no alcance el mínimo para cobrar, salvo la comisión relacionada con un incumplimiento o fraude, que podemos retener.",
            "Si terminamos tu participación sin causa, o cerramos el Programa, seguiremos pagando comisión por los Clientes Referidos atribuidos a ti antes de la fecha de terminación, según las condiciones vigentes en ese momento, mientras esas cuentas sigan activas.",
            "Tu licencia de uso de recursos de marca termina, y debes retirar las marcas de Hooks y los Enlaces de Referido de tus canales en un plazo razonable.",
          ],
        },
        {
          title: "12. Cambios en el Programa",
          paragraphs: [
            "Podemos modificar este Acuerdo o el Programa, incluida la tarifa de comisión estándar, avisándote por correo electrónico con al menos 30 días de antelación. Los cambios no afectan a la comisión generada antes de su entrada en vigor ni reducen la tarifa de los Afiliados Fundadores. Si no estás de acuerdo con un cambio, puedes salir del Programa antes de que entre en vigor. Seguir participando después implica que lo aceptas.",
          ],
        },
        {
          title: "13. Relación, Impuestos y Confidencialidad",
          paragraphs: [
            "Participas como contratista independiente. Este Acuerdo no crea una relación laboral, de agencia, de sociedad ni de empresa conjunta, y no puedes asumir compromisos en nuestro nombre.",
            "Eres responsable de todos los impuestos sobre la comisión que recibas.",
            "Debes mantener la confidencialidad de cualquier información no pública que compartamos contigo, incluidas funciones no lanzadas, condiciones personalizadas y datos de rendimiento, y usarla solo para el Programa.",
            "Debes cumplir la normativa de protección de datos y privacidad en tus propios canales, incluida la obtención de cualquier consentimiento necesario para las cookies o el seguimiento que utilices. Tratamos los datos personales relacionados con el Programa conforme a nuestra Política de Privacidad. Tu panel de afiliado muestra actividad agregada y no te da acceso a los datos personales de los Clientes Referidos.",
          ],
        },
        {
          title: "14. Garantías, Responsabilidad e Indemnización",
          paragraphs: [
            'El Programa se ofrece "tal cual". No garantizamos ningún nivel de ingresos ni que el seguimiento funcione sin interrupciones ni errores, aunque corregiremos los errores que detectemos.',
            "En la medida permitida por la ley, ninguna de las partes será responsable de pérdidas indirectas, incidentales o consecuentes, ni de lucro cesante, y nuestra responsabilidad total conforme a este Acuerdo se limita a la comisión pagada o pagadera a ti en los 12 meses anteriores a la reclamación. Nada en este Acuerdo limita la responsabilidad que no pueda limitarse por ley.",
            "Te comprometes a indemnizar a Hooks frente a reclamaciones de terceros derivadas de tu actividad promocional, tu contenido o tu incumplimiento de este Acuerdo.",
          ],
        },
        {
          title: "15. Ley Aplicable y Jurisdicción",
          paragraphs: [
            "Este Acuerdo se rige por las leyes de Irlanda. Cualquier disputa se someterá a la jurisdicción exclusiva de los tribunales de Dublín, salvo que la ley disponga lo contrario.",
          ],
        },
        {
          title: "16. Contacto",
          paragraphs: ["Para consultas sobre el Programa o este Acuerdo:"],
          items: [
            "Programa: equipo@hooks.store",
            "Legal: legal@hooks.store",
            "hooks.store - Dublin, Irlanda",
          ],
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
    partner: {
      heading: "Partner Program Agreement",
      sections: [
        {
          title: "1. About this Agreement",
          paragraphs: [
            'This Partner Program Agreement ("Agreement") sets out the terms of the Hooks Partner Program ("Program") operated by hooks.store ("Hooks", "we", "us"). It is an agreement between Hooks and the individual or business approved to take part in the Program ("Partner", "you").',
            "By applying to or taking part in the Program, you accept this Agreement. Your use of the Hooks platform, including any partner account we provide, is also governed by our Terms and Conditions of Use and our Privacy Policy. If they conflict with this Agreement on a Program matter, this Agreement applies.",
            "Last updated: 29 September 2026.",
          ],
        },
        {
          title: "2. Definitions",
          items: [
            '"Referral Link" means the unique tracking link or code we assign to you.',
            '"Referred Customer" means a new Hooks account that signs up through your Referral Link within the Cookie Window and is attributed to you under section 4.',
            '"Net Subscription Revenue" means the amount Hooks actually collects from a Referred Customer for a Pro or Growth subscription, excluding taxes (including VAT and sales tax), refunds, chargebacks, credits and discounts.',
            `"Cookie Window" means the ${COOKIE_DAYS} days following a click on your Referral Link.`,
          ],
        },
        {
          title: "3. Joining the Program",
          paragraphs: [
            "Applications are reviewed manually and we usually respond within one business day. We may accept or decline any application at our discretion, including where your audience or promotional methods are not a good fit for the Program.",
            "You must be at least 18 years old, or the age of majority where you live, and able to enter into a binding contract. You must give us accurate information and keep it up to date.",
            "Each Partner may hold one partner account. Your account and Referral Link are personal to you and may not be transferred or sold.",
          ],
        },
        {
          title: "4. Tracking and Attribution",
          paragraphs: [
            `Referrals are tracked with a cookie set when someone clicks your Referral Link. The cookie lasts ${COOKIE_DAYS} days and attribution is last click: if the person later clicks another partner's link, the most recent click receives credit.`,
            "A signup within the Cookie Window is attributed to you even if the account starts on a free trial and makes its first payment after the Cookie Window ends.",
            "A signup does not qualify as a Referred Customer if:",
          ],
          items: [
            "The account already existed, or was already attributed to another partner, before the click.",
            "The account is owned or controlled by you, a member of your household, or a business you own or control (self-referral).",
            "It was obtained through a method prohibited in section 8.",
            "The click could not be recorded, for example because cookies were blocked or cleared.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "Our tracking records decide attribution. If you believe a referral was missed, contact us within 60 days of the signup and we will review it in good faith.",
              ],
            },
          ],
        },
        {
          title: "5. Commission",
          subsections: [
            {
              title: "5.1 Standard rate",
              paragraphs: [
                `You earn ${STANDARD_RATE_PERCENT}% of Net Subscription Revenue from each Referred Customer, on both Pro and Growth plans. Commission starts with the Referred Customer's first successful payment and continues on every payment after that for the lifetime of the account, with no cap on duration or amount, for as long as you remain in the Program under section 11.`,
              ],
            },
            {
              title: "5.2 Plan changes",
              paragraphs: [
                "Commission follows the Referred Customer's actual payments, whether billed monthly or annually. If they upgrade, for example from Pro to Growth, your commission increases with their invoice. If they downgrade, it decreases.",
              ],
            },
            {
              title: "5.3 Cancellation and reactivation",
              paragraphs: [
                "No commission accrues while a Referred Customer's subscription is cancelled or unpaid. If the same account subscribes again later, it remains attributed to you and commission resumes on its new payments.",
              ],
            },
            {
              title: "5.4 What does not earn commission",
              items: [
                "Transaction fees Hooks charges Creators on their own sales.",
                "Taxes, refunds, chargebacks, credits and discounts.",
                "Payments from accounts that do not qualify under section 4.",
                "Any product, service or fee other than a Pro or Growth subscription.",
              ],
            },
            {
              title: "5.5 Refunds and chargebacks",
              paragraphs: [
                `Commission on a payment becomes payable only once that payment has passed the ${REFUND_WINDOW_DAYS}-day refund window. If a payment is refunded or charged back after commission on it has been paid, we will deduct that commission from your future payouts.`,
              ],
            },
            {
              title: "5.6 Custom rates",
              paragraphs: [
                "Any rate or arrangement that differs from this section applies only if Hooks agrees to it in writing. Email is enough.",
              ],
            },
          ],
        },
        {
          title: "6. Founding Partners",
          paragraphs: [
            `The first ${FOUNDING_SLOTS} Partners we approve as founding partners ("Founding Partners") receive the terms below. Slots are allocated in the order applications are approved, and the offer closes once all slots are filled.`,
          ],
          items: [
            `Founding rate: ${FOUNDING_RATE_PERCENT}% of Net Subscription Revenue on every Referred Customer, instead of the standard rate.`,
            "Locked for life: the founding rate is attached to your partner account for as long as you remain in the Program. It will not be reduced by any later change to the standard Program, including changes made under section 12.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "Founding Partner status is personal and cannot be transferred. It ends if your participation is terminated for breach or fraud under section 11.",
              ],
            },
          ],
        },
        {
          title: "7. Payouts",
          items: [
            "Commission is calculated monthly. Commission that clears the refund window during a calendar month is paid within 30 days after the end of that month (Net 30).",
            `The payout threshold is ${formatUsd(PAYOUT_THRESHOLD_CENTS, "en")}. If your cleared balance is below the threshold, it rolls over to the following month until the threshold is reached.`,
            "Payouts are made in US dollars by PayPal or bank transfer. You must provide accurate payout details, and we are not responsible for payments sent to details you supplied. Fees charged by your bank, PayPal or intermediaries, and any currency conversion, are your responsibility.",
            "Before your first payout we may ask for tax information, such as a W-9 or W-8BEN form or a VAT number. We may hold payouts until it is provided, and withhold amounts where the law requires it.",
            "Your partner dashboard shows clicks, signups, trials, conversions, active revenue, and pending versus paid commission. If you believe a payout is wrong, tell us within 60 days of the payout date.",
          ],
        },
        {
          title: "8. Promotion Rules",
          paragraphs: [
            "You may promote Hooks through your own content and channels. When you do, you must not:",
          ],
          items: [
            'Bid on "Hooks", "hooks.store" or close variants or misspellings as keywords in paid search or social ads, or use them in ad copy or display URLs, without our written permission.',
            'Register domain names, social handles or app names that include "Hooks" or could be confused with our brand.',
            "Present yourself as Hooks, or suggest that you are employed by or speak for us.",
            "Make false, misleading or unsupported claims about Hooks, including about pricing, features or what a Creator can expect to earn.",
            "Send unsolicited email or messages, or promote Hooks in breach of anti-spam laws or platform rules.",
            "Use cookie stuffing, forced clicks, hidden frames, adware, link-injecting browser extensions or any other method that sets a cookie without a genuine click.",
            "Offer cash, rebates or other incentives for signing up, or publish coupon codes or discounts we have not provided to you.",
            "Promote Hooks alongside content that is unlawful, hateful, sexually explicit or infringes third-party rights.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "If we find prohibited activity, we may reverse the affected commission, withhold unpaid commission connected to it, and suspend or terminate your participation.",
              ],
            },
          ],
        },
        {
          title: "9. Disclosure",
          paragraphs: [
            'You must clearly disclose your relationship with Hooks wherever you promote it, in a way your audience will see before they click, for example "I earn a commission if you sign up through this link." A disclosure placed only in a footer, an about page or inside the link itself is not enough.',
            "You are responsible for complying with the advertising and endorsement rules that apply to you, including the US FTC Endorsement Guides, EU and UK consumer protection law, and the policies of each platform you publish on.",
          ],
        },
        {
          title: "10. Brand Assets and Partner Account",
          paragraphs: [
            "While you are in the Program, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Hooks name, logo, brand assets, product images and screen recordings we provide, solely to promote Hooks under this Agreement. You may not alter our marks or assets, or use them in a way that suggests we endorse anything other than Hooks. All rights not expressly granted are reserved.",
            "We may give you a free Hooks account with features unlocked so you can review the product. It is for evaluation and creating promotional content, is subject to our Terms and Conditions of Use, and may be downgraded or closed when your participation ends.",
          ],
        },
        {
          title: "11. Term and Termination",
          paragraphs: [
            "This Agreement starts when we approve your application and continues until either party ends it.",
            "You may leave the Program at any time by emailing us. We may end your participation for any reason with 30 days' notice by email, or immediately if you breach this Agreement, commit fraud or damage Hooks' reputation.",
            "When your participation ends:",
          ],
          items: [
            "If you leave, or if we end it for breach or fraud, commission stops accruing on the end date. Cleared commission is paid in a final payout even if it is below the payout threshold, except that we may withhold commission connected to a breach or fraud.",
            "If we end your participation without cause, or close the Program, we will keep paying commission on Referred Customers attributed to you before the end date, on the terms in effect at that time, for as long as those accounts remain active.",
            "Your brand asset license ends, and you must remove Hooks marks and Referral Links from your channels within a reasonable time.",
          ],
        },
        {
          title: "12. Changes to the Program",
          paragraphs: [
            "We may change this Agreement or the Program, including the standard commission rate, by giving you at least 30 days' notice by email. Changes do not affect commission earned before they take effect and do not reduce the founding rate of Founding Partners. If you do not agree to a change, you may leave the Program before it takes effect. Continuing to take part afterwards means you accept it.",
          ],
        },
        {
          title: "13. Relationship, Taxes and Confidentiality",
          paragraphs: [
            "You take part as an independent contractor. This Agreement does not create an employment, agency, partnership or joint venture relationship, and you may not make commitments on our behalf.",
            "You are responsible for all taxes on commission you receive.",
            "You must keep confidential any non-public information we share with you, including unreleased features, custom terms and performance data, and use it only for the Program.",
            "You must comply with data protection and privacy laws on your own channels, including obtaining any consent required for cookies or tracking you use. We process personal data in connection with the Program under our Privacy Policy. Your partner dashboard shows aggregated activity and does not give you access to Referred Customers' personal data.",
          ],
        },
        {
          title: "14. Warranties, Liability and Indemnity",
          paragraphs: [
            'The Program is provided "as is". We do not guarantee any level of earnings, or that tracking will be uninterrupted or error-free, though we will correct errors we identify.',
            "To the extent permitted by law, neither party is liable for indirect, incidental or consequential losses or lost profits, and our total liability under this Agreement is limited to the commission paid or payable to you in the 12 months before the claim arose. Nothing in this Agreement limits liability that cannot be limited by law.",
            "You agree to indemnify Hooks against third-party claims arising from your promotional activity, your content or your breach of this Agreement.",
          ],
        },
        {
          title: "15. Governing Law and Jurisdiction",
          paragraphs: [
            "This Agreement is governed by the laws of Ireland. Any dispute will be submitted to the exclusive jurisdiction of the courts of Dublin, unless the law provides otherwise.",
          ],
        },
        {
          title: "16. Contact",
          paragraphs: ["For questions about the Program or this Agreement:"],
          items: [
            "Program: support@hooks.store",
            "Legal: legal@hooks.store",
            "hooks.store - Dublin, Ireland",
          ],
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
