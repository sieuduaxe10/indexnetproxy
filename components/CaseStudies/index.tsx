"use client";

import { AdsIcon } from "../icons/AdsIcon";
import { ZoomIcon } from "../icons/ZoomIcon";
import { DollarIcon } from "../icons/DollarIcon";
import { CartIcon } from "../icons/CartIcon";
import { StarIcon } from "../icons/StarIcon";
import { DatabaseIcon } from "../icons/DatabaseIcon";
import { CircleArrowRightIcon } from "../icons/CircleArrowRightIcon";
import { NetworkIcon } from "../icons/NetworkIcon";
import { useTranslations } from "next-intl";

export const CaseStudies = () => {
  const t = useTranslations("caseStudies");

  const caseStudies = [
    {
      titleKey: "items.adVerification",
      icon: <AdsIcon className="object-cover" />,
    },
    {
      titleKey: "items.fastShopping",
      icon: <CartIcon className="object-cover" />,
    },
    {
      titleKey: "items.pricingMonitoring",
      icon: <DollarIcon className="object-cover" />,
    },
    {
      titleKey: "items.network",
      icon: <NetworkIcon className="object-cover" />,
    },
    {
      titleKey: "items.talentSourcing",
      icon: <StarIcon className="object-cover" />,
    },
    {
      titleKey: "items.dataCollection",
      icon: <DatabaseIcon className="object-cover" />,
    },
    {
      titleKey: "items.verification",
      icon: <CircleArrowRightIcon className="object-cover" />,
    },
    {
      titleKey: "items.marketResearch",
      icon: <ZoomIcon className="object-cover" />,
    },
  ];

  return (
    <section
      id="case-study"
      className="py-[60px] px-5 md:px-10 md:py-20 relative border-b border-[#e3ecec]"
    >
      <div className="container">
        <div className="text-center">
          <p className="text-13 text-primary text-center font-medium">
            TOP CASE
          </p>
          <h3 className="text-2xl md:text-33 font-neue-kaine-bold  text-center text-[#2b303b]">
            {t("title")}
          </h3>
          <div className="mt-5 font-inter text-15 max-w-600 mx-auto text-[#576075]">
            {t("subtitle")}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {caseStudies.map((study) => (
            <div
              className="center gap-2 pl-7 pr-6 h-12 md:h-[72px] border border-[#e3ecec]"
              key={study.titleKey}
            >
              <div className="w-6 h-6 md:w-10 md:h-10 center">{study.icon}</div>
              <p className="text-xs font-ibm-plex-mono font-semibold uppercase text-[#2b303b]">
                {t(study.titleKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
