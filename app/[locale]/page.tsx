import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { SmoothScrollProvider } from "@/components/ScrollSmothlyProvider";
import { FAQPageJsonLd } from "@/components/JsonLd/FAQPage";
import { fetchBranding } from "@/lib/api/branding";

// Lazy load below-the-fold sections to reduce initial bundle size
const Pricing = dynamic(
  () => import("@/components/Pricing").then((mod) => ({ default: mod.Pricing })),
  { ssr: true }
);
const CaseStudies = dynamic(
  () => import("@/components/CaseStudies").then((mod) => ({ default: mod.CaseStudies })),
  { ssr: true }
);
const TopCountries = dynamic(
  () => import("@/components/TopCountries").then((mod) => ({ default: mod.TopCountries })),
  { ssr: true }
);
const Contact = dynamic(
  () => import("@/components/Contact").then((mod) => ({ default: mod.Contact })),
  { ssr: true }
);
const FAQs = dynamic(
  () => import("@/components/FAQs").then((mod) => ({ default: mod.FAQs })),
  { ssr: true }
);
const Resellers = dynamic(
  () => import("@/components/Resellers").then((mod) => ({ default: mod.Resellers })),
  { ssr: true }
);
const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => ({ default: mod.Footer })),
  { ssr: true }
);
const Partnerships = dynamic(
  () => import("@/components/Partnerships").then((mod) => ({ default: mod.Partnerships })),
  { ssr: true }
);
const BlurBackground = dynamic(
  () => import("@/components/BlurBackground").then((mod) => ({ default: mod.BlurBackground }))
);
const StickyExpandableList = dynamic(
  () => import("@/components/StickyExpandableList")
);


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
