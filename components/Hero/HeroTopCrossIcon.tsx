"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroTopCrossIcon = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ---- Loop Effect (Mirror): 0 -> 360 -> 0, linear, infinite
    const spin = gsap.to(el, {
      rotate: 360,
      duration: 6, // pick a smooth cycle time
      ease: "none", // linear
      repeat: -1, // infinite
      yoyo: true, // mirror back
      transformOrigin: "50% 50%",
    });

    // ---- Scroll: Speed 90%
    // factor = 0.9 - 1 = -0.1  => move with scroll, but 10% slower
    const factor = -0.1;
    const baseY = 19; // matches your class translate-y-[19px]
    const setY = gsap.quickSetter(el, "y", "px");

    const st = ScrollTrigger.create({
      onUpdate: (self) => setY(baseY - self.scroll() * factor),
    });

    // initial position
    setY(baseY - window.scrollY * factor);

    return () => {
      spin.kill();
      st.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-[228px] left-[28px] translate-y-[19px] aspect-[1.01429] h-auto w-[28px] flex-none z-10 opacity-50 overflow-visible will-change-transform 4xl:bottom-auto 4xl:top-[198px] 4xl:left-[-41px] 4xl:w-[49px] 7xl:left-[74px]"
    >
      <div className="absolute">
        <Image
          src="/images/hero/hero-cross-icon.png"
          alt="netproxy cross icon"
          width={71}
          height={70}
          sizes="(min-width:1200px) 49px, (min-width:810px) 49px, 28px"
        />
      </div>
    </div>
  );
};

export default HeroTopCrossIcon;
