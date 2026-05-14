"use client";

import Image from "next/image";
import { useState } from "react";
import { useBranding } from "@/lib/branding/context";

const DEFAULT_LOGO = "/images/logo/Logo.webp";

export const FooterLogo = () => {
  const [hasError, setHasError] = useState(false);
  const { logoLightUrl, businessName } = useBranding();
  const src = hasError || !logoLightUrl ? DEFAULT_LOGO : logoLightUrl;
  const alt = `${businessName || "NetProxy"} logo`;

  return (
    <Image
      src={src}
      alt={alt}
      width={174}
      height={43}
      unoptimized={!hasError && !!logoLightUrl}
      onError={() => setHasError(true)}
    />
  );
};
