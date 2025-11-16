import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import CookiePolicy from "@/components/CookiePolicy";

export const runtime = 'edge';

const CookiePolicyPage = () => {
  return (
    <main>
      <Header />
      <CookiePolicy />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
};

export default CookiePolicyPage;
