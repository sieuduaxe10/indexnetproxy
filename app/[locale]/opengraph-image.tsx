import { ImageResponse } from "next/og";


export const alt = "NetProxy.io — Residential P2P Proxies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#fc833d";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "white",
          fontFamily: "system-ui",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -260,
            top: -260,
            width: 900,
            height: 900,
            borderRadius: 9999,
            border: `2px solid ${BRAND}22`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            border: `2px solid ${BRAND}44`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${BRAND}55 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: -100,
            bottom: -100,
            width: 300,
            height: 300,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${BRAND}33 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 72,
            zIndex: 1,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: BRAND,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 900,
                color: "white",
              }}
            >
              N
            </div>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
              NetProxy.io
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 82,
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: -2.5,
                color: "white",
              }}
            >
              Residential P2P
            </span>
            <span
              style={{
                fontSize: 82,
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: -2.5,
                color: BRAND,
              }}
            >
              Proxies
            </span>
            <span
              style={{
                marginTop: 28,
                fontSize: 30,
                color: "#b4b4b4",
                fontWeight: 500,
              }}
            >
              The best proxy solution for MMO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 24,
              color: "#d4d4d4",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: BRAND, fontWeight: 800, fontSize: 30 }}>
                62M+
              </span>
              <span>IPs</span>
            </div>
            <span style={{ color: "#3a3a3a", fontSize: 28 }}>·</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: BRAND, fontWeight: 800, fontSize: 30 }}>
                220+
              </span>
              <span>Countries</span>
            </div>
            <span style={{ color: "#3a3a3a", fontSize: 28 }}>·</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: BRAND, fontWeight: 800, fontSize: 30 }}>
                99.9%
              </span>
              <span>Uptime</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
