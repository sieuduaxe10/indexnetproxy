import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { generateDynamicMetadata } from "@/lib/metadata/generate";
import { fetchBranding } from "@/lib/api/branding";
import { BrandingProvider } from "@/lib/branding/context";

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
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
  return generateDynamicMetadata({
    title: t("title"),
    description: t("description", { business_name: businessName }),
  });
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
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const [messages, branding] = await Promise.all([
    getMessages(),
    fetchBranding(),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <BrandingProvider branding={branding}>
        {children}
      </BrandingProvider>
    </NextIntlClientProvider>
  );
}
