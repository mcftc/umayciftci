"use client"
import { useEffect, useState } from "react"

type Note = { id: string; name: string; message: string; at: number; url: string }
type Attendee = { id: string; firstName: string; lastName: string; at: number }

function fmt(at: number) {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(at))
  } catch {
    return ""
  }
}

export default function AdminDashboard({ adminKey }: { adminKey: string }) {
  const [notes, setNotes] = useState<Note[] | null>(null)
  const [attendees, setAttendees] = useState<Attendee[] | null>(null)
  const [err, setErr] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/admin/data?key=${encodeURIComponent(adminKey)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error || "Veri alınamadı")
        return r.json()
      })
      .then((d) => {
        setNotes(Array.isArray(d.notes) ? d.notes : [])
        setAttendees(Array.isArray(d.attendees) ? d.attendees : [])
      })
      .catch((e) => setErr(e.message))
  }, [adminKey])

  async function remove(note: Note) {
    if (!confirm(`"${note.name}" notunu silmek istiyor musun?`)) return
    setDeleting(note.id)
    try {
      const res = await fetch("/api/admin/delete-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, url: note.url }),
      })
      if (!res.ok) throw new Error("Silinemedi")
      setNotes((prev) => (prev ? prev.filter((n) => n.id !== note.id) : prev))
    } catch {
      alert("Not silinemedi, tekrar dene.")
    } finally {
      setDeleting(null)
    }
  }

  if (err) {
    return <p className="text-center text-sm text-red-500">{err}</p>
  }

  return (
    <div className="space-y-10">
      {/* Katılımcılar */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          ✋ Katılımcılar
          {attendees && (
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-sm font-bold text-pink-600">
              {attendees.length}
            </span>
          )}
        </h2>
        {attendees === null ? (
          <p className="text-sm text-zinc-400">Yükleniyor…</p>
        ) : attendees.length === 0 ? (
          <p className="text-sm text-zinc-500">Henüz katılım yok.</p>
        ) : (
          <div className="rounded-2xl border-2 border-pink-100 overflow-hidden">
            {attendees.map((a, i) => (
              <div
                key={a.id}
                className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                  i % 2 ? "bg-white" : "bg-pink-50/50"
                }`}
              >
                <span className="font-medium text-zinc-700">
                  {i + 1}. {a.firstName} {a.lastName}
                </span>
                <span className="text-xs text-zinc-400">{fmt(a.at)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Notlar */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          📖 Hatıra Defteri Notları
          {notes && (
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-sm font-bold text-purple-600">
              {notes.length}
            </span>
          )}
        </h2>
        {notes === null ? (
          <p className="text-sm text-zinc-400">Yükleniyor…</p>
        ) : notes.length === 0 ? (
          <p className="text-sm text-zinc-500">Henüz not yok.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((n) => (
              <div
                key={n.id}
                className="rounded-2xl border-2 border-purple-100 bg-white p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="whitespace-pre-line text-sm text-zinc-700">“{n.message}”</p>
                  <div className="mt-1.5 text-xs text-zinc-400">
                    — <span className="font-semibold text-zinc-600">{n.name}</span> · {fmt(n.at)}
                  </div>
                </div>
                <button
                  onClick={() => remove(n)}
                  disabled={deleting === n.id}
                  className="shrink-0 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  {deleting === n.id ? "Siliniyor…" : "🗑 Sil"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
