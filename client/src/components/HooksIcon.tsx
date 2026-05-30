import { useLanguage } from "@/contexts/LanguageContext";

export function HooksIcon({ size = 32 }: { size?: number }) {
  const { locale } = useLanguage();

  return (
    <img
      src="/images/icons/hooks-logo-96.png"
      alt={locale === "es" ? "Logo de Hooks" : "Hooks logo"}
      width={size}
      height={size}
      className="object-contain shrink-0"
    />
  );
}

export function HooksLogo() {
  return (
    <div className="flex items-center gap-2">
      <HooksIcon size={32} />
      <span className="text-white text-[22px] font-bold tracking-tight">Hooks</span>
    </div>
  );
}
