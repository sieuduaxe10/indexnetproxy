import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { FAQs } from "@/components/FAQs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Heder";
import { Hero } from "@/components/Hero";
import { Partnerships } from "@/components/Partnerships";
import { Pricing } from "@/components/Pricing";
import { Resellers } from "@/components/Resellers";
import { TopCountries } from "@/components/TopCountries";
import { TrustedBy } from "@/components/TrustedBy";

const MainPage = () => {
  return (
    <main>
      <Header />
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
    </main>
  );
};

export default MainPage;
