import { ChromeIcon } from "../icons/ChromeIcon";
import { WindowIcon } from "../icons/WindowIcon";
import { AndroidIcon } from "../icons/AndroidIcon";
import { AppleIcon } from "../icons/AppleIcon";
import { Link } from "@/i18n/routing";
import { FooterAccordionMenu } from "./FooterAccordionMenu";
import { getTranslations } from "next-intl/server";
import { FooterLogo } from "./FooterLogo";
import { FooterLoginLink } from "./FooterLoginLink";
import { fetchBranding } from "@/lib/api/branding";

export const Footer = async () => {
  const [t, branding] = await Promise.all([
    getTranslations("footer"),
    fetchBranding(),
  ]);
  const businessName = branding?.businessName || "NetProxy.io";

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
        { href: "https://seller.prx.network/", label: t("affiliate.resellerProgram"), external: true },
        { label: t("affiliate.linkProgram") },
      ],
    },
  ];

  return (
    <footer className="pt-20 pb-10 bg-[#f2f7f7] px-5 4xl:px-10">
      <div className="container flex flex-col 7xl:flex-row gap-10">
        <div className="flex flex-col gap-30 7xl:max-w-[464px]">
          <div>
            <FooterLogo />
          </div>
          <div className="text-[#6c7993] text-13 leading-[180%] tracking-[0em] font-semibold">
            {t("description", { business_name: businessName })}
          </div>

          <div className="flex flex-col flex-wrap content-start items-start gap-2 w-full max-w-[271px] h-min p-0 overflow-visible font-ibm-plex-mono font-semibold text-xs 4xl:grid 4xl:grid-rows-2 4xl:grid-cols-2 4xl:grid-auto-rows-[minmax(0,1fr)] 4xl:justify-center 4xl:gap-2 4xl:w-full 4xl:max-w-[508px] 4xl:h-min 4xl:p-0 4xl:relative 4xl:overflow-hidden">
            <Link
              href="https://chromewebstore.google.com/detail/mnloefcpaepkpmhaoipjkpikbnkmbnic?utm_source=item-share-cb"
              className="flex flex-row items-center gap-2 text-xs bg-white rounded-md justify-start box-border h-14 w-full self-start relative overflow-hidden pl-[22px] pr-8 py-0 [box-shadow:rgba(0,0,0,0.12)_0px_1px_1px_0px] 4xl:will-change-transform"
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
              className="flex flex-row items-center gap-2 text-xs bg-white rounded-md justify-start box-border h-14 w-full self-start relative overflow-hidden pl-[22px] pr-8 py-0 [box-shadow:rgba(0,0,0,0.12)_0px_1px_1px_0px] 4xl:will-change-transform"
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
              className="flex flex-row items-center gap-2 text-xs bg-white rounded-md justify-start box-border h-14 w-full self-start relative overflow-hidden pl-[22px] pr-8 py-0 [box-shadow:rgba(0,0,0,0.12)_0px_1px_1px_0px] 4xl:will-change-transform"
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
              className="flex flex-row items-center gap-2 text-xs bg-white rounded-md justify-start box-border h-14 w-full self-start relative overflow-hidden pl-[22px] pr-8 py-0 [box-shadow:rgba(0,0,0,0.12)_0px_1px_1px_0px] 4xl:will-change-transform"
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
            <FooterLoginLink className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
              {t("account.login")}
            </FooterLoginLink>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              {t("affiliate.title")}
            </div>
            <div>
              <Link
                href="https://seller.prx.network/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item block"
              >
                {t("affiliate.resellerProgram")}
              </Link>
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
