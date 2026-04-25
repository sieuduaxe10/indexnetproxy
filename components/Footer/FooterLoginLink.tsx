"use client";

import Link from "next/link";
import { useBranding } from "@/lib/branding/context";

export function FooterLoginLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { storefrontUrl } = useBranding();

  if (!storefrontUrl) return null;

  return (
    <Link href={storefrontUrl} className={className}>
      {children}
    </Link>
  );
}
