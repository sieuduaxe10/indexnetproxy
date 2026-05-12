import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import RefundService from "@/components/RefundService";
import { buildAlternates } from "@/lib/metadata/alternates";

export const runtime = "edge";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.refund" });
  const alternates = buildAlternates("/refund-service", locale);
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

const RefundServicePage = () => {
  return (
    <main>
      <Header />
      <RefundService />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
};

export default RefundServicePage;
