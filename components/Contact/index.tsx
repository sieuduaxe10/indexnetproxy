"use client";

import { Link } from "@/i18n/routing";
import { HomeIcon } from "../icons/HomeIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { useTranslations } from "next-intl";

export const Contact = () => {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="bg-[#f9fbfb]">
      <div className="px-5 py-[60px] 7xl:px-10 7xl:py-10">
        <p className="text-13 text-primary text-center font-medium">
          {t("tag")}
        </p>
        <h3 className="text-2xl 4xl:text-28 7xl:text-33 font-neue-kaine-bold mb-10 text-center text-[#2b303b]">
          {t("title")}
        </h3>
        <div className="max-w-3xl mx-auto">
          <h4 className="text-18 7xl:text-21 font-neue-kaine-bold mb-2 text-[#2b303b]">
            {t("anyQuestions")}
          </h4>
          <div className="text-15 font-inter text-[#576075] mb-8 max-w-600">
            {t("description")}
            <Link
              href="mailto:ketoan@upgo.io"
              className="text-15 font-inter text-primary block"
            >
              ketoan@upgo.io
            </Link>
          </div>
          <div className="text-18 text-21 font-neue-kaine-bold mb-2 text-[#2b303b]">
            {t("wantCollaborate")}
          </div>
          <p className="text-15 font-inter text-[#576075] mb-8">
            {t("collaborateDescription")}{" "}
            <Link
              href="mailto:ketoan@upgo.io"
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
                {t("phone")}
              </Link>
            </div>
            <div className="flex flex-row gap-2.5 items-center">
              <div className="w-8 h-8">
                <HomeIcon />
              </div>
              <p className="text-15 font-inter text-[#576075] hover:underline">
                {t("address")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
