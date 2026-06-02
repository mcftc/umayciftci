import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { listEntries, saveEntry } from "@/lib/store"
import { checkRate, getIp, isBot, isProfane } from "@/lib/spam"

// Hatıra defteri — doğum günü kutlama notları.
// Her not ayrı bir blob (yarış/çakışma yok). Spam koruması: honeypot + IP limiti + küfür filtresi.
export const dynamic = "force-dynamic"

const PREFIX = "guestbook/"

const schema = z.object({
  name: z.string().trim().min(1, "İsim gerekli").max(60),
  message: z.string().trim().min(1, "Mesaj gerekli").max(600),
  website: z.string().optional(), // honeypot
})

export type GuestEntry = { id: string; name: string; message: string; at: number }

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

// --- Notları getir (en yeni en üstte, _url gizlenir) ---
export async function GET() {
  try {
    const raw = await listEntries<GuestEntry>(PREFIX)
    const entries = raw
      .filter((e) => typeof e.at === "number")
      .sort((a, b) => b.at - a.at)
      .map(({ id, name, message, at }) => ({ id, name, message, at }))
    return NextResponse.json({ entries })
  } catch (err) {
    console.error("Guestbook GET error:", err)
    return NextResponse.json({ entries: [] })
  }
}

// --- Yeni not bırak ---
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 })
  }

  // Honeypot — bota başarılı gibi davran ama kaydetme.
  if (isBot(body)) return NextResponse.json({ ok: true, entry: null })

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Lütfen isim ve mesaj giriniz." }, { status: 400 })
  }
  const { name, message } = parsed.data

  if (isProfane(`${name} ${message}`)) {
    return NextResponse.json({ error: "Lütfen daha kibar bir mesaj yazalım 🙂" }, { status: 422 })
  }

  if (!checkRate(`gb:${getIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Çok hızlı gönderiyorsun, biraz bekle 🙏" }, { status: 429 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Guestbook: BLOB_READ_WRITE_TOKEN tanımlı değil")
    return NextResponse.json({ error: "Sunucu yapılandırması eksik" }, { status: 500 })
  }

  const at = Date.now()
  const id = `${at}-${Math.random().toString(36).slice(2, 10)}`
  const entry: GuestEntry = { id, name, message, at }

  try {
    await saveEntry(PREFIX, id, entry)
  } catch (err) {
    console.error("Guestbook put error:", err)
    return NextResponse.json({ error: "Not kaydedilemedi" }, { status: 502 })
  }

  // Ev sahibine bildir (en iyi çaba).
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.RSVP_TO
  if (apiKey && to) {
    try {
      const resend = new Resend(apiKey)
      const from = process.env.MAIL_FROM || "Umay Davetiye <onboarding@resend.dev>"
      await resend.emails.send({
        from,
        to,
        subject: `📖 Hatıra defteri: ${name}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto">
            <h2 style="color:#a855f7">📖 Umay'ın hatıra defterine yeni not!</h2>
            <p style="font-size:16px"><strong>${escapeHtml(name)}</strong> yazdı:</p>
            <blockquote style="border-left:4px solid #f9a8d4;margin:0;padding:8px 16px;color:#444;font-size:16px">
              ${escapeHtml(message).replace(/\n/g, "<br/>")}
            </blockquote>
          </div>`,
      })
    } catch (err) {
      console.error("Guestbook mail error (note still saved):", err)
    }
  }

  return NextResponse.json({ ok: true, entry })
}
