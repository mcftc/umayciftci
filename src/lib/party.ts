// ============================================================
//  Doğum günü partisi — tek doğruluk kaynağı (single source of truth)
// ============================================================
// Saat dilimi: Türkiye (UTC+3) — ISO'da +03:00 ile sabitliyoruz ki
// sunucu/istemci ve Vercel (UTC) hep aynı anı görsün.

export const PARTY_ISO = "2026-08-22T13:00:00+03:00"
export const PARTY_DATE = new Date(PARTY_ISO)

export const PARTY = {
  date_tr: "22 Ağustos 2026, Cumartesi",
  time_tr: "13.00",
  venue: "Tayyare Cafe",
  // Konum linki (Google Haritalar'da arama) — düz metinden güvenli URL
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tayyare+Cafe",
} as const
