import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import Privacy from "@/components/Privacy";

export const runtime = "edge";

const PrivacyPolicyPage = () => {
  return (
    <main>
      <Header />
      <Privacy />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
};

export default PrivacyPolicyPage;
