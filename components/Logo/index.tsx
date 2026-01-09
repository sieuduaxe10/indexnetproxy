"use client";

import Image from "next/image";
import { useState } from "react";
import { useBranding } from "@/lib/branding/context";

const DEFAULT_LOGO = "/images/logo/Logo.webp";

const Logo = () => {
  const [hasError, setHasError] = useState(false);
  const { logoLightUrl } = useBranding();
  const src = hasError || !logoLightUrl ? DEFAULT_LOGO : logoLightUrl;

  return (
    <div className="flex items-center">
      <Image
        src={src}
        alt="Netproxy Logo"
        width={174}
        height={44}
        sizes="(min-width: 810px) 134.5px, 174px"
        className="w-[174px] h-[43.98px] 4xl:w-[134.5px] 4xl:h-[34px]"
        unoptimized={!hasError && !!logoLightUrl}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Logo;
