import { NextResponse } from "next/server"
import { deleteByUrl } from "@/lib/store"

// Not silme — sadece doğru anahtarla. Body: { key, url }
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  let body: { key?: string; url?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 })
  }

  if (!process.env.ADMIN_KEY || body.key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }
  if (!body.url || typeof body.url !== "string") {
    return NextResponse.json({ error: "url gerekli" }, { status: 400 })
  }
  // Sadece kendi blob deposundaki guestbook kayıtlarını silmeye izin ver.
  if (!body.url.includes("/guestbook/")) {
    return NextResponse.json({ error: "Geçersiz hedef" }, { status: 400 })
  }

  try {
    await deleteByUrl(body.url)
  } catch (err) {
    console.error("Delete note error:", err)
    return NextResponse.json({ error: "Silinemedi" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
