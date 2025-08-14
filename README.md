Totally—I checked the docs and updated everything for **Next.js 15** and **Tailwind CSS v4** (config-less). Below is a clean, step-by-step guide you can follow from zero to production, including **TR/EN toggle (next-intl v4)**, **IBAN copy**, **PayTR (token + iframe + webhook)**, **Resend mail**, **Vercel Analytics + Speed Insights**, and a **dynamic OG image**.

(References: Next.js 15, Tailwind v4 + PostCSS plugin, next-intl v4, Vercel Analytics docs, PayTR iFrame API.) ([Next.js][1], [Tailwind CSS][2], [Next Intl][3], [Vercel][4], [dev.paytr.com][5])

---

# 0) Prereqs

* Node 18+ (LTS), pnpm (or npm/yarn)
* GitHub + Vercel accounts
* PayTR creds: `PAYTR_MERCHANT_ID`, `PAYTR_MERCHANT_KEY`, `PAYTR_MERCHANT_SALT`
* Resend `RESEND_API_KEY` (for email)

---

# 1) Create the project (Next.js 15 + App Router)

```bash
pnpm create next-app@latest umayciftci --ts --eslint --app --src-dir false --tailwind --use-pnpm
cd umayciftci
```

> Next.js 15 is current; we’ll stick to the App Router. ([Next.js][1])

---

# 2) Tailwind CSS v4 (config-less) setup

Tailwind v4 uses a **PostCSS plugin** and **CSS-first** customization (no `tailwind.config.*`). ([Tailwind CSS][6], [GitHub][7])

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

Create/update **`postcss.config.mjs`**:

```js
// postcss.config.mjs
export default {
  plugins: { '@tailwindcss/postcss': {} },
}
```

Import Tailwind and (optionally) your theme tokens in **`app/globals.css`**:

```css
@import "tailwindcss";

/* Optional tokens via CSS-first theming */
@theme {
  --radius: 12px;
  --color-brand-600: #f59e0b;
  --color-brand-700: #d97706;
}
```

That’s it—no `tailwind.config.js/ts` needed in v4. ([Tailwind CSS][6])

---

# 3) UI & helpers

```bash
# shadcn/ui (scaffolds components into /components/ui)
pnpm dlx shadcn@latest init -d components
pnpm dlx shadcn@latest add button card badge input label textarea tooltip separator alert sheet

# helpers
pnpm add class-variance-authority clsx tailwind-merge lucide-react sonner zod
```

**`lib/utils.ts`**

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

---

# 4) Internationalization (TR/EN) with **next-intl v4**

`next-intl@4` supports the App Router cleanly. ([Next Intl][3])

```bash
pnpm add next-intl
```

**`messages/tr.json`**

```json
{
  "tagline": "ben daha doğmadım ama doğacağım ✨",
  "hero_title": "Merhaba, ben {name}! {date}’te dünyaya geleceğim 🍼",
  "hero_body": "Bana minik bir hediye almak ister misin? Pati kardeşlerimi de unutmayalım, HAYTAP'a destek olalım 💛",
  "btn_gift": "Bana hediye al",
  "btn_haytap": "HAYTAP’a bağış",
  "iban_title": "Banka transferi (havale/EFT)",
  "iban_holder": "Hesap sahibi",
  "copy": "Kopyala",
  "copied": "IBAN kopyalandı",
  "amount_label": "Tutar (₺)",
  "pay_with_card": "Kartla Öde",
  "legal": "Yasal Not",
  "lang_tr": "Türkçe",
  "lang_en": "English"
}
```

**`messages/en.json`**

```json
{
  "tagline": "I’m not born yet, but I’m on the way ✨",
  "hero_title": "Hi, I’m {name}! I’ll arrive on {date} 🍼",
  "hero_body": "Would you like to get me a tiny gift? Let’s also support HAYTAP for my paw friends 💛",
  "btn_gift": "Get me a gift",
  "btn_haytap": "Donate to HAYTAP",
  "iban_title": "Bank transfer (wire)",
  "iban_holder": "Account holder",
  "copy": "Copy",
  "copied": "IBAN copied",
  "amount_label": "Amount (₺)",
  "pay_with_card": "Pay by Card",
  "legal": "Legal",
  "lang_tr": "Turkish",
  "lang_en": "English"
}
```

**`middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['tr','en'],
  defaultLocale: 'tr',
})

export const config = { matcher: ['/', '/(tr|en)/:path*'] }
```

**`app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils"
import LangSwitcher from "@/components/LangSwitcher"

export const metadata: Metadata = {
  title: { default: "Umay Geliyor! 👶", template: "%s | Umay Geliyor!" },
  description: "Ben daha doğmadım ama doğacağım! 5 Eylül 2025’te dünyaya geliyorum."
}

export default async function LocaleLayout({
  children, params: { locale }
}: { children: React.ReactNode, params: { locale: string } }) {
  let messages
  try { messages = (await import(`../../messages/${locale}.json`)).default } catch { notFound() }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-gradient-to-b from-white to-amber-50 text-zinc-900")}>
        <SiteHeader />
        <main className="container py-10">{children}</main>
        <SiteFooter />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

function SiteHeader() {
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between">
        <a href="/" className="font-bold text-xl">👶 Umay Geliyor</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a className="hover:underline" href="/donate/umay">🎁</a>
          <a className="hover:underline" href="/donate/haytap">🐾</a>
          <LangSwitcher />
        </nav>
        <LangSwitcher className="md:hidden" />
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t py-10 text-sm text-zinc-600">
      <div className="container flex items-center justify-between">
        <p>© {new Date().getFullYear()} Umay</p>
        <a className="hover:underline" href="/legal">Yasal Not / Legal</a>
      </div>
    </footer>
  )
}
```

**`components/LangSwitcher.tsx`**

```tsx
"use client"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"

export default function LangSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()

  const toggle = () => {
    const next = locale === "tr" ? "en" : "tr"
    const parts = pathname.split("/")
    if (parts[1] === "tr" || parts[1] === "en") parts[1] = next
    else parts.splice(1, 0, next)
    window.location.pathname = parts.join("/")
  }

  return <button onClick={toggle} className={cn("text-sm underline", className)}>{locale === "tr" ? "EN" : "TR"}</button>
}
```

---

# 5) Countdown + baby-voice home

**`components/countdown.tsx`**

```tsx
"use client"
import { useEffect, useMemo, useState } from "react"

type Parts = { days: number; hours: number; minutes: number; seconds: number }
function diff(target: Date): Parts {
  const ms = Math.max(target.getTime() - Date.now(), 0)
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  }
}
export default function Countdown({ iso }: { iso: string }) {
  const target = useMemo(() => new Date(iso), [iso])
  const [p, setP] = useState<Parts>(() => diff(target))
  useEffect(() => { const id = setInterval(() => setP(diff(target)), 1000); return () => clearInterval(id) }, [target])
  const Cell = (n: number, label: string) => (
    <div className="rounded-xl border bg-white/70 px-4 py-3 min-w-[88px]">
      <div className="text-3xl md:text-4xl font-bold tabular-nums">{n.toString().padStart(2,"0")}</div>
      <div className="text-xs uppercase tracking-wider text-zinc-600">{label}</div>
    </div>
  )
  return <div className="flex justify-center gap-3 md:gap-5">{Cell(p.days,"gün")}{Cell(p.hours,"saat")}{Cell(p.minutes,"dk")}{Cell(p.seconds,"sn")}</div>
}
```

**`app/[locale]/page.tsx`**

```tsx
import Countdown from "@/components/countdown"
import { useTranslations } from "next-intl"
import { Gift, PawPrint, Baby } from "lucide-react"

export default function Home() {
  const t = useTranslations()
  const iso = process.env.NEXT_PUBLIC_UMAY_TARGET_ISO || "2025-09-05T00:00:00+03:00"

  return (
    <section className="space-y-10 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm">
        <Baby className="h-4 w-4" /> {t("tagline")}
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
        {t("hero_title", { name: "Umay", date: "5 Eylül 2025" })}
      </h1>

      <p className="text-lg text-zinc-700">{t("hero_body")}</p>

      <div className="flex justify-center">
        <Countdown iso={iso} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <a href="/donate/umay" className="inline-flex items-center gap-2 rounded-lg bg-[--color-brand-600] text-white px-5 py-3 font-medium hover:bg-[--color-brand-700] transition">
          <Gift className="h-5 w-5" /> {t("btn_gift")}
        </a>
        <a href="/donate/haytap" className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium hover:bg-white transition">
          <PawPrint className="h-5 w-5" /> {t("btn_haytap")}
        </a>
      </div>
    </section>
  )
}
```

---

# 6) IBAN copy box

**`.env.example`**

```
NEXT_PUBLIC_SITE_URL=https://umayciftci.com
NEXT_PUBLIC_UMAY_TARGET_ISO=2025-09-05T00:00:00+03:00
NEXT_PUBLIC_DONATION_IBAN=TR00 0000 0000 0000 0000 0000 00
NEXT_PUBLIC_DONATION_HOLDER=Muhammed Ciftci
```

**`components/IbanBox.tsx`**

```tsx
"use client"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { Copy, Check } from "lucide-react"

const IBAN = process.env.NEXT_PUBLIC_DONATION_IBAN || "TR.."
const HOLDER = process.env.NEXT_PUBLIC_DONATION_HOLDER || "Muhammed Ciftci"

export default function IbanBox() {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)
  const copyIban = async () => {
    await navigator.clipboard.writeText(IBAN)
    setCopied(true); toast.success(t("copied")); setTimeout(()=>setCopied(false),1500)
  }
  return (
    <div className="rounded-xl border bg-white/70 p-4 space-y-3">
      <div className="text-sm text-zinc-600">{t("iban_title")}</div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="font-mono text-base">{IBAN}</div>
          <div className="text-xs text-zinc-600">{t("iban_holder")}: {HOLDER}</div>
        </div>
        <button onClick={copyIban} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-white transition">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {t("copy")}
        </button>
      </div>
    </div>
  )
}
```

Use it on **`app/[locale]/donate/umay/page.tsx`**:

```tsx
import IbanBox from "@/components/IbanBox"
// ...
<IbanBox />
```

---

# 7) PayTR (token + iframe)

Official flow: **server** POST to `/odeme/api/get-token` → **client** renders `https://www.paytr.com/odeme/guvenli/<TOKEN>` in an iframe → **server webhook** handles result. ([dev.paytr.com][5])

**Env**

```
PAYTR_MERCHANT_ID=xxxx
PAYTR_MERCHANT_KEY=xxxx
PAYTR_MERCHANT_SALT=xxxx
PAYTR_SANDBOX=true
```

**`app/api/paytr/token/route.ts`**

```ts
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
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Sunucu hatası" }, { status: 500 })
  }
}
```

**`components/PaytrButton.tsx`**

```tsx
"use client"
import { useState } from "react"
import { toast } from "sonner"

export default function PaytrButton() {
  const [amount, setAmount] = useState<number | "">("")
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)

  async function start() {
    try {
      if (!amount || Number(amount) <= 0) return toast.error("Lütfen tutar giriniz")
      const res = await fetch("/api/paytr/token", {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ price: Number(amount) })
      })
      const json = await res.json()
      if (json?.iframeUrl) setIframeUrl(json.iframeUrl)
      else throw new Error(json?.error || "Ödeme başlatılamadı")
    } catch (e: any) {
      toast.error(e?.message || "Bir hata oluştu")
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="number" min="1" placeholder="Tutar (₺)" value={amount}
          onChange={(e)=>setAmount(e.target.value===""?"":Number(e.target.value))}
          className="w-40 rounded-lg border px-3 py-2" />
        <button onClick={start} className="inline-flex items-center gap-2 rounded-lg bg-[--color-brand-600] text-white px-4 py-2 hover:bg-[--color-brand-700] transition">
          Kartla Öde
        </button>
      </div>
      {iframeUrl && <iframe src={iframeUrl} title="PayTR" frameBorder="0" scrolling="no" style={{width:"100%", height:"700px"}} />}
    </div>
  )
}
```

**Webhook (server)** — **`app/api/paytr/webhook/route.ts`**

```ts
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
```

Configure in PayTR panel:

* **Bildirim URL** → `https://umayciftci.com/api/paytr/webhook`
* **OK/Fail URL** → `https://umayciftci.com/donate/umay`
  (Flow per PayTR docs.) ([dev.paytr.com][5])

---

# 8) Thank-you email (Resend)

```bash
pnpm add resend
```

**Env**

```
RESEND_API_KEY=re_xxx
MAIL_FROM=hello@umayciftci.com
```

**`app/api/mail/thank-you/route.ts`**

```ts
import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  const { to, name, amount } = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const from = process.env.MAIL_FROM || "noreply@example.com"
  await resend.emails.send({
    from, to,
    subject: `Teşekkürler 💛`,
    html: `<p>Merhaba ${name || ""},</p><p>Umay için ${amount || ""}₺ desteğiniz ulaştı. Çok teşekkür ederiz!</p>`
  })
  return NextResponse.json({ ok: true })
}
```

(Trigger this from the webhook on `status === "success"`.)

---

# 9) Vercel Analytics + Speed Insights

Add the components (already imported in layout above) and **enable in Vercel project**. Docs here. ([Vercel][4])

---

# 10) Dynamic OG image (@vercel/og, Edge)

```bash
pnpm add @vercel/og
```

**`app/og/route.tsx`**

```tsx
import { ImageResponse } from "@vercel/og"
export const runtime = "edge"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") || "Umay Geliyor! 05.09.2025"
  return new ImageResponse(
    <div style={{
      height:"100%", width:"100%", display:"flex",
      background:"linear-gradient(to bottom right, #fff7ed, #fde68a)",
      alignItems:"center", justifyContent:"center",
      fontSize:72, fontWeight:800
    }}>
      <div style={{ textAlign:"center", padding:"40px" }}>
        <div>👶</div>
        <div>{title}</div>
      </div>
    </div>,
    { width:1200, height:630 }
  )
}
```

---

# 11) SEO basics

**`app/robots.ts`**

```ts
export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${base}/sitemap.xml` }
}
```

**`app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next"
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/tr`, priority: 1 },
    { url: `${base}/en`, priority: 0.9 },
    { url: `${base}/donate/umay` },
    { url: `${base}/donate/haytap` },
    { url: `${base}/legal` }
  ]
}
```

---

# 12) Deploy on Vercel + domain

1. **Push** to GitHub → Import on **Vercel**.
2. **Environment Variables** (Project → Settings):

   * `NEXT_PUBLIC_SITE_URL=https://umayciftci.com`
   * `NEXT_PUBLIC_UMAY_TARGET_ISO=2025-09-05T00:00:00+03:00`
   * `NEXT_PUBLIC_DONATION_IBAN=TR...`
   * `NEXT_PUBLIC_DONATION_HOLDER=...`
   * `PAYTR_MERCHANT_ID`, `PAYTR_MERCHANT_KEY`, `PAYTR_MERCHANT_SALT`, `PAYTR_SANDBOX=true`
   * `RESEND_API_KEY`, `MAIL_FROM=hello@umayciftci.com`
3. **Domains** → add `umayciftci.com`, follow DNS steps. (Next.js + Vercel docs.) ([Vercel][8])

---

# 13) Test checklist

* `/tr` loads, toggle to `/en`
* Countdown ticks correctly (Istanbul offset embedded in ISO)
* `/donate/umay`: IBAN **Copy** works
* PayTR: token returns, **iframe** renders, **webhook** returns **OK**
* Resend: thank-you email endpoint works with a manual POST
* `/og?title=...` returns an image (1200×630)
* Analytics + Speed Insights show up in Vercel

---

## Notes & gotchas

* Tailwind v4 **requires** using `@tailwindcss/postcss` in PostCSS config; using `tailwindcss` plugin directly throws an error. ([GitHub][7])
* `next-intl` middleware matcher must include both root and locale prefixes (as shown). ([Next Intl][3])
* PayTR token and webhook parameter hashing must match the docs exactly. ([dev.paytr.com][5])

If you want, I can pack these into a ready repo tree (files + folders laid out) so you can paste-and-deploy in one shot.

[1]: https://nextjs.org/?utm_source=chatgpt.com "Next.js by Vercel - The React Framework"
[2]: https://tailwindcss.com/docs/installation/using-postcss?utm_source=chatgpt.com "Installing Tailwind CSS with PostCSS"
[3]: https://next-intl.dev/docs/getting-started/app-router?utm_source=chatgpt.com "Next.js App Router Internationalization (i18n)"
[4]: https://vercel.com/docs/analytics/quickstart?utm_source=chatgpt.com "Getting started with Vercel Web Analytics"
[5]: https://dev.paytr.com/iframe-api/iframe-api-1-adim?utm_source=chatgpt.com "iFrame API 1. Adım"
[6]: https://tailwindcss.com/blog/tailwindcss-v4?utm_source=chatgpt.com "Tailwind CSS v4.0"
[7]: https://github.com/tailwindlabs/tailwindcss/issues/15735?utm_source=chatgpt.com "[v4] It looks like you're trying to use tailwindcss directly as a ..."
[8]: https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com "Next.js on Vercel"
