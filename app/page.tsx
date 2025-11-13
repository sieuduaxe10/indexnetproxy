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
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { TopCountries } from "@/components/TopCountries";
import { TrustedBy } from "@/components/TrustedBy";

const MainPage = () => {
  return (
    <main>
      <Header />
      <SmoothScrollProvider ease={0.1} speedMultiplier={0.7}>
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
        <BlurBackground />
      </SmoothScrollProvider>
    </main>
  );
};

export default MainPage;
