import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GetDreamRole — AI Resume Optimizer for ATS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#0a0a10",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#d4873e",
            }}
          />
          <span
            style={{
              color: "#ede9e3",
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
            }}
          >
            GetDreamRole
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#d4873e",
              fontSize: "16px",
              fontWeight: "600",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            AI RESUME OPTIMIZER
          </div>
          <div
            style={{
              color: "#ede9e3",
              fontSize: "72px",
              fontWeight: "800",
              lineHeight: "1.05",
              letterSpacing: "-2px",
            }}
          >
            Beat the ATS.
            <br />
            Get the interview.
          </div>
          <div
            style={{
              color: "#7d7a8a",
              fontSize: "26px",
              lineHeight: "1.5",
              maxWidth: "700px",
            }}
          >
            Tuned for Greenhouse, Lever, Workday &amp; more.
            One-time $9.99.
          </div>
        </div>

        {/* Bottom: score card + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {/* Score badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              backgroundColor: "#12121b",
              border: "1px solid #242432",
              borderRadius: "16px",
              padding: "20px 32px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: "#7d7a8a", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
                ATS SCORE
              </span>
              <span style={{ color: "#4ade80", fontSize: "52px", fontWeight: "800", lineHeight: "1" }}>
                87
              </span>
            </div>
            <div
              style={{
                width: "1px",
                height: "48px",
                backgroundColor: "#242432",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: "#7d7a8a", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
                MATCH SCORE
              </span>
              <span style={{ color: "#d4873e", fontSize: "52px", fontWeight: "800", lineHeight: "1" }}>
                92
              </span>
            </div>
          </div>

          {/* Domain */}
          <span style={{ color: "#7d7a8a", fontSize: "20px" }}>
            getdreamrole.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
