"use client";

import Image from "next/image";
import { ChromeIcon } from "../icons/ChromeIcon";
import { WindowIcon } from "../icons/WindowIcon";
import { AndroidIcon } from "../icons/AndroidIcon";
import { AppleIcon } from "../icons/AppleIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="pt-20 pb-10 bg-[#f2f7f7]">
      <div className="container flex flex-col 7xl:flex-row gap-10">
        <div className="flex flex-col gap-30 max-w-[464px]">
          <div>
            <Image
              src="/images/netproxy-logo.png"
              alt="Net proxy Logo"
              width={174}
              height={43}
            />
          </div>
          <div className="text-[#6c7993] text-13 leading-[180%] tracking-[0em] font-semibold">
            {t("description")}
          </div>

          <div className="grid grid-cols-2 font-ibm-plex-mono font-semibold text-xs gap-2">
            <Link
              href="https://chromewebstore.google.com/detail/mnloefcpaepkpmhaoipjkpikbnkmbnic?utm_source=item-share-cb"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border min-h-[56px]"
            >
              <div className="w-10 h-10">
                <ChromeIcon />
              </div>
              {t("extensions.chrome")}
            </Link>
            <Link
              href="https://www.proxifier.com/"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border min-h-[56px]"
            >
              <div className="w-10 h-10">
                <WindowIcon />
              </div>
              {t("extensions.windows")}
            </Link>
            <Link
              href="https://apps.apple.com/us/app/shadowrocket/id932747118"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border min-h-[56px]"
            >
              <div className="w-10 h-10">
                <AppleIcon />
              </div>
              {t("extensions.ios")}
            </Link>{" "}
            <Link
              href="https://play.google.com/store/apps/details?id=com.scheler.superproxy"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border min-h-[56px]"
            >
              <div className="w-10 h-10">
                <AndroidIcon />
              </div>
              {t("extensions.android")}
            </Link>
          </div>
        </div>
        <div className="hidden min-[810px]:grid w-full grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("account.title")}
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
              {t("account.login")}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("affiliate.title")}
            </div>
            <div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("affiliate.resellerProgram")}
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("affiliate.linkProgram")}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("category.title")}
            </div>
            <div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("category.faqs")}
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("category.pricing")}
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("category.contact")}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("serviceTerm.title")}
            </div>
            <div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("serviceTerm.privacyPolicy")}
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("serviceTerm.cookiePolicy")}
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("serviceTerm.termsOfService")}
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                {t("serviceTerm.refundPolicy")}
              </div>
            </div>
          </div>
        </div>

        <div className="min-[810px]:hidden flex flex-col gap-4">
          <Accordion
            type="single"
            collapsible
            className="border p-4 border-[#e3ecec] rounded-xl"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-ibm-plex-mono text-21 text-primary p-0! hover:no-underline">
                {t("account.title")}
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <div>{t("account.createAccount")}</div>{" "}
                  <div>{t("account.login")}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="border p-4 border-[#e3ecec] rounded-xl"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-ibm-plex-mono text-21 text-primary p-0! hover:no-underline">
                {t("category.title")}
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <Link href={"#"} className="text-primary underline">
                    {t("category.faqs")}
                  </Link>
                  <Link href={"#"} className="text-primary underline">
                    {t("category.pricing")}
                  </Link>
                  <Link href={"#"} className="text-primary underline">
                    {t("category.contact")}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="border p-4 border-[#e3ecec] rounded-xl"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-ibm-plex-mono text-21 text-primary p-0! hover:no-underline">
                {t("serviceTerm.title")}
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <div>{t("serviceTerm.privacyPolicy")}</div>{" "}
                  <div>{t("serviceTerm.cookiePolicy")}</div>
                  <div>{t("serviceTerm.termsOfService")}</div>
                  <div>{t("serviceTerm.refundPolicy")}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="border p-4 border-[#e3ecec] rounded-xl"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-ibm-plex-mono text-21 text-primary p-0! hover:no-underline">
                {t("affiliate.title")}
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <div>{t("affiliate.resellerProgram")}</div>{" "}
                  <div>{t("affiliate.linkProgram")}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
};
