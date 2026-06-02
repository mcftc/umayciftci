"use client"
import { useEffect, useState } from "react"
import { PARTY_ISO } from "@/lib/party"

// Partiye geri sayım — istemci tarafında çalışır (hydration-safe).
const TARGET = new Date(PARTY_ISO).getTime()

type Parts = { days: number; hours: number; minutes: number; seconds: number; over: boolean }

function calc(): Parts {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    over: false,
  }
}

export default function PartyCountdown() {
  const [p, setP] = useState<Parts | null>(null)

  useEffect(() => {
    setP(calc())
    const t = setInterval(() => setP(calc()), 1000)
    return () => clearInterval(t)
  }, [])

  // İlk render (sunucu) ve mount öncesi: yer tutucu (mismatch olmasın diye).
  if (!p) {
    return (
      <div className="rounded-2xl bg-white/70 px-4 py-3 text-center text-sm text-zinc-400">
        Geri sayım yükleniyor…
      </div>
    )
  }

  if (p.over) {
    return (
      <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-4 text-center text-white shadow-md">
        <span className="text-lg font-extrabold">🎉 Parti zamanı geldi! 🎂</span>
      </div>
    )
  }

  const cells = [
    { v: p.days, l: "gün" },
    { v: p.hours, l: "saat" },
    { v: p.minutes, l: "dakika" },
    { v: p.seconds, l: "saniye" },
  ]

  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-semibold text-zinc-500">Partiye kalan süre ⏳</p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cells.map((c) => (
          <div
            key={c.l}
            className="rounded-2xl bg-white/90 px-1 py-3 text-center shadow-sm ring-1 ring-pink-100"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 tabular-nums">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="text-[11px] uppercase tracking-wide text-zinc-400">{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
