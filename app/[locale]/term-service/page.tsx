import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import TermService from "@/components/TermService";
import { routing } from "@/i18n/routing";
import { generateDynamicMetadata } from "@/lib/metadata/generate";

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
  const t = await getTranslations({ locale, namespace: "legal.term" });
  return generateDynamicMetadata(
    { title: t("title"), description: t("description") },
    { path: "/term-service", locale }
  );
}

export default async function TermServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Header />
      <TermService />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
}
