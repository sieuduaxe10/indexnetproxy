import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import ResellerProgram from "@/components/ResellerProgram";
import { buildAlternates } from "@/lib/metadata/alternates";

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

const ResellerProgramPage = () => {
  return (
    <main>
      <Header />
      <ResellerProgram />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
};

export default ResellerProgramPage;
