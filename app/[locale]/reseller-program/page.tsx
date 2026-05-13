import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import ResellerProgram from "@/components/ResellerProgram";
import { buildAlternates } from "@/lib/metadata/alternates";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resellerProgram" });
  const alternates = buildAlternates("/reseller-program", locale);
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates,
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: alternates.canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seoTitle"),
      description: t("seoDescription"),
    },
  };
}

export default async function ResellerProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
