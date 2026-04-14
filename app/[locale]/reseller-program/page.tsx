import { BlurBackground } from "@/components/BlurBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Partnerships } from "@/components/Partnerships";
import ResellerProgram from "@/components/ResellerProgram";

export const runtime = "edge";

export const metadata = {
  title: "Reseller Program — Start a Proxy Business with $0 | NetProxy",
  description:
    "Join the NetProxy Reseller Program. Zero startup cost, white-label branding, passive income, and hands-on support. Turn proxies into your own business today.",
};

const ResellerProgramPage = () => {
  return (
    <main>
      <Header />
      <ResellerProgram />
      <Footer />
      <Partnerships />
      <BlurBackground />
    </main>
  );
};

export default ResellerProgramPage;
