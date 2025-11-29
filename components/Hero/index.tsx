import dynamic from "next/dynamic";
import { MainHero } from "./MainHero";
import TwoLayerParticles from "./TwoLayerParticles";

const HeroTextContent = dynamic(() => import("./HeroTextContent"), {
  loading: () => null,
  ssr: true,
});

export const Hero = () => {
  return (
    <section
      className="order-1 flex flex-col items-center gap-0 flex-none w-full h-min pt-[140px] px-5 pb-8 4xl:pt-[168px] 4xl:px-10 7xl:pt-[172px] relative z-20 overflow-visible"
      id="hero"
    >
      {/* <div className="container relative z-20"> */}
      <MainHero />

      <HeroTextContent />
      {/* </div> */}
      <TwoLayerParticles />
      <div className="absolute top-0 left-0 right-0 h-[438px] z-10 flex-none pointer-events-none overflow-hidden bg-[linear-gradient(#fff_80%,#fff0_100%)]"></div>
    </section>
  );
};
