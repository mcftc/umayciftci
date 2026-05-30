"use client"
import { useState } from "react"

// Bağımsız kopyala butonu — sonner/Toaster gerektirmez, kendi durumunu tutar.
export default function CopyButton({
  text,
  locale = "tr",
  className = "",
}: {
  text: string
  locale?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const tr = locale === "tr"

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand("copy") } catch {}
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      onClick={copy}
      className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
        copied ? "bg-green-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"
      } ${className}`}
      aria-label={tr ? "Kopyala" : "Copy"}
    >
      {copied ? (tr ? "✓ Kopyalandı" : "✓ Copied") : (tr ? "Kopyala" : "Copy")}
    </button>
  )
}
