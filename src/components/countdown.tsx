"use client"
import { useEffect, useMemo, useState } from "react"

type Parts = { days: number; hours: number; minutes: number; seconds: number }
function diff(target: Date): Parts {
  const ms = Math.max(target.getTime() - Date.now(), 0)
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  }
}
export default function Countdown({ iso }: { iso: string }) {
  const target = useMemo(() => new Date(iso), [iso])
  const [p, setP] = useState<Parts>(() => diff(target))
  useEffect(() => { const id = setInterval(() => setP(diff(target)), 1000); return () => clearInterval(id) }, [target])
  const Cell = (n: number, label: string) => (
    <div className="rounded-xl border bg-white/70 px-4 py-3 min-w-[88px]">
      <div className="text-3xl md:text-4xl font-bold tabular-nums">{n.toString().padStart(2,"0")}</div>
      <div className="text-xs uppercase tracking-wider text-zinc-600">{label}</div>
    </div>
  )
  return <div className="flex justify-center gap-3 md:gap-5">{Cell(p.days,"gün")}{Cell(p.hours,"saat")}{Cell(p.minutes,"dk")}{Cell(p.seconds,"sn")}</div>
}
