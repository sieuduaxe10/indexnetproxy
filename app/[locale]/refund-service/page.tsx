import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import RefundService from "@/components/RefundService";

export const runtime = 'edge';

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
