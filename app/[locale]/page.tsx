import { getTranslations } from "next-intl/server";
import { BlurBackground } from "@/components/BlurBackground";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { FAQs } from "@/components/FAQs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partnerships } from "@/components/Partnerships";
import { Pricing } from "@/components/Pricing";
import { Resellers } from "@/components/Resellers";
import { SmoothScrollProvider } from "@/components/ScrollSmothlyProvider";
import StickyExpandableList from "@/components/StickyExpandableList";
import { TopCountries } from "@/components/TopCountries";
import { TrustedBy } from "@/components/TrustedBy";
import { FAQPageJsonLd } from "@/components/JsonLd/FAQPage";
import { fetchBranding } from "@/lib/api/branding";

export const runtime = "edge";

const FAQ_KEYS = ["q1", "q2", "q3", "q4"] as const;

const MainPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const [t, branding] = await Promise.all([
    getTranslations({ locale, namespace: "faqs.questions" }),
    fetchBranding(),
  ]);
  const businessName = branding?.businessName || "NetProxy.io";
  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`${key}.question`, { business_name: businessName }),
    answer: t(`${key}.answer`, { business_name: businessName }),
  }));

  return (
    <main>
      <FAQPageJsonLd items={faqItems} />
      <Header />
      <SmoothScrollProvider speedMultiplier={0.8}>
        <Hero />
        <TrustedBy />
        <Pricing />
        <CaseStudies />
        <TopCountries />
        <Contact />
        <FAQs />
        <Resellers />
        <Footer />
        <Partnerships />
      </SmoothScrollProvider>
      <BlurBackground />
      <StickyExpandableList />
    </main>
  );
};

export default MainPage;
