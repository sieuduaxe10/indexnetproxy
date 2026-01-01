"use client";

import { createContext, useContext, ReactNode } from "react";

interface BrandingContextType {
  logoUrl: string | null;
}

const BrandingContext = createContext<BrandingContextType>({
  logoUrl: null,
});

export function BrandingProvider({
  logoUrl,
  children,
}: {
  logoUrl: string | null;
  children: ReactNode;
}) {
  return (
    <BrandingContext.Provider value={{ logoUrl }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  return useContext(BrandingContext);
}
