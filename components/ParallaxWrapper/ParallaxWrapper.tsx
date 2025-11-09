// components/ParallaxWrapper.tsx
"use client";

import { useEffect, useRef, PropsWithChildren } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type Props = PropsWithChildren<{ speed?: number; className?: string }>;

export default function ParallaxWrapper({
  speed = 1.0,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const factor = speed - 1;
    const setY = gsap.quickSetter(el, "y", "px");

    const st = ScrollTrigger.create({
      onUpdate: (self) => setY(-self.scroll() * factor),
    });

    setY(-window.scrollY * factor);
    return () => st.kill();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
