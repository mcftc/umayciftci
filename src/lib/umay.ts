// ============================================================
//  Umay — tek doğruluk kaynağı (single source of truth)
// ============================================================
// Umay 1 Eylül'ü 2 Eylül'e bağlayan gece ~02:00'da doğdu.
// 5 Eylül'e planlıydı, 3 gün erken geldi (sabırsız 🚀).
// Saat dilimi: Türkiye (UTC+3) — ISO'da +03:00 ile sabitliyoruz
// ki sunucu/istemci ve Vercel (UTC) hep aynı anı görsün.

export const BIRTH_ISO = "2025-09-02T02:00:00+03:00"
export const BIRTH_DATE = new Date(BIRTH_ISO)

// Planlanan tarih ve "kaç gün erken"
export const DUE_ISO = "2025-09-05T00:00:00+03:00"
export const DAYS_EARLY = 3

export const NAME = "Umay"
export const FULL_NAME = "Umay Çiftçi"

export type AgeParts = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number // doğumdan bu yana toplam tam gün
  totalHours: number
}

// Takvime duyarlı yaş (yıl/ay/gün) + canlı saat/dakika/saniye.
// `now` verilmezse şu anı kullanır (istemcide her saniye çağrılır).
export function ageFrom(now: Date = new Date()): AgeParts {
  const birth = BIRTH_DATE
  const ms = Math.max(now.getTime() - birth.getTime(), 0)

  // Toplam metrikler
  const totalDays = Math.floor(ms / 86_400_000)
  const totalHours = Math.floor(ms / 3_600_000)

  // Takvimsel yıl/ay/gün farkı
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months -= 1
    // önceki ayın gün sayısı
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  // Günün içindeki saat/dakika/saniye
  const hours = Math.floor((ms / 3_600_000) % 24)
  const minutes = Math.floor((ms / 60_000) % 60)
  const seconds = Math.floor((ms / 1_000) % 60)

  return { years, months, days, hours, minutes, seconds, totalDays, totalHours }
}

// "9 aylık" / "1 yaş 2 aylık" gibi okunaklı yaş etiketi
export function ageLabel(locale: string, now: Date = new Date()): string {
  const { years, months } = ageFrom(now)
  const tr = locale === "tr"
  if (years <= 0) {
    return tr ? `${months} aylık` : `${months} months old`
  }
  if (months === 0) {
    return tr ? `${years} yaşında` : `${years} ${years === 1 ? "year" : "years"} old`
  }
  return tr
    ? `${years} yaş ${months} aylık`
    : `${years}y ${months}m old`
}

// Doğumdan bu yana toplam gün (server-render için güvenli)
export function daysOld(now: Date = new Date()): number {
  return ageFrom(now).totalDays
}
