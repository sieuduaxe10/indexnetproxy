"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MonitorImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 120% scroll speed => moves 20% faster than page
    const speedMultiplier = 1.2;
    const factor = speedMultiplier - 1; // 0.2

    // super-performant setter (avoids layout thrash)
    const setY = gsap.quickSetter(el, "y", "px");

    // update y on every scroll lifecycle tick
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        // move opposite to scroll (parallax up on scroll down)
        setY(-self.scroll() * factor);
      },
    });

    // set initial position
    setY(-window.scrollY * factor);

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute top-[21%] left-[49%] translate-x-[-50%] translate-y-[-50%] aspect-[0.867374] h-auto w-[153px] opacity-100 will-change-transform"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/monitor-icon.avif"
          alt="netproxy monitor icon"
          width={153}
          height={176}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};
