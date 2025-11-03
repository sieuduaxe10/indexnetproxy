import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
// import { ibmPlexMono } from "@/app/fonts";
import Image from "next/image";
import { Nav } from "./Nav";
import { Globe } from "../Globe";

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

//  {/* Burger (shows when <1200px) */}
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="ml-1 h-9 w-9 max-[1199px]:inline-flex min-[1200px]:hidden"
//                 aria-label="Open menu"
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             {/* Mobile menu (Sheet) */}
//             <SheetContent
//               side="right"
//               className="w-[320px] max-w-[85vw] p-0"
//               aria-describedby={undefined}
//             >
//               {/* Header row inside sheet */}
//               <div className="flex items-center justify-between border-b px-4 py-3">
//                 <Link
//                   href="/"
//                   className="flex items-center gap-2"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 font-bold text-white">
//                     N
//                   </span>
//                   <span className="font-semibold">
//                     <span className="text-black">netproxy</span>
//                     <span className="text-orange-500">.io</span>
//                   </span>
//                 </Link>

//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="h-9 w-9 rounded-md"
//                     aria-label="Change region"
//                   >
//                     <Globe className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setOpen(false)}
//                     aria-label="Close menu"
//                   >
//                     <X className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Nav list */}
//               <nav className="px-6 py-6">
//                 <ul className="flex flex-col gap-6">
//                   {NAV.map(({ href, label, icon: Icon }) => (
//                     <li key={href}>
//                       <Link
//                         href={href}
//                         className="flex items-center gap-3 text-base"
//                         onClick={() => setOpen(false)}
//                       >
//                         <Icon className="h-5 w-5 text-black/70" />
//                         <span className="tracking-wide">{label}</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </SheetContent>
//           </Sheet>
