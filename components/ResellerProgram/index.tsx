"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { CertificateIcon } from "../icons/CertificateIcon";
import { DollarIcon } from "../icons/DollarIcon";
import { InfoOutlineIcon } from "../icons/InfoOutlineIcon";
import { MessageIcon } from "../icons/MessageIcon";
import { NetworkIcon } from "../icons/NetworkIcon";
import { RefreshIcon } from "../icons/RefreshIcon";
import { StarIcon } from "../icons/StarIcon";
import { ThunderIcon } from "../icons/ThunderIcon";
import { vi, en, type ResellerContent } from "./content";

const BECOME_RESELLER_URL = "https://seller.prx.network/reseller";

const benefitIcons = [
  <DollarIcon key="0" />,
  <ThunderIcon key="1" />,
  <CertificateIcon key="2" />,
  <NetworkIcon key="3" />,
  <RefreshIcon key="4" />,
  <MessageIcon key="5" />,
];

const supportIcons = [
  <MessageIcon key="0" />,
  <InfoOutlineIcon key="1" />,
  <StarIcon key="2" />,
  <ThunderIcon key="3" />,
];

export const ResellerProgram = () => {
  const locale = useLocale();
  const c: ResellerContent = locale === "vi" ? vi : en;

  return (
    <div className="relative overflow-hidden bg-white">
      {/* ============ HERO ============ */}
      <section className="relative pt-[140px] pb-[60px] md:pb-20 px-5 md:px-10 overflow-hidden">
        <div className="container relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-13 text-primary font-medium mb-4">
            {c.hero.badge}
          </p>
          <h1 className="font-neue-kaine-bold text-33 4xl:text-38 7xl:text-40 leading-[120%] text-[#2b303b] mb-5">
            {c.hero.title1}
            <br />
            <span className="text-primary">{c.hero.title2}</span>
          </h1>
          <p className="font-inter text-15 leading-[170%] text-[#576075] max-w-2xl mx-auto mb-8">
            {c.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href={BECOME_RESELLER_URL}>
              <Button size="lg" className="h-14 px-8 uppercase font-semibold">
                {c.hero.ctaPrimary}
              </Button>
            </Link>
            <a href="#benefits">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 uppercase font-semibold"
              >
                {c.hero.ctaSecondary}
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto">
            {c.hero.stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#fafcfc] border border-[#e5eaea] rounded-2xl p-5 md:p-6"
              >
                <div className="font-neue-kaine-bold text-28 md:text-40 text-primary leading-none">
                  {s.value}
                </div>
                <div className="font-inter text-13 text-[#576075] mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section
        id="benefits"
        className="relative py-[60px] md:py-20 px-5 md:px-10 bg-[#f2f7f7] border-y border-[#e3ecec]"
      >
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-13 text-primary font-medium">
              {c.benefits.eyebrow}
            </p>
            <h2 className="font-neue-kaine-bold text-2xl min-[800px]:text-28 7xl:text-33 text-[#2b303b] mt-3 mb-4">
              {c.benefits.title}
            </h2>
            <p className="font-inter text-15 text-[#576075] max-w-2xl mx-auto">
              {c.benefits.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.benefits.items.map((b, i) => (
              <div
                key={i}
                className="bg-[#fafcfc] border border-[#e5eaea] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e5eaea] flex items-center justify-center">
                  <div className="w-6 h-6">{benefitIcons[i]}</div>
                </div>
                <h3 className="font-neue-kaine-bold text-18 7xl:text-21 text-[#2b303b]">
                  {b.title}
                </h3>
                <p className="font-inter text-15 leading-[170%] text-[#576075]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative py-[60px] md:py-20 px-5 md:px-10 overflow-hidden">
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-13 text-primary font-medium">
              {c.how.eyebrow}
            </p>
            <h2 className="font-neue-kaine-bold text-2xl min-[800px]:text-28 7xl:text-33 text-[#2b303b] mt-3">
              {c.how.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {c.how.steps.map((step) => (
              <div
                key={step.n}
                className="bg-[#fafcfc] border border-[#e5eaea] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="font-neue-kaine-bold text-40 text-primary leading-none">
                  {step.n}
                </div>
                <h3 className="font-neue-kaine-bold text-18 7xl:text-21 text-[#2b303b]">
                  {step.title}
                </h3>
                <p className="font-inter text-15 leading-[170%] text-[#576075]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PASSIVE INCOME ============ */}
      <section className="relative py-[60px] md:py-20 px-5 md:px-10 bg-[#f2f7f7] border-y border-[#e3ecec]">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-13 text-primary font-medium">
            {c.passive.eyebrow}
          </p>
          <h2 className="font-neue-kaine-bold text-2xl min-[800px]:text-28 7xl:text-33 text-[#2b303b] mt-3 mb-4">
            {c.passive.title}
          </h2>
          <p className="font-inter text-15 leading-[170%] text-[#576075] mb-8">
            {c.passive.desc}
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {c.passive.points.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-white border border-[#e5eaea] rounded-2xl p-4"
              >
                <div className="flex-shrink-0 w-5 h-5 mt-1">
                  <CertificateIcon />
                </div>
                <span className="font-inter text-15 leading-[170%] text-[#2b303b]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ SUPPORT ============ */}
      <section className="relative py-[60px] md:py-20 px-5 md:px-10 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-13 text-primary font-medium">
              {c.support.eyebrow}
            </p>
            <h2 className="font-neue-kaine-bold text-2xl min-[800px]:text-28 7xl:text-33 text-[#2b303b] mt-3 mb-4">
              {c.support.title}
            </h2>
            <p className="font-inter text-15 text-[#576075] max-w-2xl mx-auto">
              {c.support.desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.support.items.map((s, i) => (
              <div
                key={i}
                className="bg-[#fafcfc] border border-[#e5eaea] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e5eaea] flex items-center justify-center">
                  <div className="w-6 h-6">{supportIcons[i]}</div>
                </div>
                <h3 className="font-neue-kaine-bold text-18 text-[#2b303b]">
                  {s.title}
                </h3>
                <p className="font-inter text-13 leading-[170%] text-[#576075]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative px-5 py-[60px] md:px-10 md:py-20">
        <div className="container relative z-10">
          <div className="relative z-10 bg-primary border-[6px] border-[#f5c4a3] rounded-3xl p-10 max-w-960 mx-auto flex flex-col gap-5">
            <h3 className="text-center font-neue-kaine-bold text-2xl md:text-40 text-white max-w-[768px] mx-auto">
              {c.cta.title}
            </h3>
            <Link href={BECOME_RESELLER_URL} className="center">
              <Button
                className="mx-auto! text-primary uppercase font-semibold px-8 h-10 center"
                variant="secondary"
              >
                {c.cta.button}
              </Button>
            </Link>
            <p className="text-center text-[#fdfdfd] mx-auto max-w-600 opacity-80">
              {c.cta.subtitle}
            </p>
            <p className="text-center text-[#fdfdfd] mx-auto max-w-600 opacity-60 text-13">
              {c.cta.note}
            </p>
          </div>
        </div>
        <div className="bg-[#f2f7f7] h-[200px] absolute bottom-0 left-0 right-0 -z-0" />
      </section>
    </div>
  );
};

export default ResellerProgram;
