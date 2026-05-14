import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import ResellerProgram from "@/components/ResellerProgram";
import { routing } from "@/i18n/routing";
import { fetchBranding } from "@/lib/api/branding";
import { generateDynamicMetadata } from "@/lib/metadata/generate";

// Per-request: page must inspect Host to decide whether to serve. Reseller
// domains shouldn't expose the "become a NetProxy reseller" page to their
// own end users.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const branding = await fetchBranding();

  // Don't emit metadata for a page that returns 404 — keeps social
  // crawlers honest if they hit /reseller-program on a reseller domain.
  if (branding && !branding.isPlatform) {
    return { title: "Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "resellerProgram" });
  return generateDynamicMetadata(
    { title: t("seoTitle"), description: t("seoDescription") },
    { path: "/reseller-program", locale }
  );
}

export default async function ResellerProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const branding = await fetchBranding();
  // Reseller domain → page doesn't exist.
  // Branding null (backend unreachable, etc.) → fall through and serve the
  // page; treating an outage as "hide it" would be a worse UX than rendering
  // marketing copy meant for the platform.
  if (branding && !branding.isPlatform) {
    notFound();
  }

  return (
    <main>
      <Header />
      <ResellerProgram />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
}
