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
