import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  const { to, name, amount } = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const from = process.env.MAIL_FROM || "noreply@example.com"
  
  await resend.emails.send({
    from, 
    to,
    subject: `Teşekkürler 💛`,
    html: `<p>Merhaba ${name || ""},</p><p>Umay için ${amount || ""}₺ desteğiniz ulaştı. Çok teşekkür ederiz!</p>`
  })
  
  return NextResponse.json({ ok: true })
}