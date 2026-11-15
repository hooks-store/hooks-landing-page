/** @jsxRuntime automatic */
import { ArrowRight, Download, Link2 } from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../lib/registerUrl";

const steps = [
  {
    title: "Crea tu perfil en Hooks",
    description: "Elige tu nombre de usuario y personaliza la página que verá tu audiencia.",
  },
  {
    title: "Añade un producto digital",
    description: "Sube tu archivo, escribe una descripción y fija el precio. Puedes empezar con una guía en PDF, una plantilla o un ebook.",
  },
  {
    title: "Comparte tu link en la bio",
    description: "Pega el enlace de tu perfil en Instagram o TikTok. Tus seguidores pueden elegir el producto, pagar y acceder a su compra desde tu tienda.",
  },
];

export default function LinkEnBio() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="border-b border-white/10">
        <nav aria-label="Navegación principal" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight">
            <img src="/images/icons/hooks-logo-96.png" alt="" width={32} height={32} />
            Hooks
          </a>
          <a href={LOGIN_URL} className="text-sm font-medium text-zinc-300 underline-offset-4 hover:underline">
            Iniciar sesión
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <section aria-labelledby="link-en-bio-title" className="grid items-center gap-10 py-12 sm:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div>
            <h1 id="link-en-bio-title" className="max-w-2xl text-4xl leading-[1.07] font-semibold tracking-[-0.045em] sm:text-6xl">
              Tu link en bio para <span className="text-[#FFAD87]">vender productos digitales</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg">
              Convierte tu perfil de Instagram o TikTok en la entrada a tu tienda. Reúne tus enlaces y vende guías, plantillas o ebooks desde una página de Hooks.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a href={REGISTER_URL} className="inline-flex items-center gap-2 rounded-full bg-[#FFAD87] px-5 py-3 font-semibold text-[#17120F] transition-colors hover:bg-[#FFC1A6]">
                Crea tu perfil gratis
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a href="#como-funciona" className="py-2 text-sm font-medium text-zinc-300 underline-offset-4 hover:underline">
                Cómo funciona
              </a>
            </div>
            <p className="mt-5 text-sm text-zinc-400">Para creadores en Colombia, España y México.</p>
          </div>

          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#151515]">
            <figcaption className="flex items-center gap-2 border-b border-white/10 px-5 py-4 text-sm text-zinc-300">
              <Link2 aria-hidden="true" className="size-4 shrink-0 text-[#FFAD87]" />
              <span>Ejemplo de tienda en <span className="font-medium text-white">hooks.store/tu-nombre</span></span>
            </figcaption>
            <img
              src="/images/local-photos/photo-1507525428034-b723cf961d3e-640-f229e17b.jpg"
              alt=""
              width={640}
              height={425}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-5 sm:p-6">
              <p className="text-sm font-medium text-[#FFAD87]">Guía en PDF</p>
              <p className="mt-1 text-xl font-semibold tracking-tight">Fotografía móvil</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">Una guía para sacar mejores fotos con tu teléfono.</p>
              <p className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-zinc-300">
                <Download aria-hidden="true" className="size-4 shrink-0" />
                Descarga disponible después del pago
              </p>
            </div>
          </figure>
        </section>

        <section id="como-funciona" aria-labelledby="como-funciona-title" className="scroll-mt-6 border-t border-white/10 pt-10 pb-14 sm:pt-14 sm:pb-20">
          <h2 id="como-funciona-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cómo vender desde tu bio
          </h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {steps.map(({ title, description }, index) => (
              <li key={title} className="rounded-2xl border border-white/10 bg-[#151515] p-5">
                <h3 className="font-semibold">
                  <span className="mr-2 text-[#FFAD87]">{index + 1}.</span>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Si alguien abre tu enlace en TikTok y necesita salir del navegador de la app, Hooks puede mostrarle cómo continuar en su navegador.
          </p>
        </section>
      </main>
    </div>
  );
}
