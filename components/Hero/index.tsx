"use client";
import { Button } from "../ui/button";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { CursorIcon } from "../icons/CursorIcon";
import { MessageIcon } from "../icons/MessageIcon";
import { BlueNetworkIcon } from "../icons/BlueNetworkIcon";
import { WifiIcon } from "../icons/WifiIcon";
import { FloatingCircle } from "./FloatingCircle";
import { MainHero } from "./MainHero";
import { Particle } from "./Particle";

gsap.registerPlugin(SplitText);

export const Hero = () => {
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

  const text = "Residential Proxies P2P The best Proxy solution for MMO";
  return (
    <section className="w-svw pt-[172px] px-10 pb-8 relative" id="hero">
      <div className="container">
        {/* round icon orange  */}
        <FloatingCircle />
        <MainHero />

        <div className="flex flex-col gap-[507px] z-20">
          <div>
            <h1
              ref={headerRef}
              className="text-center font-neue-kaine font-bold mb-5"
            >
              {text.split("").map((char, i) => {
                const isLastChar = i === text.length - 1;
                const isMMO = i >= text.length - 3 && !isLastChar; // Last 3 characters are "MMO"
                const isProxiesP2P =
                  i >= text.indexOf("Proxies") && i < text.indexOf("P2P") + 3; // "Proxies P2P"
                const isAfterP2P = i === text.indexOf("P2P") + 3; // Position after "P2P"
                return (
                  <>
                    <span
                      key={i}
                      className={`inline-block text-40 text-[#2b303b] ${
                        isMMO ? "text-[#00a7e6]!" : ""
                      } ${isProxiesP2P ? "text-orange-500" : ""} ${isLastChar ? "text-[#1acda5]!" : ""}`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                    {isAfterP2P && <br />}
                  </>
                );
              })}
            </h1>
            <p className="mx-auto text-[15px] leading-[25.5px] font-inter font-normal text-[#576075] text-center wrap-break-words w-3xl mb-5 h-[51px] antialiased">
              With over 62 million proxy IPs across more than 220 countries and
              cities, we provide seamless, secure, and reliable proxy solutions
              for all your online needs.
            </p>
            <div className="w-fit mx-auto flex-row center gap-4">
              <Button size="lg" className="get-started-button h-14">
                GET STARTED{" "}
                <p className="w-5 h-5">
                  <CursorIcon />
                </p>
              </Button>
              <Button className="h-14" variant={"secondary"}>
                VIEW PRICE - AT $0.99
              </Button>
            </div>
          </div>

          <div className="flex flex-row gap-8 z-20">
            <div className="bg-[#fafcfc] rounded-2xl pt-16 px-8 pb-8 flex-1 self-stretch relative">
              <div className="w-20 h-20 absolute -top-[50px] left-1/2 -translate-x-1/2">
                <MessageIcon width={80} height={80} />
              </div>
              <div className="text-21 font-neue-kaine-bold text-center text-[#2b303b]">
                Proxy Transparent
              </div>
              <p className="text-15 text-[#576075] text-center mt-2">
                A transparent proxy boosts security and enhances connection
                performance.
              </p>
            </div>

            <div className="bg-[#fafcfc] rounded-2xl pt-16 px-8 pb-8 flex-1 self-stretch relative">
              <div className="w-20 h-20 absolute -top-[50px] left-1/2 -translate-x-1/2">
                <BlueNetworkIcon width={80} height={80} />
              </div>
              <div className="text-21 font-neue-kaine-bold text-center text-[#2b303b]">
                No Logs Kept
              </div>
              <p className="text-15 text-[#576075] text-center mt-2">
                Our no-logs policy ensures privacy by not recording your
                activities, keeping your data secure and your browsing private.
              </p>
            </div>

            <div className="bg-[#fafcfc] rounded-2xl pt-16 px-8 pb-8 flex-1 self-stretch relative">
              <div className="w-20 h-20 absolute -top-[50px] left-1/2 -translate-x-1/2">
                <WifiIcon width={80} height={80} />
              </div>
              <div className="text-21 font-neue-kaine-bold text-center text-[#2b303b]">
                Fast Connection
              </div>
              <p className="text-15 text-[#576075] text-center mt-2">
                Enjoy lightning-fast speeds with our optimized proxy service.
                Reduced latency and improved response times provide seamless
                browsing, streaming, and smooth online performance.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Particle />
    </section>
  );
};
