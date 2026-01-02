"use client";

import { createContext, useContext, ReactNode } from "react";

export interface BrandingContextValue {
  businessName: string;
  logoUrl: string | null;
  logoIconUrl: string | null;
  ogImageUrl: string | null;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

interface BrandingProviderProps {
  children: ReactNode;
  branding: BrandingContextValue | null;
}

export function BrandingProvider({ children, branding }: BrandingProviderProps) {
  const value: BrandingContextValue = branding ?? {
    businessName: "",
    logoUrl: null,
    logoIconUrl: null,
    ogImageUrl: null,
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
      logoUrl: null,
      logoIconUrl: null,
      ogImageUrl: null,
    };
  }

  return context;
}
