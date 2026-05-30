"use client"
import { useEffect, useState } from "react"

// Sayfa açılışında bir kez patlayan hafif konfeti. Bağımlılık yok, saf CSS/JS.
type Piece = { id: number; left: number; bg: string; delay: number; rot: number; dur: number }

const COLORS = ["#ec4899", "#a855f7", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#14b8a6"]

export default function Confetti({ pieces = 70 }: { pieces?: number }) {
  const [items, setItems] = useState<Piece[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    setItems(
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        bg: COLORS[i % COLORS.length],
        delay: Math.random() * 0.6,
        rot: Math.random() * 360,
        dur: 2.4 + Math.random() * 1.8,
      }))
    )
    const t = setTimeout(() => setDone(true), 5000)
    return () => clearTimeout(t)
  }, [pieces])

  if (done) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-[60]">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-16px] block h-2.5 w-2.5 animate-confetti-fall rounded-[2px]"
          style={{
            left: `${p.left}%`,
            background: p.bg,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  )
}
