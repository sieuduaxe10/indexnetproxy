import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NetProxy.io — Residential P2P Proxies",
    short_name: "NetProxy",
    description:
      "Secure, high-performance residential P2P proxies with 62M+ IPs across 220+ countries.",
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#fc833d",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
