"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

const CloudImage = dynamic(() =>
  import("./CloudImage").then((mod) => ({ default: mod.CloudImage }))
);
const MonitorImage = dynamic(
  () => import("./MonitorImage").then((mod) => ({ default: mod.MonitorImage })),
  { ssr: false }
);
const MainCharacter = dynamic(() =>
  import("./MainCharacter").then((mod) => ({ default: mod.MainCharacter }))
);
const ParallaxWrapper = dynamic(
  () => import("../ParallaxWrapper/ParallaxWrapper"),
  { ssr: false }
);
const HeroGlobeIcon = dynamic(() => import("./HeroGlobeIcon"));
const HeroTopCrossIcon = dynamic(() => import("./HeroTopCrossIcon"), {
  ssr: false,
});

export const MainHero = () => {
  const { isMobile } = useResponsive();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Defer to the next tick to avoid synchronous setState warnings
    const id = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Default to mobile layout for initial SSR/client pass to avoid hydration mismatches.
  const renderAsMobile = hasMounted ? isMobile : true;

  return (
    <div className="absolute top-[485px] left-0 right-0 h-[449px] w-auto flex-none z-20 user-select-none overflow-hidden 4xl:top-[318px] 4xl:h-[568px] 7xl:top-auto 7xl:bottom-[278px] 7xl:left-[calc(50%-520.5px)] 7xl:right-auto 7xl:w-[1041px] 7xl:h-[632px]">
      <CloudImage />
      {/*  main Image*/}
      <div className="absolute bottom-10 4xl:-bottom-5 7xl:bottom-0 left-[calc(41.4286%-196px)] 4xl:left-[calc(50%-405px)] 7xl:left-[calc(46.9741%-420px)] w-[392px] 4xl:w-[810px] 7xl:w-[840px] h-[436px] 4xl:h-[462px] 7xl:h-[478px] overflow-visible">
        {renderAsMobile ? (
          <div className="absolute top-[34%] left-[31%] translate-x-[-50%] translate-y-[-50%] aspect-[0.867374] h-auto w-36 opacity-100 4xl:top-auto 4xl:bottom-[236px] 4xl:left-1/2 4xl:w-[139px] 4xl:translate-x-[-50%] 4xl:translate-y-[-52px] 4xl:will-change-transform 7xl:top-[2.548%] 7xl:bottom-auto 7xl:left-[39.85%] 7xl:w-[153px] 7xl:translate-x-[-50%] 7xl:translate-y-[calc(-50%-52px)] 7xl:will-change-transform">
            <MonitorImage />
          </div>
        ) : (
          <ParallaxWrapper
            speed={1.1}
            className="absolute top-[34%] left-[31%] translate-x-[-50%] translate-y-[-50%] aspect-[0.867374] h-auto w-36 opacity-100 4xl:top-auto 4xl:bottom-[236px] 4xl:left-1/2 4xl:w-[139px] 4xl:translate-x-[-50%] 4xl:translate-y-[-52px] 4xl:will-change-transform 7xl:top-[2.548%] 7xl:bottom-auto 7xl:left-[39.85%] 7xl:w-[153px] 7xl:translate-x-[-50%] 7xl:translate-y-[calc(-50%-52px)] 7xl:will-change-transform"
          >
            <MonitorImage />
          </ParallaxWrapper>
        )}
        {/* Goose Character */}
        <MainCharacter />
        {/* Block 1 (106%) */}
        <ParallaxWrapper
          speed={1.06}
          className="hidden 4xl:block absolute z-10 top-[41%] left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498]  opacity-100 will-change-transform w-[186px] h-[117px] 4xl:w-[206px] 4xl:h-[130px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.webp"
              alt="netproxy Hero Image"
              width={206}
              height={130}
              sizes="(min-width:1200px) 206px, (min-width:810px) 206px, 186px"
            />
          </div>
        </ParallaxWrapper>

        {/* Block 2 (103%) */}
        <ParallaxWrapper
          speed={1.03}
          className="hidden 4xl:block absolute z-10 top-[55%] left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] opacity-100 will-change-transform w-[186px] h-[117px] 4xl:w-[206px] 4xl:h-[130px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.webp"
              alt="netproxy Hero Image"
              width={206}
              height={130}
              sizes="(min-width:1200px) 206px, (min-width:810px) 206px, 186px"
            />
          </div>
        </ParallaxWrapper>
        {/* Block 3 */}
        <div className="hidden 4xl:block absolute z-10 top-[69%] left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] opacity-100 will-change-transform w-[186px] h-[117px] 4xl:w-[206px] 4xl:h-[130px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.webp"
              alt="netproxy Hero Image"
              width={206}
              height={130}
              sizes="(min-width:1200px) 206px, (min-width:810px) 206px, 186px"
            />
          </div>
        </div>
      </div>
      {/* Decorator */}
      <div>
        {/* HeroGlobe Icon */}
        <HeroGlobeIcon />
        {/* Hero cross top icon big */}
        <HeroTopCrossIcon />
        {/* Hero round icon orange bottom */}
        <ParallaxWrapper
          speed={1.2}
          className="absolute bottom-[-33px] left-[125px] rotate-149 aspect-[1] h-auto w-[28px] flex-none opacity-80 overflow-visible will-change-transform 4xl:bottom-[-163px] 4xl:left-[219px] 4xl:w-[39px] 7xl:bottom-[-99px] 7xl:left-[334px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-round-icon.png"
              alt="netproxy round orange icon"
              width={59}
              height={59}
              sizes="(min-width:1200px) 59px, (min-width:810px) 39px, 28px"
            />
          </div>
        </ParallaxWrapper>
        {/* Hero play icon */}
        <ParallaxWrapper
          speed={1.3}
          className="absolute bottom-[-39px] left-[94%] translate-x-[-50%] rotate-[-30deg] aspect-[1.12097] h-auto w-[28px] opacity-100 overflow-visible will-change-transform 4xl:bottom-[-144px] 4xl:left-auto 4xl:right-[-56px] 4xl:translate-x-0 4xl:w-[39px] 7xl:bottom-[-80px] 7xl:left-[942px] 7xl:right-auto 7xl:translate-x-0"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-play-icon.png"
              alt="netproxy play icon"
              width={39}
              height={35}
              sizes="(min-width:1200px) 39px, (min-width:810px) 39px, 28px"
            />
          </div>
        </ParallaxWrapper>
        {/* Hero round icon bottom left medium */}

        <ParallaxWrapper
          speed={1.4}
          className="absolute bottom-[-42px] left-1/2 translate-x-[-50%] translate-y-[-147.6px] rotate-[-30deg] aspect-[1.01429] h-auto w-7 z-10 opacity-50 overflow-visible will-change-transform 4xl:bottom-[-188px] 4xl:left-[35px] 4xl:translate-x-0 4xl:w-[31px] 7xl:bottom-[-122px] 7xl:left-[150px]"
        >
          <div className="absolute">
            <Image
              src="/images/hero/hero-cross-icon-medium.png"
              alt="netproxy cross icon"
              width={31}
              height={31}
              sizes="(min-width:1200px) 31px, (min-width:810px) 31px, 28px"
            />
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
};
