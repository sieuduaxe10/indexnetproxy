"use client";

import { createContext, useContext, ReactNode } from "react";

export interface BrandingContextValue {
  businessName: string;
  storefrontUrl: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  iconLightUrl: string | null;
  iconDarkUrl: string | null;
  ogImageUrl: string | null;
  blogEnabled: boolean;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

interface BrandingProviderProps {
  children: ReactNode;
  branding: BrandingContextValue | null;
}

export function BrandingProvider({ children, branding }: BrandingProviderProps) {
  const value: BrandingContextValue = branding ?? {
    businessName: "",
    storefrontUrl: null,
    logoLightUrl: null,
    logoDarkUrl: null,
    iconLightUrl: null,
    iconDarkUrl: null,
    ogImageUrl: null,
    blogEnabled: false,
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding(): BrandingContextValue {
  const context = useContext(BrandingContext);

  if (context === null) {
    return {
      businessName: "",
      storefrontUrl: null,
      logoLightUrl: null,
      logoDarkUrl: null,
      iconLightUrl: null,
      iconDarkUrl: null,
      ogImageUrl: null,
      blogEnabled: false,
    };
  }

  return context;
}
