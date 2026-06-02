import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { saveEntry } from "@/lib/store"
import { checkRate, getIp, isBot } from "@/lib/spam"
import { PARTY } from "@/lib/party"

// Katılım (RSVP) — ad & soyad alır, kalıcı saklar (katılımcı listesi için) ve ev sahibine e-posta gönderir.
export const dynamic = "force-dynamic"

const PREFIX = "rsvp/"

const schema = z.object({
  firstName: z.string().trim().min(1, "Ad gerekli").max(80),
  lastName: z.string().trim().min(1, "Soyad gerekli").max(80),
  website: z.string().optional(), // honeypot
})

export type RsvpEntry = { id: string; firstName: string; lastName: string; at: number }

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 })
  }

  if (isBot(body)) return NextResponse.json({ ok: true })

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Lütfen ad ve soyad giriniz." }, { status: 400 })
  }
  const { firstName, lastName } = parsed.data

  if (!checkRate(`rsvp:${getIp(req)}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Çok hızlı gönderiyorsun, biraz bekle 🙏" }, { status: 429 })
  }

  const fullName = `${firstName} ${lastName}`

  // Kalıcı kaydet (katılımcı listesi için) — token yoksa atla, e-posta yine denenir.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const at = Date.now()
      const id = `${at}-${Math.random().toString(36).slice(2, 10)}`
      const entry: RsvpEntry = { id, firstName, lastName, at }
      await saveEntry(PREFIX, id, entry)
    } catch (err) {
      console.error("RSVP save error (will still email):", err)
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.RSVP_TO
  if (!apiKey || !to) {
    console.error("RSVP: RESEND_API_KEY veya RSVP_TO tanımlı değil")
    // Kayıt yapıldıysa misafire başarı dön; aksi halde hata.
    if (process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: "Sunucu yapılandırması eksik" }, { status: 500 })
  }

  const from = process.env.MAIL_FROM || "Umay Davetiye <onboarding@resend.dev>"
  const resend = new Resend(apiKey)
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#a855f7">🎉 Yeni katılım!</h2>
      <p style="font-size:18px"><strong>${fullName}</strong> partiye katılıyor.</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <p style="color:#666;font-size:14px">
        📅 ${PARTY.date_tr}<br/>🕐 Saat ${PARTY.time_tr}<br/>📍 ${PARTY.venue}
      </p>
    </div>`

  try {
    const { error } = await resend.emails.send({ from, to, subject: `🎈 Katılım: ${fullName}`, html })
    if (error) {
      console.error("RSVP resend error:", error)
      // Kalıcı kayıt yapıldıysa yine de başarı dön.
      if (process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ ok: true })
      return NextResponse.json({ error: "E-posta gönderilemedi" }, { status: 502 })
    }
  } catch (err) {
    console.error("RSVP send failed:", err)
    if (process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: "E-posta gönderilemedi" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
