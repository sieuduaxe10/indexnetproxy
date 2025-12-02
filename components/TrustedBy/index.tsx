"use client";

import { useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import GsapMarquee from "./InfiniteMarquee";
import { useTranslations } from "next-intl";

export const trustedByCompanies = [
  { name: "GenLogin", logo: "/images/trusted-by/gen-login.avif" },
  { name: "Smir", logo: "/images/trusted-by/smir.png" },
  { name: "GemLogin", logo: "/images/trusted-by/gem-login.png" },
  { name: "ComKey", logo: "/images/trusted-by/comkey.png" },
  { name: "ftios Team", logo: "/images/trusted-by/ftios.png" },
  { name: "Hiddence", logo: "/images/trusted-by/hiddence.png" },
  { name: "Umix", logo: "/images/trusted-by/umix.png" },
  { name: "GoMeta.vip", logo: "/images/trusted-by/gometa.png" },
  { name: "BigAds", logo: "/images/trusted-by/bigads.png" },
  { name: "wproxy", logo: "/images/trusted-by/wproxy.png" },
  { name: "MinSoftware", logo: "/images/trusted-by/min-software.png" },
  { name: "MetaMask", logo: "/images/trusted-by/metamax.png" },
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
    <section className="container bg-background px-5 pt-8 pb-6 md:px-10 md:pt-10 flex flex-col gap-6">
      <p className="text-base text-footer-text mx-auto text-center leading-[27.2px]">
        {t("title")}
      </p>

      <div className="container mx-auto overflow-hidden select-none h-[76px] mask-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgb(0,0,0)_12.5%,rgb(0,0,0)_87.5%,rgba(0,0,0,0)_100%)]">
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
                width={109}
                height={48}
                draggable={false}
                className="block"
                style={{ filter: "grayscale(1)" }} // default grayscale 1
              />
            </div>
          ))}
        </GsapMarquee>
      </div>
    </section>
  );
};
