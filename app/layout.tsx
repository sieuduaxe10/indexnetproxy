import "./globals.css";
import { geistSans, ibmPlexMono, notoSans, inter } from "./fonts";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";

const neueKaineFont = localFont({
  src: "./fonts/neue-kaine-variable-bold.woff2",
  variable: "--font-neue-kaine",
});

const neueKaineBoldFont = localFont({
  src: "./fonts/neue-kaine-variable-bold.woff2",
  variable: "--font-neue-kaine-bold",
});

// All metadata (including icons) is handled dynamically in [locale]/layout.tsx
// via generateDynamicMetadata which uses the logos API for reseller detection

type Locale = (typeof routing.locales)[number];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: Locale }>;
}) {
  const resolvedParams = params ? await params : undefined;
  const locale = resolvedParams?.locale ?? "en";
  const bodyClassName = `${notoSans.variable} ${ibmPlexMono.variable} ${geistSans.variable} ${neueKaineFont.variable} ${neueKaineBoldFont.variable} ${inter.variable} antialiased`;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
