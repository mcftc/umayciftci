"use client"
import { useEffect, useState } from "react"

type Entry = { id: string; name: string; message: string; at: number }
type Status = "idle" | "loading" | "error"

// Sevimli post-it renkleri ve hafif eğimler — id'ye göre sabit (hydration-safe).
const NOTE_STYLES = [
  { bg: "bg-pink-100", ring: "ring-pink-200", rot: "-rotate-1" },
  { bg: "bg-yellow-100", ring: "ring-yellow-200", rot: "rotate-1" },
  { bg: "bg-purple-100", ring: "ring-purple-200", rot: "-rotate-2" },
  { bg: "bg-blue-100", ring: "ring-blue-200", rot: "rotate-2" },
  { bg: "bg-green-100", ring: "ring-green-200", rot: "-rotate-1" },
  { bg: "bg-orange-100", ring: "ring-orange-200", rot: "rotate-1" },
]

function styleFor(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return NOTE_STYLES[h % NOTE_STYLES.length]
}

function formatDate(at: number) {
  try {
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long" }).format(new Date(at))
  } catch {
    return ""
  }
}

export default function GuestbookWall() {
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")
  const [justSent, setJustSent] = useState(false)

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((d) => setEntries(Array.isArray(d.entries) ? d.entries : []))
      .catch(() => setEntries([]))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError("Lütfen ismini ve mesajını yaz.")
      return
    }
    setStatus("loading")
    setError("")
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.entry) throw new Error(data?.error || "Gönderilemedi")
      setEntries((prev) => [data.entry as Entry, ...(prev ?? [])])
      setName("")
      setMessage("")
      setStatus("idle")
      setJustSent(true)
      setTimeout(() => setJustSent(false), 4000)
    } catch (err) {
      setStatus("error")
      setError((err as Error)?.message || "Bir hata oluştu, lütfen tekrar dene.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Not bırakma formu */}
      <form
        onSubmit={submit}
        className="rounded-3xl bg-white/85 border-2 border-purple-100 p-5 sm:p-6 shadow-sm space-y-4"
      >
        <div className="text-center space-y-1">
          <div className="text-4xl">📖✨</div>
          <h3 className="text-lg font-bold text-zinc-800">Umay’a bir not bırak 💌</h3>
          <p className="text-sm text-zinc-500">Güzel dileklerini yaz, hatıra defterimize eklensin.</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="gb-name" className="text-xs font-semibold text-zinc-500">İsmin</label>
          <input
            id="gb-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="İsmin (ör. Ayşe Teyze)"
            maxLength={60}
            className="w-full rounded-xl border-2 border-purple-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-purple-300"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="gb-msg" className="text-xs font-semibold text-zinc-500">Mesajın</label>
          <textarea
            id="gb-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Umay’a güzel dileklerini yaz… 🎂🎈"
            rows={3}
            maxLength={600}
            className="w-full resize-none rounded-xl border-2 border-purple-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-purple-300"
          />
          <div className="text-right text-[11px] text-zinc-400">{message.length}/600</div>
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {justSent && (
          <p className="text-center text-sm font-semibold text-green-600">
            Teşekkürler! Notun deftere eklendi 💛
          </p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "loading" ? "Ekleniyor…" : "Deftere ekle 📖"}
          </button>
        </div>
      </form>

      {/* Notlar duvarı */}
      {entries === null ? (
        <p className="text-center text-sm text-zinc-400">Defter açılıyor… 📖</p>
      ) : entries.length === 0 ? (
        <p className="text-center text-sm text-zinc-500">Henüz not yok — ilk güzel sözü sen yaz! ✨</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((en) => {
            const st = styleFor(en.id)
            return (
              <div
                key={en.id}
                className={`${st.bg} ${st.rot} rounded-2xl p-4 shadow-md ring-1 ${st.ring} transition-transform hover:rotate-0 hover:scale-[1.02]`}
              >
                <p className="whitespace-pre-line text-sm text-zinc-700 leading-relaxed">
                  “{en.message}”
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2">
                  <span className="text-sm font-bold text-zinc-800">— {en.name}</span>
                  <span className="text-[11px] text-zinc-500">{formatDate(en.at)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
