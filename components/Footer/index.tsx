import Image from "next/image";
import { ChromeIcon } from "../icons/ChromeIcon";
import { WindowIcon } from "../icons/WindowIcon";
import { AndroidIcon } from "../icons/AndroidIcon";
import { AppleIcon } from "../icons/AppleIcon";

export const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-[#f2f7f7]">
      <div className="container flex flex-row gap-10">
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
        <div className="w-full ">
          <div>
            <div>Account</div>
            <div>Login</div>
          </div>
          <div>
            <div>Affiliate</div>
            <div>Reseller Program</div>
            <div>Link Program</div>
          </div>
          <div>
            <div>Category</div>
            <div>FAQs</div>
            <div>Pricing</div>
            <div>Contact</div>
          </div>
          <div>
            <div>Service, Term</div>
            <div>Privacy Policy</div>
            <div>Cockie Policy</div>
            <div>Term, service</div>
            <div>Refund Policy</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
