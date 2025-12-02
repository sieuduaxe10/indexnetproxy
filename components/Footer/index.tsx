import Image from "next/image";
import { ChromeIcon } from "../icons/ChromeIcon";
import { WindowIcon } from "../icons/WindowIcon";
import { AndroidIcon } from "../icons/AndroidIcon";
import { AppleIcon } from "../icons/AppleIcon";
import { Link } from "@/i18n/routing";
import { FooterAccordionMenu } from "./FooterAccordionMenu";
import { getTranslations } from "next-intl/server";

export const Footer = async () => {
  const t = await getTranslations("footer");

  const categoryLinks = [
    { href: "#faqs", label: t("category.faqs").toLocaleUpperCase() },
    { href: "#pricing", label: t("category.pricing").toLocaleUpperCase() },
    { href: "#contact", label: t("category.contact").toLocaleUpperCase() },
  ];

  const serviceTermLinks = [
    {
      href: "/privacy-policy",
      label: t("serviceTerm.privacyPolicy").toLocaleUpperCase(),
    },
    {
      href: "/cookie-policy",
      label: t("serviceTerm.cookiePolicy").toLocaleUpperCase(),
    },
    {
      href: "/term-service",
      label: t("serviceTerm.termsOfService").toLocaleUpperCase(),
    },
    {
      href: "/refund-service",
      label: t("serviceTerm.refundPolicy").toLocaleUpperCase(),
    },
  ];

  const accordionSections = [
    {
      title: t("account.title"),
      items: [
        { label: t("account.createAccount") },
        { label: t("account.login") },
      ],
    },
    {
      title: t("category.title"),
      items: categoryLinks,
    },
    {
      title: t("serviceTerm.title"),
      items: serviceTermLinks,
    },
    {
      title: t("affiliate.title"),
      items: [
        { label: t("affiliate.resellerProgram") },
        { label: t("affiliate.linkProgram") },
      ],
    },
  ];

  return (
    <footer className="pt-20 pb-10 bg-[#f2f7f7] px-5 4xl:px-10">
      <div className="container flex flex-col 7xl:flex-row gap-10">
        <div className="flex flex-col gap-30 max-w-[464px]">
          <div>
            <Image
              src="/images/logo/Logo.webp"
              alt="Net proxy Logo"
              width={174}
              height={43}
            />
          </div>
          <div className="text-[#6c7993] text-13 leading-[180%] tracking-[0em] font-semibold">
            {t("description")}
          </div>

          <div className="grid grid-cols-1 4xl:grid-cols-2 font-ibm-plex-mono font-semibold text-xs gap-2 max-w-[271px] 4xl:max-w-full">
            <Link
              href="https://chromewebstore.google.com/detail/mnloefcpaepkpmhaoipjkpikbnkmbnic?utm_source=item-share-cb"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-start 4xl:justify-center pl-[22px] 4xl:pl-0 box-border min-h-[56px]"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10">
                <ChromeIcon />
              </div>
              {t("extensions.extensionsFor")}{" "}
              <span className="text-primary">{t("extensions.chrome")}</span>
            </Link>
            <Link
              href="https://www.proxifier.com/"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-start 4xl:justify-center pl-[22px] 4xl:pl-0 box-border min-h-[56px]"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10">
                <WindowIcon />
              </div>
              {t("extensions.downloadFor")}{" "}
              <span className="text-[#ff4929]"> {t("extensions.windows")}</span>
            </Link>
            <Link
              href="https://apps.apple.com/us/app/shadowrocket/id932747118"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-start 4xl:justify-center pl-[22px] 4xl:pl-0 box-border min-h-[56px]"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10">
                <AppleIcon />
              </div>
              {t("extensions.downloadFor")}{" "}
              <span className="text-[#ff4929]">{t("extensions.ios")}</span>
            </Link>{" "}
            <Link
              href="https://play.google.com/store/apps/details?id=com.scheler.superproxy"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-start 4xl:justify-center pl-[22px] 4xl:pl-0 box-border min-h-[56px]"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10">
                <AndroidIcon />
              </div>
              {t("extensions.downloadFor")}{" "}
              <span className="text-[#29b4ff]">{t("extensions.android")}</span>
            </Link>
          </div>
        </div>

        <div className="hidden min-[810px]:grid w-full grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("account.title")}
            </div>
            <Link
              href="https://console.netproxy.io"
              className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item"
            >
              {t("account.login")}
            </Link>
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
              {categoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("serviceTerm.title")}
            </div>
            <div>
              {serviceTermLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <FooterAccordionMenu sections={accordionSections} />
      </div>
    </footer>
  );
};
