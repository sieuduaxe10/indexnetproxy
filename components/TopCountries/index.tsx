"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Separator } from "../ui/separator";

const ParallaxWrapper = dynamic(
  () => import("../ParallaxWrapper/ParallaxWrapper"),
  { ssr: false }
);

export const TopCountries = () => {
  const t = useTranslations("topCountries");

  const countries = [
    {
      name: "Vietnam",
      flag: "/images/flag/vietnam.png",
      ips: "981,177",
    },
    {
      name: "United States",
      flag: "/images/flag/american.svg",
      ips: "889,389",
    },
    {
      name: "India",
      flag: "/images/flag/india.png",
      ips: "889,389",
    },
    {
      name: "Brazil",
      flag: "/images/flag/brazil.svg",
      ips: "813,810",
    },
    {
      name: "Germany",
      flag: "/images/flag/germany.svg",
      ips: "767,098",
    },
    {
      name: "France",
      flag: "/images/flag/france.svg",
      ips: "645,901",
    },
    {
      name: "Canada",
      flag: "/images/flag/canada.svg",
      ips: "613,050",
    },
    {
      name: "Japan",
      flag: "/images/flag/japan.svg",
      ips: "591,729",
    },
    {
      name: "United Kingdom",
      flag: "/images/flag/united-kingdom.svg",
      ips: "588,309",
    },
    {
      name: "Australia",
      flag: "/images/flag/australia.svg",
      ips: "574,403",
    },
    {
      name: "South Korea",
      flag: "/images/flag/korean.svg",
      ips: "532,966",
    },
    {
      name: "Russia",
      flag: "/images/flag/russia.svg",
      ips: "400,849",
    },
  ];
  return (
    <section
      id="country"
      className="py-[60px] px-5 md:px-10 md:py-20 relative border-b border-[#e3ecec]"
    >
      <ParallaxWrapper
        speed={1.3}
        className="absolute bottom-[120px] right-[43px] rotate-[149deg] aspect-square w-[59px] opacity-100 overflow-visible will-change-transform"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-round-icon.png"
            alt="netproxy play icon"
            width={39}
            height={35}
          />
        </div>
      </ParallaxWrapper>

      <ParallaxWrapper
        speed={1.3}
        className="absolute bottom-[20px] left-[43px] rotate-[90deg] aspect-square w-[59px] opacity-100 overflow-visible will-change-transform"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-cross-icon-medium.png"
            alt="netproxy play icon"
            width={70}
            height={70}
          />
        </div>
      </ParallaxWrapper>

      <ParallaxWrapper
        speed={1.3}
        className="absolute -bottom-[320px] right-[23px] rotate-[90deg] aspect-square w-[59px] opacity-100 overflow-visible will-change-transform"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-play-icon.png"
            alt="netproxy play icon"
            width={39}
            height={35}
          />
        </div>
      </ParallaxWrapper>
      <div className="absolute top-[18px] left-[75px]">
        <Image
          src={"/images/decor/orange-circle.png"}
          width={48}
          height={48}
          alt="Orange circle"
        />
      </div>

      <div className="absolute top-[132px] right-[77px]">
        <Image
          src={"/images/decor/blue-x.png"}
          width={30}
          height={30}
          alt="Orange circle"
        />
      </div>

      <div className="border-[#addeed] border-[6px] rounded-3xl p-5 md:p-[34px] flex flex-col min-[1200px]:flex-row gap-10 bg-[#00a7e6] container min-[1200px]:items-center">
        <div className="text-[#fdfdfd]" style={{ flex: ".5 0 0" }}>
          <p className="text-13 font-inter font-medium">
            <strong>TOP LOCATIONS</strong>
          </p>
          <h3 className="text-2xl min-[810px]:text-28 min-[1200px]:text-33 font-neue-kaine-bold leading-[120%]">
            {t("title")}
          </h3>
          <p className="mt-5 4xl:max-w-[400px]">{t("subtitle")}</p>
        </div>

        <Separator
          orientation="vertical"
          className="bg-[#fdfdfd]! h-[191px]! hidden min-[1220px]:block opacity-20"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 min-[1200px]:gap-9 flex-1 w-full">
          {countries.map((country) => (
            <div
              key={country.name}
              className="rounded-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-start 4xl:flex-row 4xl:items-center gap-4 min-[1200px]:gap-2 mb-2">
                <div className="w-10 h-10 relative rounded-full border-[#fdfdfd] border-2 overflow-hidden">
                  <Image
                    src={country.flag}
                    alt={`${country.name} flag`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="text-[#fdfdfd]">
                  <h4 className="opacity-60 text-13">{country.name}</h4>
                  <p className="text-17">
                    {country.ips} {t("ips")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
