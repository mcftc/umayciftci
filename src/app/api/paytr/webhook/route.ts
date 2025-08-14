import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  const merchant_key = process.env.PAYTR_MERCHANT_KEY!
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT!

  const bodyText = await req.text()
  const params = Object.fromEntries(new URLSearchParams(bodyText))

  const hash = params.hash
  const hashStr = params.merchant_oid + merchant_salt + params.status + params.total_amount
  const myHash = crypto.createHmac("sha256", merchant_key).update(hashStr).digest("base64")

  if (myHash !== hash) return new NextResponse("PAYTR notification failed: bad hash", { status: 400 })

  if (params.status === "success") {
    // TODO: mark donation as paid, send thank-you email, persist to DB
  }
  return new NextResponse("OK") // PayTR expects literal "OK"
}