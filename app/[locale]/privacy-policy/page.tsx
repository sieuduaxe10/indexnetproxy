import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import Privacy from "@/components/Privacy";
import { routing } from "@/i18n/routing";
import { generateDynamicMetadata } from "@/lib/metadata/generate";

// Per-request: metadata depends on the reseller's branding (title /
// description / OG image) so the page can't be prerendered without a Host.
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
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  return generateDynamicMetadata(
    { title: t("title"), description: t("description") },
    { path: "/privacy-policy", locale }
  );
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Header />
      <Privacy />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
}
