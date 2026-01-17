"use client";

import { useEffect, useRef, JSX } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { CursorIcon } from "@/components/icons/CursorIcon";
import { MessageIcon } from "@/components/icons/MessageIcon";
import { BlueNetworkIcon } from "@/components/icons/BlueNetworkIcon";
import { WifiIcon } from "@/components/icons/WifiIcon";
import Link from "next/link";
import { useBranding } from "@/lib/branding/context";

gsap.registerPlugin(SplitText);

export const HeroTextContent = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const { storefrontUrl } = useBranding();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const text = `${t("title")} ${t("subtitle")}`;

  useEffect(() => {
    if (!headerRef.current) return;
    const letters = headerRef.current.querySelectorAll("span");
    letters.forEach((el) => gsap.set(el, { transformOrigin: "center center" }));
    gsap.fromTo(
      letters,
      { opacity: 0.2, scale: 0.4 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        stagger: 0.075,
        ease: "cubic-bezier(0.44, 0, 0.56, 1)",
      }
    );
  }, []);

  const renderTitle = () => {
    const words = text.split(" ");
    const elements: JSX.Element[] = [];
    const secondWord = words?.[1] || "Proxies";
    const proxiesP2PStart = text.indexOf(secondWord);
    const p2pEnd = text.indexOf("P2P") + 3;
    let charIndex = 0;

    words.forEach((word, wordIndex) => {
      const wordStartIndex = charIndex;
      const wordEndIndex = charIndex + word.length;

      elements.push(
        <div
          key={`word-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((char, charIdx) => {
            const globalIdx = wordStartIndex + charIdx;
            const isLastChar = globalIdx === text.length - 1;
            const isMMO = globalIdx >= text.length - 3 && !isLastChar;
            const isProxiesP2P =
              globalIdx >= proxiesP2PStart && globalIdx < p2pEnd;
            const colorClasses = `${isMMO ? "text-[#00a7e6]!" : ""} ${
              isProxiesP2P ? "text-[#fc833d]" : ""
            } ${isLastChar ? "text-[#1acda5]!" : ""}`;

            return (
              <span
                key={`${globalIdx}-${char}`}
                className={`inline-block tracking-normal leading-[120%] text-33 4xl:text-38 7xl:text-40 text-[#2b303b] ${colorClasses}`}
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      );

      charIndex += word.length + 1;

      if (wordEndIndex === p2pEnd) {
        elements.push(<br key={`br-${wordIndex}`} className="framer-text" />);
      } else if (wordIndex < words.length - 1) {
        elements.push(<span key={`space-${wordIndex}`}> </span>);
      }
    });

    return elements;
  };

  const featureCards = [
    {
      icon: <MessageIcon className="w-10! h-10! md:w-20! md:h-20!" />,
      title: t("features.transparent.title"),
      description: t("features.transparent.description"),
    },
    {
      icon: <BlueNetworkIcon className="w-10! h-10! md:w-20! md:h-20!" />,
      title: t("features.noLogs.title"),
      description: t("features.noLogs.description"),
    },
    {
      icon: <WifiIcon className="w-10! h-10! md:w-20! md:h-20!" />,
      title: t("features.fastConnection.title"),
      description: t("features.fastConnection.description"),
    },
  ];

  return (
    <div className="flex flex-col items-center flex-none w-full max-w-[1200px] h-min p-0 gap-[425px] z-20 relative overflow-visible 4xl:gap-[461px] 7xl:gap-[507px]">
      <div>
        <h1
          ref={headerRef}
          className="text-center leading-[120%] font-neue-kaine font-bold mb-5 tracking-normal[text-wrap-mode:wrap] [white-space-collapse:preserve] wrap-break-word [word-break:break-word]"
        >
          {renderTitle()}
        </h1>
        <div className="whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word] flex-none w-full max-w-3xl h-auto relative flex flex-col justify-start outline-none mx-auto">
          <p className="mx-auto text-[15px] leading-[170%] font-inter font-normal text-[#576075] text-center wrap-break-words 7xl:w-3xl mb-5 7xl:h-[51px] antialiased">
            {t("description")}
          </p>
        </div>
        {storefrontUrl && (
          <div className="w-full 4xl:w-fit mx-auto flex-row center gap-4">
            <Link
              href={storefrontUrl}
              className="grow shrink-0 basis-0 max-w-[420px] 4xl:max-w-full"
            >
              <Button
                size="lg"
                className="get-started-button w-full h-14 px-4 4xl:px-8"
              >
                {tCommon("getStarted")?.toUpperCase()}{" "}
                <p className="w-5 h-5">
                  <CursorIcon />
                </p>
              </Button>
            </Link>
            <Link
              href={storefrontUrl}
              className="grow shrink-0 basis-0 max-w-[420px] 4xl:max-w-full"
            >
              <Button
                className="w-full h-14 px-1 min-[420px]:px-4 7xl:px-8 py-0"
                variant={"secondary"}
              >
                {t("viewPrice")}
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col 4xl:flex-row gap-4 7xl:gap-8 z-20">
        {featureCards.map((card) => (
          <div
            key={card.title}
            className="bg-[#fafcfc] rounded-2xl pt-4 4xl:px-6 4xl:pt-16 px-4 7xl:px-8 pb-4 md:pb-8 flex-1 self-stretch relative flex flex-row 4xl:flex-col gap-5 items-center"
          >
            <div className="w-10 h-10 4xl:w-20 4xl:h-20 relative 4xl:absolute 4xl:-top-[35px] 4xl:left-1/2 4xl:-translate-x-1/2 center justify-center">
              {card.icon}
            </div>
            <div>
              <div className="whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word] flex-none w-full h-auto relative flex flex-col justify-start outline-none">
                <h3 className="text-[18px] leading-[140%] 4xl:text-[20px] font-neue-kaine-bold text-left 4xl:text-center text-[#2b303b]">
                  {card.title}
                </h3>
              </div>
              <div className="whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word] flex-none w-full h-auto relative flex flex-col justify-start outline-none">
                <p className="text-15 leading-[170%] text-[#576075] text-left 4xl:text-center mt-2">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTextContent;
