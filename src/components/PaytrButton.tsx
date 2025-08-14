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
    } catch (e) {
      toast.error((e as Error)?.message || "Bir hata oluştu")
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