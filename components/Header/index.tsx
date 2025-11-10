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
      <div className="mx-auto max-w-960 relative">
        <div className="grid grid-cols-[auto_1fr_auto] items-center px-5 md:px-10 py-4 xl:py-3">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <nav className="justify-self-center max-[1199px]:hidden">
            <Nav />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* <Globe /> */}
            <Globe />

            <Button asChild className="h-9 hidden 4xl:flex">
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
    </header>
  );
};
