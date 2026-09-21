"use client"
import { useEffect, useState } from "react"
import { ageFrom, type AgeParts } from "@/lib/umay"

type Props = { locale: string }

const L = {
  tr: { y: "yıl", mo: "ay", d: "gün", h: "saat", m: "dk", s: "sn", since: "Dünyaya geleli" },
  en: { y: "yr", mo: "mo", d: "days", h: "hrs", m: "min", s: "sec", since: "In the world for" },
}

function Cell({ n, label }: { n: number | null; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/80 backdrop-blur px-2.5 py-2 sm:px-4 sm:py-3 shadow-md border border-pink-100 min-w-[56px] sm:min-w-[76px]">
      <span className="text-2xl sm:text-4xl font-extrabold tabular-nums bg-gradient-to-b from-pink-500 to-purple-500 bg-clip-text text-transparent">
        {n === null ? "00" : n.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-xs uppercase tracking-wider text-zinc-500 font-medium">
        {label}
      </span>
    </div>
  )
}

export default function AgeCounter({ locale }: Props) {
  const t = L[locale === "tr" ? "tr" : "en"]
  // null = henüz mount olmadı. Server ve client ilk render'da AYNI ("00") →
  // hydration uyuşmazlığı olmaz. Mount sonrası gerçek değerle tiklemeye başlar.
  const [p, setP] = useState<AgeParts | null>(null)

  useEffect(() => {
    setP(ageFrom())
    const id = setInterval(() => setP(ageFrom()), 1000)
    return () => clearInterval(id)
  }, [])

  // Yıl hücresi HER ZAMAN render edilir (mount öncesi "00"). Mount sonrası
  // koşullu eklenseydi hücre sayısı 5→6 olur ve hidrasyondan sonra satır kayardı.
  const cells: { key: string; n: number | null; label: string }[] = [
    { key: "y", n: p ? p.years : null, label: t.y },
    { key: "mo", n: p ? p.months : null, label: t.mo },
    { key: "d", n: p ? p.days : null, label: t.d },
    { key: "h", n: p ? p.hours : null, label: t.h },
    { key: "m", n: p ? p.minutes : null, label: t.m },
    { key: "s", n: p ? p.seconds : null, label: t.s },
  ]

  return (
    <div className="space-y-2">
      <p className="text-xs sm:text-sm text-zinc-500 font-medium">{t.since} 🎂</p>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5">
        {cells.map((c) => (
          <Cell key={c.key} n={c.n} label={c.label} />
        ))}
      </div>
    </div>
  )
}
