import Image from "next/image";
import { CertificateIcon } from "../icons/CertificateIcon";
import { RefreshIcon } from "../icons/RefreshIcon";
import { InfiniteIcon } from "../icons/InfiniteIcon";
import { ThunderIcon } from "../icons/ThunderIcon";
import { Separator } from "../ui/separator";
import { ButtonLightEffect } from "../ButtonLightEffect";
import Link from "next/link";

export const Pricing = () => {
  const pricingPlans = [
    {
      title: "IPv6 Proxy",
      unit: "Gigabytes",
      features: [
        {
          title: "Supports HTTP/HTTPS",
          icon: <CertificateIcon />,
        },
        {
          title: "Exports: 10,000 Ports Proxies",
          icon: <RefreshIcon />,
        },
        {
          title: "Unlimited IP Rotations",
          icon: <InfiniteIcon />,
        },
        {
          title: "Unlimited Bandwidth",
          icon: <InfiniteIcon />,
        },
        {
          title: "Speed up to 50 Mbps",
          icon: <ThunderIcon />,
        },
      ],
      price: "$0.04",
      topLineColor: "#1acda5",
    },
    {
      title: "Rotation Residential",
      unit: "Day",
      features: [
        {
          title: "Supports HTTP/HTTPS",
          icon: <CertificateIcon />,
        },
        {
          title: "IP Rotation: Every 10 Minutes",
          icon: <RefreshIcon />,
        },
        {
          title: "Unlimited IP Rotations",
          icon: <InfiniteIcon />,
        },
        {
          title: "Unlimited Bandwidth",
          icon: <InfiniteIcon />,
        },
        {
          title: "Speed up to 50 Mbps",
          icon: <ThunderIcon />,
        },
      ],
      price: "$0.20",
      topLineColor: "#fc833d",
    },
    {
      title: "Static Residential",
      unit: "Day",
      features: [
        {
          title: "Supports HTTP/HTTPS",
          icon: <CertificateIcon />,
        },
        {
          title: "IP Rotation: Every 10 Minutes",
          icon: <RefreshIcon />,
        },
        {
          title: "Unlimited IP Rotations",
          icon: <InfiniteIcon />,
        },
        {
          title: "Unlimited Bandwidth",
          icon: <InfiniteIcon />,
        },
        {
          title: "Speed up to 50 Mbps",
          icon: <ThunderIcon />,
        },
      ],
      price: "$5",
      isPopular: true,
      topLineColor: "#00a7e6",
    },
    {
      title: "Unlimited Proxy",
      unit: "No Limited",
      features: [
        {
          title: "Supports HTTP/HTTPS",
          icon: <CertificateIcon />,
        },
        {
          title: "Exports: 10,000 Ports Proxies",
          icon: <RefreshIcon />,
        },
        {
          title: "Unlimited IP Rotations",
          icon: <InfiniteIcon />,
        },
        {
          title: "Unlimited Bandwidth",
          icon: <InfiniteIcon />,
        },
        {
          title: "Speed up to 50 Mbps",
          icon: <ThunderIcon />,
        },
      ],
      price: "$255",
      topLineColor: "#f2c3bb",
    },
  ];
  return (
    <section
      id="pricing"
      className="py-[60px] px-5 md:px-10 md:py-20 relative border-b border-[#e3ecec] bg-[#f2f7f7]"
    >
      <div className="container flex flex-col gap-10">
        <div className="text-center">
          <p className="text-13 text-primary text-center font-medium">
            FLASH SALE DISCOUNT 20%
          </p>
          <h2 className="text-2xl md:text-33 font-neue-kaine-bold  text-center text-[#2b303b]">
            Daily price proxy
          </h2>
          <div className="mt-5 font-inter text-15 max-w-600 mx-auto text-[#576075]">
            Pay only for the days you need, with no long-term commitments.
            Seamless browsing with IPs sourced globally through a decentralized
            network.
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <Link
              href={"#"}
              key={index}
              className="p-6 pt-8 flex gap-4 flex-col bg-[#fafcfc] border border-[#e5eaea] rounded-2xl relative card-item"
            >
              <div
                className="w-[168px] h-2 absolute top-0 left-1/2 -translate-x-1/2"
                data-framer-name="top line"
                style={{
                  backgroundColor: plan.topLineColor,
                }}
              ></div>
              <div>
                <h3 className="text-21 font-neue-kaine-bold text-[#2b303b]">
                  {plan.title}
                </h3>
                <p className="text-21 font-neue-kaine-bold text-primary">
                  {plan.unit}
                </p>
              </div>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index} className="center gap-2">
                    <span className="w-5 h-5">{feature.icon}</span>
                    <span>{feature.title}</span>
                  </li>
                ))}
              </ul>
              <Separator className="bg-[#e3ecec]" />
              <div className="font-neue-kaine-bold text-40 text-primary text-center font-normal">
                {plan.price}
              </div>

              {plan.isPopular && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                  <ButtonLightEffect />
                </div>
              )}
            </Link>
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
            Certified data centers and net providers
          </div>
        </div>
      </div>
    </section>
  );
};
