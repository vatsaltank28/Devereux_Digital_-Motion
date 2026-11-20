import { ImageResponse } from "next/og";

export const alt = "Devereux Digitals | full service digital agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated Open Graph / social preview. Replace with an art directed image once final brand assets exist. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          color: "#f7f8fa",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -60,
            width: 760,
            height: 760,
            borderRadius: 760,
            border: "2px solid rgba(57,139,255,0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 100,
            width: 460,
            height: 460,
            borderRadius: 460,
            border: "1px solid rgba(255,255,255,0.22)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 600 }}>
          <div style={{ width: 18, height: 18, borderRadius: 18, background: "#398bff", display: "flex" }} />
          Devereux Digitals
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 820, display: "flex" }}>
            Digital experiences that move businesses forward.
          </div>
          <div style={{ fontSize: 30, color: "#a5a9b2", display: "flex" }}>Full service digital agency</div>
        </div>
      </div>
    ),
    size,
  );
}
