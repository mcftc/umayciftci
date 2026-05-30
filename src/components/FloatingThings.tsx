"use client"
import { useEffect, useState } from "react"

// Arka planda yavaşça yukarı süzülen sevimli emojiler (kalp, yıldız, balon...).
// Tamamen dekoratif, pointer-events yok. Hydration güvenli (mount sonrası üretilir).

const EMOJIS = ["💕", "⭐", "🍼", "🎈", "🧸", "✨", "🐾", "💫", "🌸", "🫧"]

type Item = {
  id: number
  emoji: string
  left: number
  size: number
  duration: number
  delay: number
}

export default function FloatingThings({ count = 14 }: { count?: number }) {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const arr: Item[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 100,
      size: 14 + Math.random() * 26,
      duration: 9 + Math.random() * 12,
      delay: Math.random() * 10,
    }))
    setItems(arr)
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute bottom-[-40px] animate-float-up opacity-70 select-none"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  )
}
