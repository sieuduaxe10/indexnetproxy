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

export const runtime = "edge";

const MainPage = () => {
  return (
    <main>
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
