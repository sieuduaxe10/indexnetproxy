"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { Nav } from "./Nav";
import Globe from "../Globe";
import { TopBar } from "../TopBar";
import HamburgerMenu from "../Hamburger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useBranding } from "@/lib/branding/context";

export const Header = () => {
  const tCommon = useTranslations("common");
  const { storefrontUrl } = useBranding();

  return (
    <header className="w-full border-b border-gray-light fixed z-30 bg-background">
      <TopBar />
      <div className="px-5 py-4 4xl:px-10 flex items-center justify-center w-full h-[89px] 7xl:h-[72px] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:pointer-events-none after:rounded-inherit after:border-t-0 after:border-r-0 after:border-b after:border-l-0 after:border-solid after:border-b-[rgb(227,236,236)] 4xl:after:border-b-0">
        <div className="max-w-960 relative w-full">
          <div className="grid grid-cols-[auto_1fr_auto] items-center">
            <Link
              href="/"
              className="flex items-center gap-2 w-[174px] 4xl:w-fit h-auto aspect-[3.95455]"
            >
              <Logo />
            </Link>

            <nav className="justify-self-center hidden 7xl:block">
              <Nav />
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <Globe />

              {storefrontUrl && (
                <Button asChild className="hidden 4xl:flex h-10">
                  <Link href={storefrontUrl}>
                    {tCommon("getStarted").toUpperCase()}
                    <Image
                      src="/images/hero/pointer.svg"
                      alt="Proxy illustration"
                      width={20}
                      height={20}
                    />
                  </Link>
                </Button>
              )}
              <HamburgerMenu className="flex items-center justify-center 7xl:hidden" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
