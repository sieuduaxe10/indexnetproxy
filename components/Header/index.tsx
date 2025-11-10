import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import Image from "next/image";
import { Nav } from "./Nav";
import Globe from "../Globe";
import { TopBar } from "../TopBar";
import HamburgerMenu from "../Hamburger";

export const Header = () => {
  return (
    <header className="w-full border-b border-gray-light fixed z-30 bg-background">
      <TopBar />
      <div className="p-4 flex items-center justify-center w-full h-[72px]">
        <div className="max-w-960 relative w-full">
          <div className="grid grid-cols-[auto_1fr_auto] items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            <nav className="justify-self-center max-[1199px]:hidden">
              <Nav />
            </nav>

            <div className="ml-auto flex items-center gap-2">
              {/* <Globe /> */}
              <Globe />

              <Button asChild className="hidden 4xl:flex h-10">
                <Link href="/get-started">
                  GET STARTED
                  <Image
                    src="/images/hero/pointer.svg"
                    alt="Proxy illustration"
                    width={20}
                    height={20}
                    className=""
                  />
                </Link>
              </Button>
              <HamburgerMenu className="7xl:hidden" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
