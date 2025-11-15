import Image from "next/image";
import { CloudImage } from "./CloudImage";
import { MonitorImage } from "./MonitorImage";
import { MainCharacter } from "./MainCharacter";
import ParallaxWrapper from "../ParallaxWrapper/ParallaxWrapper";
import HeroGlobeIcon from "./HeroGlobeIcon";
import HeroTopCrossIcon from "./HeroTopCrossIcon";
import { useResponsive } from "@/hooks/useResponsive";
export const MainHero = () => {
  const { isDesktop } = useResponsive();
  return (
    <div className="w-[1041px] 4xl:h-[568px] 7xl:h-[632px] absolute 4xl:top-[235px] 7xl:bottom-[230px] left-[calc(50%-520.5px)] z-10 user-select-none overflow-hidden">
      <CloudImage />
      {/*  main Image*/}
      <div className="w-[840px] h-[478px] absolute bottom-0 left left-[calc(46.9741%-420px)] overflow-visible">
        <MonitorImage />
        {/* Goose Character */}
        <MainCharacter />
        {/* Block 1 (106%) */}
        <ParallaxWrapper
          speed={1.06}
          className="absolute z-10 top-[41%] left-[30%] 7xl:left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] h-auto w-[206px] opacity-100 will-change-transform"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={isDesktop ? 206 : 186}
              height={isDesktop ? 130 : 117}
            />
          </div>
        </ParallaxWrapper>

        {/* Block 2 (103%) */}
        <ParallaxWrapper
          speed={1.03}
          className="absolute z-10 top-[55%] left-[30%] 7xl:left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] h-auto w-[206px] opacity-100 will-change-transform"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={isDesktop ? 206 : 186}
              height={isDesktop ? 130 : 117}
            />
          </div>
        </ParallaxWrapper>
        {/* Block 3 */}
        <div className="absolute z-10 top-[69%] left-[30%] 7xl:left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] h-auto w-[206px] opacity-100 will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={isDesktop ? 206 : 186}
              height={isDesktop ? 130 : 117}
            />
          </div>
        </div>
      </div>
      {/* Decorator */}
      <div className="">
        {/* HeroGlobe Icon */}
        <HeroGlobeIcon />
        {/* Hero cross top icon big */}
        <HeroTopCrossIcon />
        {/* Hero round icon orange bottom */}
        <ParallaxWrapper
          speed={1.2}
          className="absolute bottom-[-99px] left-[334px] rotate-149 aspect-[1] h-auto w-[39px] flex-none opacity-80 overflow-visible will-change-transform"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-round-icon.png"
              alt="netproxy round orange icon"
              width={59}
              height={59}
              className=""
            />
          </div>
        </ParallaxWrapper>
        {/* Hero play icon */}
        <ParallaxWrapper
          speed={1.3}
          className="absolute -bottom-20 left-[942px] translate-y-[0px] rotate-[-30deg] aspect-[1.12097] h-auto w-[39px] opacity-100 overflow-visible will-change-transform"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-play-icon.png"
              alt="netproxy play icon"
              width={39}
              height={35}
              className=""
            />
          </div>
        </ParallaxWrapper>
        {/* Hero round icon bottom left medium */}

        <ParallaxWrapper
          speed={1.4}
          className="absolute bottom-[-122px] left-[150px] rotate-[-30deg] aspect-[1.01429] h-auto w-[31px] z-10 opacity-50 overflow-visible will-change-transform"
        >
          <div className="absolute">
            <Image
              src="/images/hero/hero-cross-icon-medium.png"
              alt="netproxy cross icon"
              width={31}
              height={31}
              className=""
            />
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
};
