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
