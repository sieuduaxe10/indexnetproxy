"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CertificateIcon } from "../icons/CertificateIcon";
import { RefreshIcon } from "../icons/RefreshIcon";
import { InfiniteIcon } from "../icons/InfiniteIcon";
import { ThunderIcon } from "../icons/ThunderIcon";
import { Separator } from "../ui/separator";
import { ButtonLightEffect } from "../ButtonLightEffect";
import { Link } from "@/i18n/routing";

export const Pricing = () => {
  const t = useTranslations("pricing");

  const pricingPlans = [
    {
      title: t("plans.ipv6.title"),
      unit: t("plans.ipv6.unit"),
      features: [
        {
          title: t("features.httpSupport"),
          icon: <CertificateIcon />,
        },
        {
          title: t("features.exportPorts"),
          icon: <RefreshIcon />,
        },
        {
          title: t("features.unlimitedRotations"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.unlimitedBandwidth"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.speed"),
          icon: <ThunderIcon />,
        },
      ],
      price: t("plans.ipv6.price"),
      topLineColor: "#1acda5",
    },
    {
      title: t("plans.rotation.title"),
      unit: t("plans.rotation.unit"),
      features: [
        {
          title: t("features.httpSupport"),
          icon: <CertificateIcon />,
        },
        {
          title: t("features.ipRotation"),
          icon: <RefreshIcon />,
        },
        {
          title: t("features.unlimitedRotations"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.unlimitedBandwidth"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.speed"),
          icon: <ThunderIcon />,
        },
      ],
      price: t("plans.rotation.price"),
      topLineColor: "#fc833d",
    },
    {
      title: t("plans.static.title"),
      unit: t("plans.static.unit"),
      features: [
        {
          title: t("features.httpSupport"),
          icon: <CertificateIcon />,
        },
        {
          title: t("features.ipRotation"),
          icon: <RefreshIcon />,
        },
        {
          title: t("features.unlimitedRotations"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.unlimitedBandwidth"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.speed"),
          icon: <ThunderIcon />,
        },
      ],
      price: t("plans.static.price"),
      isPopular: true,
      topLineColor: "#00a7e6",
    },
    {
      title: t("plans.unlimited.title"),
      unit: t("plans.unlimited.unit"),
      features: [
        {
          title: t("features.httpSupport"),
          icon: <CertificateIcon />,
        },
        {
          title: t("features.exportPorts"),
          icon: <RefreshIcon />,
        },
        {
          title: t("features.unlimitedRotations"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.unlimitedBandwidth"),
          icon: <InfiniteIcon />,
        },
        {
          title: t("features.speed"),
          icon: <ThunderIcon />,
        },
      ],
      price: t("plans.unlimited.price"),
      topLineColor: "#f2c3bb",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-[60px] px-4 4xl:px-10 4xl:py-20 relative border-b border-[#e3ecec] bg-[#f2f7f7]"
    >
      <div className="container flex flex-col gap-10">
        <div className="text-center">
          <p className="text-13 text-primary text-center font-medium">
            {t("flashSale")}
          </p>
          <h2 className="text-2xl min-[800px]:text-28 7xl:text-33 font-neue-kaine-bold  text-center text-[#2b303b]">
            {t("title")}
          </h2>
          <div className="mt-5 font-inter text-15 max-w-600 mx-auto text-[#576075]">
            {t("subtitle")}
          </div>
        </div>

        <div className="7xl:mt-10 grid grid-cols-1 4xl:grid-cols-2 7xl:grid-cols-4 gap-4 min-[810px]:gap-y-10 min-[810px]:gap-x-5 7xl:gap-2 cards-wrapper">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="pricing-card h-full">
              <Link
                href={"#"}
                className="card-item p-6 pt-8 flex gap-4 flex-col bg-[#fafcfc] border border-[#e5eaea] rounded-2xl relative h-full"
              >
                <div
                  className="w-[168px] h-2 absolute top-0 left-1/2 -translate-x-1/2"
                  data-framer-name="top line"
                  style={{
                    backgroundColor: plan.topLineColor,
                  }}
                />
                <div className="min-h-auto min-[75rem]:min-h-[95px]">
                  <h3 className="text-18 4xl:text-20 7xl:text-21 font-neue-kaine-bold text-[#2b303b]">
                    {plan.title}
                  </h3>
                  <p className="text-18 4xl:text-20 7xl:text-21 font-neue-kaine-bold text-primary">
                    {plan.unit}
                  </p>
                </div>
                <ul className="flex flex-col gap-1 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="center gap-2">
                      <span className="w-5 h-5 center">{feature.icon}</span>
                      <span className="text-13 text-[#2b303b] font-semibold">
                        {feature.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <Separator className="bg-[#e3ecec]" />
                <div className="mt-auto pt-2 flex flex-col items-center">
                  <div className="font-neue-kaine-bold text-40 text-primary text-center font-normal">
                    {plan.price}
                  </div>

                  {plan.isPopular && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <ButtonLightEffect />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Certificate */}
        <div className="pt-6 flex flex-col gap-4 center mx-auto">
          <div>
            <Image
              src="/images/pricing/certificates.png"
              alt="Certificate"
              width={376}
              height={54}
            />
          </div>
          <div className="text-15 font-inter text-[#2b303b]">
            {t("certificate")}
          </div>
        </div>
      </div>
    </section>
  );
};
