import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import TermService from "@/components/TermService";

export const runtime = 'edge';

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
