import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { PARTY } from "@/lib/party"

// Katılım (RSVP) — ad & soyad alır, ev sahibine e-posta gönderir.
const schema = z.object({
  firstName: z.string().trim().min(1, "Ad gerekli").max(80),
  lastName: z.string().trim().min(1, "Soyad gerekli").max(80),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Lütfen ad ve soyad giriniz." }, { status: 400 })
  }
  const { firstName, lastName } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.RSVP_TO
  if (!apiKey || !to) {
    console.error("RSVP: RESEND_API_KEY veya RSVP_TO tanımlı değil")
    return NextResponse.json({ error: "Sunucu yapılandırması eksik" }, { status: 500 })
  }

  const from = process.env.MAIL_FROM || "Umay Davetiye <onboarding@resend.dev>"
  const resend = new Resend(apiKey)

  const fullName = `${firstName} ${lastName}`
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#a855f7">🎉 Yeni katılım!</h2>
      <p style="font-size:18px"><strong>${fullName}</strong> partiye katılıyor.</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <p style="color:#666;font-size:14px">
        📅 ${PARTY.date_tr}<br/>
        🕐 Saat ${PARTY.time_tr}<br/>
        📍 ${PARTY.venue}
      </p>
    </div>`

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `🎈 Katılım: ${fullName}`,
      html,
    })
    if (error) {
      console.error("RSVP resend error:", error)
      return NextResponse.json({ error: "E-posta gönderilemedi" }, { status: 502 })
    }
  } catch (err) {
    console.error("RSVP send failed:", err)
    return NextResponse.json({ error: "E-posta gönderilemedi" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
