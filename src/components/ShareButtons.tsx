"use client"
import { useState } from "react"

// Davetiyeyi paylaş — WhatsApp, cihazın yerel paylaşımı (Web Share API) ve bağlantı kopyalama.
export default function ShareButtons({ shareText }: { shareText: string }) {
  const [copied, setCopied] = useState(false)

  function shareUrl() {
    if (typeof window !== "undefined") return window.location.href
    return "https://umayciftci.com/tr/davetiye"
  }

  const whatsappHref = () =>
    `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl()}`)}`

  async function nativeShare() {
    const url = shareUrl()
    if (navigator.share) {
      try {
        await navigator.share({ title: "Umay'ın Doğum Günü 🎉", text: shareText, url })
      } catch {
        /* kullanıcı vazgeçti */
      }
    } else {
      await copyLink()
    }
  }

  async function copyLink() {
    const url = shareUrl()
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand("copy") } catch {}
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
      >
        <span className="text-lg">💬</span> WhatsApp’tan paylaş
      </a>
      <button
        onClick={nativeShare}
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-purple-600 shadow-md ring-1 ring-purple-200 transition-transform hover:scale-105"
      >
        <span className="text-lg">📤</span> Paylaş
      </button>
      <button
        onClick={copyLink}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition-all ${
          copied ? "bg-green-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"
        }`}
      >
        <span className="text-lg">{copied ? "✓" : "🔗"}</span>
        {copied ? "Bağlantı kopyalandı" : "Bağlantıyı kopyala"}
      </button>
    </div>
  )
}
