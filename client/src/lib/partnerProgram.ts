import type { SupportedLocale } from "@/contexts/LanguageContext";

// Shared by the partner page and the Partner Program Agreement so the terms stay in sync.
export const PLAN_PRICE_CENTS = { pro: 1499, growth: 9900 };
export const STANDARD_RATE_PERCENT = 30;
export const FOUNDING_RATE_PERCENT = 40;
export const COOKIE_DAYS = 90;
export const REFUND_WINDOW_DAYS = 30;
export const PAYOUT_THRESHOLD_CENTS = 5000;
export const FOUNDING_SLOTS = 15;
export const PARTNER_AGREEMENT_PATH = "/partners/agreement";

export function formatUsd(cents: number, locale: SupportedLocale) {
  const amount = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(cents / 100);

  return `$${amount}`;
}
