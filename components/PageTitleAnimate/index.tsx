"use client";

import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

export interface PageTitleAnimateProps {
  firstColorTitle: string;
  secondColorTitle?: string;
}

gsap.registerPlugin(SplitText);

export const PageTitleAnimate = (props: PageTitleAnimateProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    // 1. Select all <span> characters
    const letters = headerRef.current.querySelectorAll("span");

    // 2. Set the transform origin to the center of each letter
    letters.forEach((el) => {
      gsap.set(el, { transformOrigin: "center center" });
    });

    // 3. Animate each one with the precise Framer settings
    gsap.fromTo(
      letters,
      // GSAP 'from' state: Framer 'Enter' effect
      {
        opacity: 0.2, // Framer: opacity: 0.2
        scale: 0.4, // Framer: scale: 0.4
      },
      // GSAP 'to' state: Final state (full size, fully visible)
      {
        opacity: 1,
        scale: 1,
        // Framer 'ease config': time: 0.1
        duration: 0.1,
        // Framer 'ease config': delay: 0.075 maps to stagger delay
        stagger: 0.075,
        // Framer 'ease config': bezier: 0.44,0,0.56,1
        ease: "cubic-bezier(0.44, 0, 0.56, 1)",
      }
    );
  }, []);

  return (
    <div>
      <div>
        <h1
          ref={headerRef}
          className="text-center font-neue-kaine font-bold mb-5 tracking-normal"
        >
          {props.firstColorTitle.split("").map((char, i) => {
            return (
              <span
                key={`1-${i}-${char}`}
                className={`h-12 inline-block text-33 4xl:text-38 7xl:text-40 text-[#fc833d]`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
          {props.secondColorTitle && (
            <span
              key="middle-space"
              className={`h-12 inline-block text-33 4xl:text-38 7xl:text-40`}
            >
              {"\u00A0"}
            </span>
          )}

          {props.secondColorTitle &&
            props.secondColorTitle.split("").map((char, i) => {
              return (
                <span
                  key={`2-${i}-${char}`}
                  className={`h-12 inline-block text-33 4xl:text-38 7xl:text-40 text-[#00a7e6]`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
        </h1>
      </div>
    </div>
  );
};

export default PageTitleAnimate;
