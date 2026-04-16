import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import TermService from "@/components/TermService";
import { buildAlternates } from "@/lib/metadata/alternates";

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.term" });
  const alternates = buildAlternates("/term-service", locale);
  return {
    title: t("title"),
    description: t("description"),
    alternates,
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: alternates.canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

const TermServicePage = () => {
  return (
    <main>
      <Header />
      <TermService />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
};

export default TermServicePage;
