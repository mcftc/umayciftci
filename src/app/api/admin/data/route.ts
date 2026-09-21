import { NextResponse } from "next/server"
import { listEntries, type GuestEntry, type RsvpEntry } from "@/lib/store"

// Yönetim verisi — sadece doğru anahtarla. Notlar (silme url'siyle) + katılımcılar.
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key")
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  try {
    const [notesRaw, rsvpRaw] = await Promise.all([
      listEntries<GuestEntry>("guestbook/"),
      listEntries<RsvpEntry>("rsvp/"),
    ])

    const notes = notesRaw
      .filter((n) => typeof n.at === "number")
      .sort((a, b) => b.at - a.at)
      .map((n) => ({ id: n.id, name: n.name, message: n.message, at: n.at, url: n._url }))

    const attendees = rsvpRaw
      .filter((r) => typeof r.at === "number")
      .sort((a, b) => b.at - a.at)
      .map((r) => ({ id: r.id, firstName: r.firstName, lastName: r.lastName, at: r.at }))

    return NextResponse.json({ notes, attendees })
  } catch (err) {
    console.error("Admin data error:", err)
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 })
  }
}
