"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export const FloatingCircle = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;

    // custom cubic-bezier ease from your config
    const customEase = "cubic-bezier(0.58, 0.17, 0.32, 0.9)";

    // create infinite up-down loop
    gsap.to(el, {
      y: -25, // move up
      duration: 1.3, // half of 2.6s total (up + down)
      ease: customEase,
      yoyo: true, // mirror back
      repeat: -1, // infinite
      repeatDelay: 0, // no delay between repeats
      delay: 0.2, // start delay (from your config)
    });
  }, []);

  return (
    <div
      ref={circleRef}
      className="absolute will-change-auto opacity-60 rotate-149 translate-x-[-50%] translate-y-[-50%] w-[59px] h-[59px] top-[172px] left-[50%] z-10"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/round-orange.png"
          alt="netproxy circle decor"
          width={59}
          height={59}
          sizes="(min-width:1200px) 59px, (min-width:810px) 39px, 28px"
          className="object-cover w-[59px] h-[59px]"
        />
      </div>
    </div>
  );
};
