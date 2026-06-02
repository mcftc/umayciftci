import { ImageResponse } from "@vercel/og"

// Eğlenceli sekme logosu (favicon) — pastel gradyan üzerinde doğum günü pastası.
export const runtime = "edge"
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          borderRadius: 16,
          background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #3b82f6 100%)",
        }}
      >
        🎂
      </div>
    ),
    { ...size }
  )
}
