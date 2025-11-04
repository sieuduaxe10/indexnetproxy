import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
// import { ibmPlexMono } from "@/app/fonts";
import Image from "next/image";
import { Nav } from "./Nav";
import Globe from "../Globe";

export const Header = () => {
  return (
    <header className="w-full border-b border-gray-light">
      <div className="mx-auto max-w-960 px-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <nav className="justify-self-center max-[1199px]:hidden">
            <Nav />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* <Globe /> */}
            <Globe />

            <Button asChild className="h-9">
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
          </div>
        </div>
      </div>
    </header>
  );
};
