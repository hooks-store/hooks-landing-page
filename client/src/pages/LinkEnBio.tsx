/** @jsxRuntime automatic */
import { ArrowDown, ArrowRight, CreditCard, Download, Link2 } from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../lib/registerUrl";

const steps = [
  {
    title: "Publica tu perfil",
    description: "Elige tu nombre en Hooks, personaliza tu página y añade los enlaces que ya compartes con tu audiencia.",
  },
  {
    title: "Prepara tu primer producto",
    description: "Sube un PDF, una plantilla o un ebook. Ponle un precio y cuenta qué recibirá la persona que lo compre.",
  },
  {
    title: "Pon tu tienda en tu bio",
    description: "Copia el link de Hooks en tu perfil de Instagram o TikTok. Quien lo abra podrá elegir el producto, pagar y descargar el archivo.",
  },
];

const signupClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FFC3AD] px-5 py-3 text-sm font-semibold text-[#21131A] transition-colors hover:bg-[#FFD9CB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFC3AD]";

function StorefrontExample() {
  return (
    <figure
      className="rounded-[2rem] border border-[#68414C]/60 bg-[radial-gradient(ellipse_at_top_right,_#63344C_0%,_transparent_68%),linear-gradient(145deg,_#32232E,_#201B29_70%)] p-4 sm:p-6"
    >
      <figcaption className="mb-4 text-sm font-medium text-[#F5DAD9] sm:mb-5">
        Del link en bio a la compra
      </figcaption>

      <div className="grid gap-3 min-[460px]:grid-cols-[1.25fr_1fr] min-[460px]:items-center">
        <div className="overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#15131B] shadow-xl shadow-black/25">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-[#E5D9E3]">
            <Link2 aria-hidden="true" className="size-4 shrink-0 text-[#FFC3AD]" />
            <span className="break-all">hooks.store/tu-nombre</span>
          </div>
          <div className="p-3">
            <img
              src="/images/digital-products/mobile-photography-pack.webp"
              alt=""
              width={640}
              height={640}
              className="aspect-[3/2] w-full rounded-xl object-cover"
            />
            <div className="px-1 py-3">
              <p className="text-xs font-semibold text-[#FFC3AD]">Guía en PDF</p>
              <p className="mt-1 text-lg leading-tight font-semibold tracking-tight text-white">
                Fotografía móvil
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#D0C3D0]">
                Ideas y ajustes para hacer mejores fotos con tu teléfono.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-[#F9E1D7] bg-[#FFF3EA] p-4 text-[#221821] shadow-xl shadow-black/20 sm:p-5">
          <p className="text-sm font-semibold">Compra de ejemplo</p>
          <div className="mt-3 flex items-start gap-2.5 border-t border-[#E6CABF] pt-3">
            <CreditCard aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#984636]" />
            <div>
              <p className="text-xs font-semibold">Pago en tu tienda</p>
              <p className="mt-1 text-xs leading-relaxed text-[#59404A]">El comprador elige la guía y paga desde tu perfil.</p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2.5 border-t border-[#E6CABF] pt-3">
            <Download aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#984636]" />
            <div>
              <p className="text-xs font-semibold">Descarga del PDF</p>
              <p className="mt-1 text-xs leading-relaxed text-[#59404A]">El comprador recibe acceso después del pago.</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function LinkEnBio() {
  return (
    <div className="min-h-screen bg-[#110F14] text-[#FFF9F5]">
      <header className="border-b border-white/10">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8"
        >
          <a href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight">
            <img src="/images/icons/hooks-logo-96.png" alt="" width={32} height={32} />
            Hooks
          </a>
          <a href={LOGIN_URL} className="text-sm font-medium text-[#EADCE3] underline-offset-4 hover:underline">
            Iniciar sesión
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <section
          aria-labelledby="link-en-bio-title"
          className="grid items-center gap-8 py-10 sm:gap-10 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:py-20"
        >
          <div>
            <h1
              id="link-en-bio-title"
              className="text-[clamp(2.625rem,6vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.065em]"
            >
              Tu link en bio <span className="block text-[#FFC3AD]">también es tu tienda.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#E3D6E0] sm:text-lg">
              Vende productos digitales desde el perfil que ya compartes en Instagram o TikTok.
              Tu audiencia puede comprar un PDF, una plantilla o un ebook en tu página de Hooks.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8">
              <a href={REGISTER_URL} className={signupClassName}>
                Crea tu perfil gratis
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[#F5E9F0] underline-offset-4 hover:underline"
              >
                Cómo vender desde tu bio
                <ArrowDown aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            </div>
            <p className="mt-5 text-sm text-[#C1ACBC]">Para creadores en Colombia, España y México.</p>
          </div>

          <StorefrontExample />
        </section>

        <section
          id="como-funciona"
          aria-labelledby="como-funciona-title"
          className="scroll-mt-6 border-t border-white/10 pt-10 pb-12 sm:pt-12 sm:pb-16"
        >
          <h2 id="como-funciona-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            De tu primer archivo a tu primera venta
          </h2>
          <ol role="list" className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {steps.map(({ title, description }, index) => (
              <li key={title} className="border-t border-[#68414C] pt-4">
                <h3 className="flex gap-2.5 font-semibold">
                  <span aria-hidden="true" className="shrink-0 text-[#FFC3AD]">{index + 1}.</span>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#D9CAD6]">{description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-white/10 bg-[#211926] p-4 sm:px-5">
            <p className="max-w-2xl flex-1 basis-64 text-sm leading-relaxed text-[#E3D6E0]">
              Si un visitante necesita salir del navegador de TikTok, Hooks puede mostrarle cómo continuar en el navegador de su teléfono.
            </p>
            <a href={REGISTER_URL} className={signupClassName}>
              Crear mi perfil
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
