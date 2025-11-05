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
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-[#f2f7f7]">
      <div className="container flex flex-col lg:flex-row gap-10 px-5 lg:px-10">
        <div className="flex flex-col gap-30 max-w-[464px]">
          <div>
            <Image
              src="/images/netproxy-logo.png"
              alt="Net proxy Logo"
              width={174}
              height={43}
            />
          </div>
          <div className="text-#6c7993 text-13">
            NetProxy.io provides residential proxy services, helping users to
            access the internet anonymously and securely, supporting tasks such
            as web scraping and market research with high speed and reliability.
          </div>

          <div className="grid grid-cols-2 font-ibm-plex-mono font-semibold text-xs gap-2">
            <Link
              href="https://chromewebstore.google.com/detail/mnloefcpaepkpmhaoipjkpikbnkmbnic?utm_source=item-share-cb"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border"
            >
              <div className="w-10 h-10">
                <ChromeIcon />
              </div>
              EXTENSIONS FOR <span className="text-primary">CHROME</span>
            </Link>
            <Link
              href="https://www.proxifier.com/"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border"
            >
              <div className="w-10 h-10">
                <WindowIcon />
              </div>
              DOWNLOAD FOR <span className="text-[#ff4929]">WINDOWS</span>
            </Link>
            <Link
              href="https://apps.apple.com/us/app/shadowrocket/id932747118"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border"
            >
              <div className="w-10 h-10">
                <AppleIcon />
              </div>
              DOWNLOAD FOR <span className="text-[#ff4929]">IOS</span>
            </Link>{" "}
            <Link
              href="https://play.google.com/store/apps/details?id=com.scheler.superproxy"
              className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center box-border"
            >
              <div className="w-10 h-10">
                <AndroidIcon />
              </div>
              DOWNLOAD FOR <span className="text-[#29b4ff]">ANDROID</span>
            </Link>
          </div>
        </div>
        <div className="hidden min-[810px]:grid w-full grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Account
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
              Login
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Affiliate
            </div>
            <div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Reseller Program
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Link Program
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Category
            </div>
            <div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                FAQs
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Pricing
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Contact
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Service, Term
            </div>
            <div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Privacy Policy
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Cockie Policy
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Term, service
              </div>
              <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium menu-item">
                Refund Policy
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
                Account
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <div>Create Account</div> <div>Login</div>
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
                Category
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <Link href={"#"} className="text-primary underline">
                    FAQs
                  </Link>
                  <Link href={"#"} className="text-primary underline">
                    PRICING
                  </Link>
                  <Link href={"#"} className="text-primary underline">
                    CONTACT
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
                Service, Term
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <div>PRIVACY POLICY</div> <div>COOKIE POLICY</div>
                  <div>TERMS OF SERVICE</div>
                  <div>REFUND POLICY</div>
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
                Affiliate
              </AccordionTrigger>
              <AccordionContent className="pb-0! mt-2">
                <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                  <div>RESELLER PROGRAM</div> <div>LINK PROGRAM</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
};
