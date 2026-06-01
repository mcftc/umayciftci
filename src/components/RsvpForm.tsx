"use client"
import { useState } from "react"

// Katılım formu — sayfadan ayrılmadan ad & soyad alır, /api/rsvp'ye gönderir.
// Kendi durumunu tutar; Toaster/sonner gerektirmez.
type Status = "idle" | "loading" | "done" | "error"

export default function RsvpForm() {
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) {
      setError("Lütfen ad ve soyad giriniz.")
      return
    }
    setStatus("loading")
    setError("")
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Gönderilemedi")
      }
      setStatus("done")
    } catch (err) {
      setStatus("error")
      setError((err as Error)?.message || "Bir hata oluştu, lütfen tekrar deneyin.")
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6 text-center space-y-2">
        <div className="text-5xl animate-bob">🎉</div>
        <h3 className="text-xl font-extrabold text-green-700">Harika, görüşürüz!</h3>
        <p className="text-sm text-zinc-600">
          <span className="font-semibold">{firstName} {lastName}</span> olarak katılımın kaydedildi.
          Seni partide görmek için sabırsızlanıyoruz 💛
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white/80 border-2 border-pink-100 p-5 sm:p-6 shadow-sm">
      {!open ? (
        <div className="text-center space-y-3">
          <p className="text-sm text-zinc-600">Geliyor musun? Bir tık uzaktayız 👇</p>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            ✋ Katılıyorum
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <h3 className="text-lg font-bold text-center text-zinc-800">Katılımını bildir 🎈</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="rsvp-first" className="text-xs font-semibold text-zinc-500">Ad</label>
              <input
                id="rsvp-first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                placeholder="Adın"
                className="w-full rounded-xl border-2 border-pink-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-pink-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="rsvp-last" className="text-xs font-semibold text-zinc-500">Soyad</label>
              <input
                id="rsvp-last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                placeholder="Soyadın"
                className="w-full rounded-xl border-2 border-pink-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-pink-300"
              />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-center pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-500 hover:bg-zinc-100 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? "Gönderiliyor…" : "Katılımı kaydet 💛"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
