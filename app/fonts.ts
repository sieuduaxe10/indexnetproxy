import { Geist, Noto_Sans, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const inter = localFont({
  src: [
    {
      path: "/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Inter-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
