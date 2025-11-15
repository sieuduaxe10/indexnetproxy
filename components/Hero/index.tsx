"use client";
import { Button } from "../ui/button";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { JSX, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { CursorIcon } from "../icons/CursorIcon";
import { MessageIcon } from "../icons/MessageIcon";
import { BlueNetworkIcon } from "../icons/BlueNetworkIcon";
import { WifiIcon } from "../icons/WifiIcon";
import { FloatingCircle } from "./FloatingCircle";
import { MainHero } from "./MainHero";
import TwoLayerParticles from "./TwoLayerParticles";

gsap.registerPlugin(SplitText);

export const Hero = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
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

  // Use translation for the main title
  const text = t("title") + " " + t("subtitle");
  return (
    <section
      className="w-svw pt-[140px] px-5 pb-8 4xl:pt-[168px] 4xl:px-10 7xl:pt-[172px] relative"
      id="hero"
    >
      <div className="container relative z-20">
        {/* round icon orange  */}
        <FloatingCircle />
        <MainHero />

        <div className="flex flex-col 4xl:gap-[461px] 7xl:gap-[507px] z-20 relative">
          <div>
            <h1
              ref={headerRef}
              className="text-center font-neue-kaine font-bold mb-5 tracking-normal"
            >
              {(() => {
                // Split text into words
                const words = text.split(" ");
                const elements: JSX.Element[] = [];

                // Define indices
                const proxiesP2PStart = text.indexOf("Proxies");
                const p2pEnd = text.indexOf("P2P") + 3;

                let charIndex = 0;

                words.forEach((word, wordIndex) => {
                  const wordStartIndex = charIndex;
                  const wordEndIndex = charIndex + word.length;

                  elements.push(
                    <span
                      key={`word-${wordIndex}`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {word.split("").map((char, charIdx) => {
                        const globalIdx = wordStartIndex + charIdx;
                        const isLastChar = globalIdx === text.length - 1;
                        const isMMO =
                          globalIdx >= text.length - 3 && !isLastChar;
                        const isProxiesP2P =
                          globalIdx >= proxiesP2PStart && globalIdx < p2pEnd;

                        const colorClasses = `${
                          isMMO ? "text-[#00a7e6]!" : ""
                        } ${isProxiesP2P ? "text-[#fc833d]" : ""} ${
                          isLastChar ? "text-[#1acda5]!" : ""
                        }`;

                        return (
                          <span
                            key={`${globalIdx}-${char}`}
                            className={`inline-block h-12 text-33 4xl:text-38 md:text-40 text-[#2b303b] ${colorClasses}`}
                            style={{
                              display: "inline-block",
                              willChange: "transform",
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        );
                      })}
                    </span>
                  );

                  charIndex += word.length + 1; // +1 for space

                  // Add line break after "P2P"
                  if (wordEndIndex === p2pEnd) {
                    elements.push(
                      <br key={`br-${wordIndex}`} className="framer-text" />
                    );
                  } else if (wordIndex < words.length - 1) {
                    // Add space between words (except before line break)
                    elements.push(
                      <span
                        key={`space-${wordIndex}`}
                        style={{ whiteSpace: "pre" }}
                      >
                        {"  "}
                      </span>
                    );
                  }
                });

                return elements;
              })()}
            </h1>
            <p className="mx-auto text-[15px] leading-[25.5px] font-inter font-normal text-[#576075] text-center wrap-break-words w-3xl mb-5 7xl:h-[51px] antialiased">
              {t("description")}
            </p>
            <div className="w-fit mx-auto flex-row center gap-4">
              <Button size="lg" className="get-started-button h-14 px-8">
                {tCommon("getStarted").toUpperCase()}{" "}
                <p className="w-5 h-5">
                  <CursorIcon />
                </p>
              </Button>
              <Button className="h-14 px-4 7xl:px-8 py-0" variant={"secondary"}>
                {t("viewPrice")}
              </Button>
            </div>
          </div>

          <div className="flex flex-col 4xl:flex-row 4xl:gap-4 7xl:gap-8 z-20">
            <div className="bg-[#fafcfc] rounded-2xl pt-4 md:pt-16 px-4 md:px-8 pb-4 md:pb-8 flex-1 self-stretch relative flex flex-row 4xl:flex-col gap-5 items-center">
              <div className="w-10 h-10 4xl:w-20 4xl:h-20 relative 4xl:absolute 4xl:-top-[35px] 4xl:left-1/2 4xl:-translate-x-1/2 center justify-center">
                <MessageIcon className="w-10! h-10! md:w-20! md:h-20!" />
              </div>
              <div>
                <div className="md:text-21 font-neue-kaine-bold md:text-center text-[#2b303b] text-18">
                  {t("features.transparent.title")}
                </div>
                <p className="text-15 text-[#576075] text-start md:text-center mt-2">
                  {t("features.transparent.description")}
                </p>
              </div>
            </div>

            <div className="bg-[#fafcfc] rounded-2xl pt-4 md:pt-16 px-4 md:px-8 pb-4 md:pb-8 flex-1 self-stretch relative flex flex-row 4xl:flex-col gap-5 items-center">
              <div className="w-10 h-10 4xl:w-20 4xl:h-20 relative 4xl:absolute 4xl:-top-[35px] 4xl:left-1/2 4xl:-translate-x-1/2 center justify-center">
                <BlueNetworkIcon className="w-10! h-10! md:w-20! md:h-20!" />
              </div>
              <div>
                <div className="md:text-21 font-neue-kaine-bold md:text-center text-[#2b303b] text-18">
                  {t("features.noLogs.title")}
                </div>
                <p className="text-15 text-[#576075] text-start md:text-center mt-2">
                  {t("features.noLogs.description")}
                </p>
              </div>
            </div>

            <div className="bg-[#fafcfc] rounded-2xl pt-4 md:pt-16 px-4 md:px-8 pb-4 md:pb-8 flex-1 self-stretch relative flex flex-row 4xl:flex-col gap-5 items-center">
              <div className="w-10 h-10 4xl:w-20 4xl:h-20 relative 4xl:absolute 4xl:-top-[35px] 4xl:left-1/2 4xl:-translate-x-1/2 center justify-center">
                <WifiIcon className="w-10! h-10! md:w-20! md:h-20!" />
              </div>
              <div>
                <div className="md:text-21 font-neue-kaine-bold md:text-center text-[#2b303b] text-18">
                  {t("features.fastConnection.title")}
                </div>
                <p className="text-15 text-[#576075] text-start md:text-center mt-2">
                  {t("features.fastConnection.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TwoLayerParticles />
      <div className="absolute top-0 left-0 right-0 h-[438px] z-10 flex-none pointer-events-none overflow-hidden bg-[linear-gradient(#fff_80%,#fff0_100%)]"></div>
    </section>
  );
};
