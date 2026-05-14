import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { generateDynamicMetadata } from "@/lib/metadata/generate";
import { fetchBranding } from "@/lib/api/branding";
import { BrandingProvider } from "@/lib/branding/context";
import { OrganizationJsonLd } from "@/components/JsonLd/Organization";
import { WebSiteJsonLd } from "@/components/JsonLd/WebSite";

// Runtime per-request branding: one Worker deploy serves every reseller's
// domain, and we read Host on each request to pick the right branding.
// `force-dynamic` opts out of static rendering at the layout level so the
// branding fetch is never frozen into prerendered HTML. We do NOT set
// `runtime = "edge"` here — that would conflict with `generateStaticParams`
// (Next forbids the pairing). OpenNext Workers serves the whole app on edge
// regardless, so the runtime hint is unnecessary.
export const dynamic = "force-dynamic";

// Still emit static params so next-intl can discover the locale list at build
// time. The actual page render happens per-request because of force-dynamic.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = (typeof routing.locales)[number];
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [t, branding] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    fetchBranding(),
  ]);
  const businessName = branding?.businessName || "NetProxy.io";

  // Generate metadata with reseller detection
  // Returns reseller OG metadata if from reseller domain, otherwise uses locale metadata
  return generateDynamicMetadata(
    {
      title: t("title"),
      description: t("description", { business_name: businessName }),
    },
    { path: "", locale }
  );
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale's tree.
  setRequestLocale(locale);

  const [messages, branding] = await Promise.all([
    getMessages(),
    fetchBranding(),
  ]);

  console.log("[Layout] branding result:", JSON.stringify(branding));

  return (
    <NextIntlClientProvider messages={messages}>
      <BrandingProvider branding={branding}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </BrandingProvider>
    </NextIntlClientProvider>
  );
}
