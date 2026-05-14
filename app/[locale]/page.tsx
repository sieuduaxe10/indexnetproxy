import nextDynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { SmoothScrollProvider } from "@/components/ScrollSmothlyProvider";
import { FAQPageJsonLd } from "@/components/JsonLd/FAQPage";
import { fetchBranding } from "@/lib/api/branding";

// Async server components — `next/dynamic` is only for CLIENT components.
// Loading an async server component through next/dynamic produces a runtime
// "Cannot read properties of undefined (reading 'default')" once OpenNext's
// chunk resolver tries to await it. Import these directly instead.
import { Footer } from "@/components/Footer";
import { BlurBackground } from "@/components/BlurBackground";

// Branding is fetched per request from the incoming domain. The page must
// render dynamically so each reseller's CNAME serves their own branding.
export const dynamic = "force-dynamic";

// Client components below — safe to lazy-load via next/dynamic.
const Pricing = nextDynamic(
  () => import("@/components/Pricing").then((mod) => ({ default: mod.Pricing })),
  { ssr: true }
);
const CaseStudies = nextDynamic(
  () => import("@/components/CaseStudies").then((mod) => ({ default: mod.CaseStudies })),
  { ssr: true }
);
const TopCountries = nextDynamic(
  () => import("@/components/TopCountries").then((mod) => ({ default: mod.TopCountries })),
  { ssr: true }
);
const Contact = nextDynamic(
  () => import("@/components/Contact").then((mod) => ({ default: mod.Contact })),
  { ssr: true }
);
const FAQs = nextDynamic(
  () => import("@/components/FAQs").then((mod) => ({ default: mod.FAQs })),
  { ssr: true }
);
const Resellers = nextDynamic(
  () => import("@/components/Resellers").then((mod) => ({ default: mod.Resellers })),
  { ssr: true }
);
const Partnerships = nextDynamic(
  () => import("@/components/Partnerships").then((mod) => ({ default: mod.Partnerships })),
  { ssr: true }
);
const StickyExpandableList = nextDynamic(
  () => import("@/components/StickyExpandableList")
);


const FAQ_KEYS = ["q1", "q2", "q3", "q4"] as const;

const MainPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
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
