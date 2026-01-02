"use client";

import Image from "next/image";
import { useState } from "react";
import { useBranding } from "@/lib/branding/context";

const DEFAULT_LOGO = "/images/logo/Logo.webp";

export const FooterLogo = () => {
  const [hasError, setHasError] = useState(false);
  const { logoUrl } = useBranding();
  const src = hasError || !logoUrl ? DEFAULT_LOGO : logoUrl;

  return (
    <Image
      src={src}
      alt="Net proxy Logo"
      width={174}
      height={43}
      unoptimized={!hasError && !!logoUrl}
      onError={() => setHasError(true)}
    />
  );
};
