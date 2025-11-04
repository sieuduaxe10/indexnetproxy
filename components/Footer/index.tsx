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
          <div>
            NetProxy.io provides residential proxy services, helping users to
            access the internet anonymously and securely, supporting tasks such
            as web scraping and market research with high speed and reliability.
          </div>
          <div className="grid grid-cols-2 font-ibm-plex-mono font-semibold text-xs gap-2">
            <div className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center">
              <div className="w-10 h-10">
                <ChromeIcon />
              </div>
              EXTENSIONS FOR <span className="text-primary">CHROME</span>
            </div>
            <div className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center">
              <div className="w-10 h-10">
                <WindowIcon />
              </div>
              DOWNLOAD FOR WINDOWS
            </div>
            <div className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center">
              <div className="w-10 h-10">
                <AppleIcon />
              </div>
              DOWNLOAD FOR IOS
            </div>{" "}
            <div className="flex flex-row gap-2 items-center text-xs bg-white rounded-md justify-center">
              <div className="w-10 h-10">
                <AndroidIcon />
              </div>
              DOWNLOAD FOR ANDROID
            </div>
          </div>
        </div>
        <div className="hidden min-[810px]:grid w-full grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Account
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Login
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Affiliate
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Reseller Program
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Link Program
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Category
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              FAQs
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Pricing
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Contact
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-neue-kaine-bold text-primary text-21">
              Service, Term
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Privacy Policy
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Cockie Policy
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Term, service
            </div>
            <div className="text-xs font-ibm-plex-mono uppercase text-footer-text font-medium">
              Refund Policy
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
