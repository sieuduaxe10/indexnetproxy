import { AdsIcon } from "../icons/AdsIcon";
import { ZoomIcon } from "../icons/ZoomIcon";
import { DollarIcon } from "../icons/DollarIcon";
import { CartIcon } from "../icons/CartIcon";
import { StarIcon } from "../icons/StarIcon";
import { DatabaseIcon } from "../icons/DatabaseIcon";
import { CircleArrowRightIcon } from "../icons/CircleArrowRightIcon";
import { NetworkIcon } from "../icons/NetworkIcon";

export const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Ad verification",
      icon: <AdsIcon className="object-cover" />,
    },
    {
      title: "Fast Shopping",
      icon: <CartIcon className="object-cover" />,
    },
    {
      title: "Pricing Monitoring",
      icon: <DollarIcon className="object-cover" />,
    },
    {
      title: "Network",
      icon: <NetworkIcon className="object-cover" />,
    },
    {
      title: "Talent sourcing",
      icon: <StarIcon className="object-cover" />,
    },
    {
      title: "Data collection",
      icon: <DatabaseIcon className="object-cover" />,
    },
    {
      title: "Verification",
      icon: <CircleArrowRightIcon className="object-cover" />,
    },
    {
      title: "Market Research",
      icon: <ZoomIcon className="object-cover" />,
    },
  ];

  return (
    <section className="py-[60px] px-5 md:px-10 md:py-20 relative border-b border-[#e3ecec]">
      <div className="container">
        <div className="text-center">
          <p className="text-13 text-primary text-center font-medium">
            TOP CASE
          </p>
          <h3 className="text-2xl md:text-33 font-neue-kaine-bold  text-center text-[#2b303b]">
            Case study
          </h3>
          <div className="mt-5 font-inter text-15 max-w-600 mx-auto text-[#576075]">
            Peer-to-Peer (P2P) proxy service designed to enhance your browsing
            experience by providing flexible, high-speed, and reliable proxy
            solutions.
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {caseStudies.map((study) => (
            <div
              className="center gap-2 pl-7 pr-6 h-12 md:h-[72px] border border-[#e3ecec]"
              key={study.title}
            >
              <div className="w-6 h-6 md:w-10 md:h-10 center">{study.icon}</div>
              <p className="text-xs font-ibm-plex-mono font-semibold uppercase text-[#2b303b]">
                {study.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
