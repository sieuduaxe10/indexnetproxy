"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

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

  const text = " Residential Proxies P2P The best Proxy solution for MMO";
  return (
    <section className="container mx-auto relative pt-[168px] 7xl:pt-[172px]">
      <div className="hero-wrapper relative">
        <div className="hero-title-wrapper">
          <div className="hero-title">
            <h1
              ref={headerRef}
              className="text-[40px] text-center font-neue-kaine font-bold"
            >
              {text.split("").map((char, i) => {
                const isMMO = i >= text.length - 3; // Last 3 characters are "MMO"
                const isProxiesP2P =
                  i >= text.indexOf("Proxies") && i < text.indexOf("P2P") + 3; // "Proxies P2P"
                const isAfterP2P = i === text.indexOf("P2P") + 3; // Position after "P2P"
                return (
                  <>
                    <span
                      key={i}
                      className={`inline-block ${
                        isMMO ? "text-blue-500" : ""
                      } ${isProxiesP2P ? "text-orange-500" : ""}`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                    {isAfterP2P && <br />}
                  </>
                );
              })}
            </h1>
            <p className="mx-auto text-[15px] leading-[25.5px] font-inter font-normal text-[rgb(87,96,117)] text-center break-words w-[768px] h-[51px] antialiased">
              With over 62 million proxy IPs across more than 220 countries and
              cities, we provide seamless, secure, and reliable proxy solutions
              for all your online needs.
            </p>
            <div className="center mx-auto gap-2 flex-row">
              <Button size="lg" className="get-started-button">
                GET STARTED
              </Button>
              <Button variant={"outline"}>VIEW PRICE - AT $0.99</Button>
            </div>
          </div>
        </div>
        <div className="hero-animation-wrapper relative">
          <div className="w-[840px] h-[478px] absolute top-0 l-[calc(46.9741% - 420px)]">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={206}
              height={129}
              className="absolute inset-0 rounded-lg"
            />
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={206}
              height={129}
              className="absolute inset-0 rounded-lg"
            />
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={206}
              height={129}
              className="absolute inset-0 rounded-lg"
            />

            <Image
              src="/images/hero/goose.png"
              alt="Hero Image"
              width={206}
              height={129}
              className="absolute inset-0 rounded-lg"
            />
          </div>
        </div>
        <div className="hero-footer-wrapper">
          <div className="hero-footer">
            <div>
              <div>Proxy Transparent</div>
              <p>
                A transparent proxy boosts security and enhances connection
                performance.
              </p>
            </div>

            <div>
              <div>No Logs Kept</div>
              <p>
                Our no-logs policy ensures privacy by not recording your
                activities, keeping your data secure and your browsing private.
              </p>
            </div>

            <div>
              <div>Fast Connection</div>
              <p>
                Enjoy lightning-fast speeds with our optimized proxy service.
                Reduced latency and improved response times provide seamless
                browsing, streaming, and smooth online performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
