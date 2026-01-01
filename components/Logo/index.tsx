"use client";

import Image from "next/image";
import { useBranding } from "@/lib/branding/context";

const DEFAULT_LOGO = "/images/logo/Logo.webp";

const Logo = () => {
  const { logoUrl } = useBranding();
  const src = logoUrl || DEFAULT_LOGO;

  return (
    <div className="flex items-center">
      <Image
        src={src}
        alt="Netproxy Logo"
        width={174}
        height={44}
        sizes="(min-width: 810px) 134.5px, 174px"
        className="w-[174px] h-[43.98px] 4xl:w-[134.5px] 4xl:h-[34px]"
        unoptimized={!!logoUrl}
      />
    </div>
  );
};

export default Logo;
