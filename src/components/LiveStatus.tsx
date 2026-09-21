"use client"
import { useEffect, useState } from "react"

// "Umay şu an ne yapıyor?" — sevimli, dönen durum kartı.
// Hydration güvenli: mount sonrası rastgele seçer ve periyodik değişir.

type Status = { emoji: string; tr: string; en: string }

const STATUSES: Status[] = [
  { emoji: "🚶‍♀️", tr: "Evde devriye turuna çıktı", en: "Out on a patrol lap around the house" },
  { emoji: "🏃‍♀️", tr: "Koridorda hız denemesi yapıyor", en: "Testing top speed in the hallway" },
  { emoji: "🦷", tr: "4 dişiyle her şeyi test ediyor", en: "Testing everything with all 4 teeth" },
  { emoji: "🗄️", tr: "Çekmeceleri tek tek boşaltıyor", en: "Emptying every drawer one by one" },
  { emoji: "😄", tr: "Sebepsiz yere gülüyor", en: "Giggling for no reason" },
  { emoji: "🧸", tr: "Ayıcığına brifing veriyor", en: "Briefing her teddy" },
  { emoji: "🤹", tr: "Oyuncakları fırlatıyor, fizik testi", en: "Tossing toys around — physics test" },
  { emoji: "🗣️", tr: "Yeni kelimeleri derliyor", en: "Compiling new words" },
  { emoji: "😴", tr: "Şekerleme molası veriyor", en: "Taking a nap break" },
  { emoji: "🐾", tr: "Pati dostlarını düşünüyor", en: "Thinking of her paw friends" },
]

export default function LiveStatus({ locale }: { locale: string }) {
  const tr = locale === "tr"
  const [i, setI] = useState<number | null>(null)

  useEffect(() => {
    setI(Math.floor(Math.random() * STATUSES.length))
    const id = setInterval(() => {
      setI((prev) => {
        let n = Math.floor(Math.random() * STATUSES.length)
        if (prev !== null && n === prev) n = (n + 1) % STATUSES.length
        return n
      })
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const s = i === null ? STATUSES[3] : STATUSES[i]

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-md border border-pink-100">
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
      </span>
      <span className="text-xs font-bold uppercase tracking-wider text-red-500">
        {tr ? "CANLI" : "LIVE"}
      </span>
      <span key={i ?? -1} className="animate-pop-in text-sm sm:text-base font-medium text-zinc-700">
        <span className="text-xl mr-1">{s.emoji}</span>
        {tr ? s.tr : s.en}
      </span>
    </div>
  )
}
