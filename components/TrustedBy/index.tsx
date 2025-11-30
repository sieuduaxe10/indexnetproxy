"use client";

import { useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import GsapMarquee from "./InfiniteMarquee";
import { useTranslations } from "next-intl";

export const trustedByCompanies = [
  { name: "AdsPower", logo: "/images/trusted-by/v1/AdsPower.svg" },
  { name: "BRAVE", logo: "/images/trusted-by/v1/BRAVE.svg" },
  { name: "DOLPHIN ANTY", logo: "/images/trusted-by/v1/DOLPHIN_ANTY.svg" },
  { name: "INCOGNITON", logo: "/images/trusted-by/v1/INCOGNITON.svg" },
  { name: "LILICAT", logo: "/images/trusted-by/v1/LILICAT.svg" },
  { name: "MICROSOFT EDGE", logo: "/images/trusted-by/v1/MICROSOFT_EDGE.svg" },
  { name: "OPERA", logo: "/images/trusted-by/v1/OPERA.svg" },
  { name: "VIVALDI", logo: "/images/trusted-by/v1/VIVALDI.svg" },

  { name: "ANDROID", logo: "/images/trusted-by/v1/ANDROID.svg" },
  { name: "Chrome", logo: "/images/trusted-by/v1/Chrome.svg" },
  {
    name: "FIREFOX BROWSER",
    logo: "/images/trusted-by/v1/FIREFOX_BROWSER.svg",
  },
  { name: "INITEDO SWITCH", logo: "/images/trusted-by/v1/INITEDO_SWITCH.svg" },
  { name: "MBBROWSER", logo: "/images/trusted-by/v1/MBBROWSER.svg" },
  { name: "NOXPLAYER", logo: "/images/trusted-by/v1/NOXPLAYER.svg" },
  { name: "PROXIFIER", logo: "/images/trusted-by/v1/PROXIFIER.svg" },
  { name: "TELEGRAM", logo: "/images/trusted-by/v1/TELEGRAM.svg" },
  { name: "WATERFOX", logo: "/images/trusted-by/v1/WATERFOX.svg" },
];

export const TrustedBy = () => {
  const t = useTranslations("trustedBy");
  const [speed] = useState(80);

  // animate grayscale smoothly
  const setGray = (wrapper: HTMLDivElement | null, value: 0 | 1) => {
    if (!wrapper) return;
    const img = wrapper.querySelector("img");
    if (!img) return;
    gsap.to(img, {
      filter: `grayscale(${value})`,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section className="container bg-background px-5 py-8 md:px-10 md:py-10 flex flex-col gap-6">
      <p className="text-base text-footer-text mx-auto text-center leading-[27.2px]">
        {t("title")}
      </p>

      <div className="container mx-auto overflow-hidden select-none w-[82%] h-[76px] mask-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgb(0,0,0)_12.5%,rgb(0,0,0)_87.5%,rgba(0,0,0,0)_100%)]">
        <GsapMarquee
          speed={speed}
          direction="left"
          gap={60}
          segmentGap={60}
          hoverTimeScale={0.25}
        >
          {trustedByCompanies.map(({ name, logo }, i) => (
            <div
              key={i}
              className="block overflow-hidden rounded-full"
              onMouseEnter={(e) => setGray(e.currentTarget, 0)}
              onMouseLeave={(e) => setGray(e.currentTarget, 1)}
              style={{ willChange: "filter" }}
            >
              <Image
                alt={`Vendor ${name}`}
                src={logo}
                width={155}
                height={104}
                draggable={false}
                className="block w-[155px] max-h-[104px]"
                style={{ filter: "grayscale(1)" }} // default grayscale 1
              />
            </div>
          ))}
        </GsapMarquee>
      </div>
    </section>
  );
};
