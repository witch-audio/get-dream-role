import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: "#F5F1E8",
        }}
      >
        {/* top row: logo + eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#E8A34B",
              marginRight: 14,
            }}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.01em",
              color: "#F5F1E8",
            }}
          >
            GetDreamRole
          </div>
          <div
            style={{
              marginLeft: 24,
              fontSize: 14,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E8A34B",
            }}
          >
            Beat the ATS
          </div>
        </div>

        {/* middle row: headline column + score card */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 720,
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#F5F1E8",
              }}
            >
              Pass the filter.
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#F5F1E8",
              }}
            >
              Land the interview.
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 24,
                lineHeight: 1.4,
                color: "#9B9689",
                width: 680,
              }}
            >
              The ATS resume optimizer built for Greenhouse, Workday, Lever, iCIMS, and Taleo.
            </div>
          </div>

          {/* score card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 40,
              padding: "28px 32px",
              border: "1px solid #2A2A2A",
              borderRadius: 16,
              backgroundColor: "#141414",
              width: 296,
            }}
          >
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9B9689",
              }}
            >
              ATS Score
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 800,
                lineHeight: 1,
                marginTop: 8,
                color: "#4CD98D",
              }}
            >
              87
            </div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9B9689",
                marginTop: 22,
              }}
            >
              ATS Compatibility
            </div>
            <div
              style={{
                marginTop: 10,
                height: 6,
                width: "100%",
                backgroundColor: "#2A2A2A",
                borderRadius: 999,
                display: "flex",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "87%",
                  backgroundColor: "#E8A34B",
                  borderRadius: 999,
                  display: "flex",
                }}
              />
            </div>
          </div>
        </div>

        {/* bottom row: rating + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 12, fontSize: 24 }}>⭐⭐⭐⭐⭐</div>
            <div style={{ color: "#9B9689" }}>4.9 from 1,200+ job seekers</div>
          </div>
          <div style={{ color: "#9B9689" }}>getdreamrole.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
