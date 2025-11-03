import type { Metadata } from "next";
import "./globals.css";
import { geistSans, ibmPlexMono, notoSans } from "./fonts";

export const metadata: Metadata = {
  title: "Residential P2P Proxies – The Best Proxy Solution for MMO",
  description:
    "NetProxy.io offers secure, high-performance residential P2P proxies for MMO gamers and marketers. Enjoy global access, low latency, and stable connections with millions of real IPs. Experience ultimate online freedom and reliability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${ibmPlexMono.variable} ${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
