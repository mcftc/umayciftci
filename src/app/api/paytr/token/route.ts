import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const { price, email = "guest@example.com", user_ip } = await req.json()
    if (!price || Number(price) <= 0) return NextResponse.json({ error: "Invalid price" }, { status: 400 })

    const merchant_id = process.env.PAYTR_MERCHANT_ID!
    const merchant_key = process.env.PAYTR_MERCHANT_KEY!
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!
    const sandbox = process.env.PAYTR_SANDBOX === "true"

    const user_ip_clean = user_ip || "85.34.78.112"
    const merchant_oid = `umay_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const basket = Buffer.from(JSON.stringify([["Umay'a Hediye", Number(price).toFixed(2), 1]])).toString("base64")

    const params = {
      merchant_id,
      user_ip: user_ip_clean,
      merchant_oid,
      email,
      payment_amount: Math.round(Number(price) * 100),
      currency: "TL",
      test_mode: sandbox ? 1 : 0,
      no_installment: 0,
      max_installment: 0,
      user_name: "Umay",
      user_address: "Istanbul",
      user_phone: "05555555555",
      merchant_ok_url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/donate/umay?status=ok",
      merchant_fail_url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/donate/umay?status=fail",
      timeout_limit: "30",
      debug_on: 1,
      payment_type: "card",
      lang: "tr",
      card_type: "all",
      merchant_logo_url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/og-image.png",
      user_basket: basket
    }

    const hash_str = merchant_id + params.user_ip + merchant_oid + email + params.payment_amount + params.user_basket + params.no_installment + params.max_installment + params.currency + params.test_mode
    const paytr_token = crypto.createHmac("sha256", merchant_key).update(hash_str).digest("base64") + merchant_salt

    const body = new URLSearchParams({ ...Object.fromEntries(Object.entries(params).map(([k,v])=>[k,String(v)])), paytr_token })

    const resp = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    })
    const data = await resp.json()

    if (data?.status === "success") {
      return NextResponse.json({ token: data.token, iframeUrl: `https://www.paytr.com/odeme/guvenli/${data.token}` })
    }
    return NextResponse.json({ error: data?.reason || "PAYTR Token alınamadı", raw: data }, { status: 400 })
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message || "Sunucu hatası" }, { status: 500 })
  }
}