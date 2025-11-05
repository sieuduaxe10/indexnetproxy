import Link from "next/link";
import { HomeIcon } from "../icons/HomeIcon";
import { PhoneIcon } from "../icons/PhoneIcon";

export const Contact = () => {
  return (
    <section className="bg-[#f9fbfb]">
      <div className="px-5 py-[60px] md:px-10 md:py-10">
        <p className="text-13 text-primary text-center">Contact</p>
        <h3 className="text-2xl md:text-33 font-neue-kaine-bold mb-10 text-center text-[#2b303b]">
          Need help from real people?
        </h3>
        <div className="max-w-3xl mx-auto">
          <h4 className="text-18 text-21 font-neue-kaine-bold mb-2 text-[#2b303b]">
            Any Questions?
          </h4>
          <div className="text-15 font-inter text-[#576075] mb-8 max-w-600">
            Any We are here to help and answer any questions you may have. We
            look forward to hearing from you. Fill out this form or send us an
            email at
            <Link
              href="mailto:contact@netproxy.io"
              className="text-15 font-inter text-primary block"
            >
              ketoan@upgo.io
            </Link>
          </div>
          <div className="text-18 text-21 font-neue-kaine-bold mb-2 text-[#2b303b]">
            Want to collaborate?
          </div>
          <p className="text-15 font-inter text-[#576075] mb-8">
            Send an email to contact our business team{" "}
            <Link
              href="mailto:contact@netproxy.io"
              className="text-15 font-inter text-primary"
            >
              ketoan@upgo.io
            </Link>
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2.5 items-center">
              <div className="w-8 h-8">
                <PhoneIcon />
              </div>
              <Link
                href="tel:+84327072120"
                className="text-15 font-inter text-[#576075] hover:underline"
              >
                (+84) 327 072 120
              </Link>
            </div>
            <div className="flex flex-row gap-2.5 items-center">
              <div className="w-8 h-8">
                <HomeIcon />
              </div>
              <p className="text-15 font-inter text-[#576075] hover:underline">
                117 Duong Nguyen Du, Phuong Ben Thanh, Quan 1, Ho Chi Minh
                700000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
