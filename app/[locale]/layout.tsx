import type { Metadata } from "next";
import "../globals.css";
import { geistSans, ibmPlexMono, notoSans, inter } from "../fonts";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const neueKaineFont = localFont({
  src: "../fonts/neue-kaine-variable-bold.woff2",
  variable: "--font-neue-kaine",
});

const neueKaineBoldFont = localFont({
  src: "../fonts/neue-kaine-variable-bold.woff2",
  variable: "--font-neue-kaine-bold",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "vi" | "zh" | "hi")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${notoSans.variable} ${ibmPlexMono.variable} ${geistSans.variable} ${neueKaineFont.variable} ${neueKaineBoldFont.variable} ${inter.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
