import {
  CircleArrowRightIcon,
  DatabaseIcon,
  NetworkIcon,
  StarIcon,
} from "lucide-react";
import { AdsIcon } from "../icons/AdsIcon";
import { ZoomIcon } from "../icons/ZoomIcon";
import { DollarIcon } from "../icons/DollarIcon";
import { CartIcon } from "../icons/CartIcon";

export const CaseStudies = () => {
  return (
    <section className="container">
      <div>TOP CASE</div>
      <h3>Case study</h3>
      <div>
        Peer-to-Peer (P2P) proxy service designed to enhance your browsing
        experience by providing flexible, high-speed, and reliable proxy
        solutions.
      </div>

      <div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <AdsIcon />
          </div>
          <p>Ad verification</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <CartIcon />
          </div>
          <p>Fast Shopping</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <DollarIcon />
          </div>
          <p>Pricing Monitoring</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <NetworkIcon />
          </div>
          <p>Network</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <StarIcon />
          </div>
          <p>Talent sourcing</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <DatabaseIcon />
          </div>
          <p>Data collection</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <CircleArrowRightIcon />
          </div>
          <p>Verification</p>
        </div>
        <div className="center gap-2">
          <div className="w-10 h-10">
            <ZoomIcon />
          </div>
          <p>Market Research</p>
        </div>
      </div>
    </section>
  );
};
