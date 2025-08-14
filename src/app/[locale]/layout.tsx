import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from 'next-intl/server'
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils"
import LangSwitcher from "@/components/LangSwitcher"
import Link from "next/link"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Umay Geliyor! 👶", template: "%s | Umay Geliyor!" },
  description: "Ben daha doğmadım ama doğacağım! 5 Eylül 2025’te dünyaya geliyorum."
}

export default async function LocaleLayout({
  children, params
}: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-white via-pink-50/20 to-purple-50/30 text-zinc-900">
        <header className="border-b-2 border-pink-200 bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
            <a href={`/${locale}`} className="font-bold text-sm sm:text-base md:text-xl hover:scale-110 transition-transform flex items-center gap-1 sm:gap-2 group">
              <span className="text-2xl sm:text-3xl group-hover:animate-bounce">👶</span>
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Umay.exe</span>
              <span className="text-[10px] sm:text-xs bg-yellow-300 text-black px-1 sm:px-2 py-0.5 rounded-full">v0.9</span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm items-center">
              <a className="hover:text-blue-500 hover:scale-110 transition-all flex items-center gap-1" href={`/${locale}/donate/umay`}>
                <span className="text-xl">🎁</span> 
                <span className="font-medium">{locale === 'tr' ? 'Sponsor Ol' : 'Become Sponsor'}</span>
              </a>
              <a className="hover:text-green-500 hover:scale-110 transition-all flex items-center gap-1" href={`/${locale}/donate/haytap`}>
                <span className="text-xl">🐾</span>
                <span className="font-medium">{locale === 'tr' ? 'Pati Dostlar' : 'Paw Friends'}</span>
              </a>
              <div className="flex gap-2 items-center border-l-2 border-gray-300 pl-4">
                <a href="/tr" className={`px-3 py-1.5 rounded-lg transition-all ${locale === 'tr' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'hover:bg-gray-100'}`}>
                  <span className="font-bold">TR</span> 🇹🇷
                </a>
                <a href="/en" className={`px-3 py-1.5 rounded-lg transition-all ${locale === 'en' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'hover:bg-gray-100'}`}>
                  <span className="font-bold">EN</span> 🇺🇸
                </a>
              </div>
            </nav>
            {/* Mobile menu - simplified for now */}
            <div className="md:hidden flex gap-2 sm:gap-3 items-center">
              <a href={`/${locale}/donate/umay`} className="text-xl sm:text-2xl">🎁</a>
              <a href={`/${locale}/donate/haytap`} className="text-xl sm:text-2xl">🐾</a>
              <a href={locale === 'tr' ? '/en' : '/tr'} className="text-lg sm:text-xl">
                {locale === 'tr' ? '🇺🇸' : '🇹🇷'}
              </a>
            </div>
          </div>
        </header>
        <main className="py-6 sm:py-8 md:py-10">{children}</main>
        <footer className="border-t-2 border-pink-200 py-6 sm:py-8 md:py-10 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-xl sm:text-2xl animate-pulse">👶</span>
              <p className="text-xs sm:text-sm font-medium">
                {locale === 'tr' 
                  ? "© 2025 Umay Çiftçi - Henüz doğmadım ama haklarım saklı!" 
                  : "© 2025 Umay Çiftçi - Not born yet but rights reserved!"}
              </p>
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500">
              {locale === 'tr'
                ? "Bu site %100 karın içinden kodlandı. Bazı buglar olabilir, kusura bakmayın."
                : "This site was 100% coded from the womb. Some bugs may occur, sorry."}
            </div>
            <div className="flex justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {locale === 'tr' ? "• Organik" : "• Organic"}
              </span>
              <span className="bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {locale === 'tr' ? "• GDO'suz" : "• GMO-Free"}
              </span>
              <span className="bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {locale === 'tr' ? "• El Yapımı" : "• Handmade"}
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

function SiteHeader() {
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">👶 Umay Geliyor</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link className="hover:underline" href="/donate/umay">🎁</Link>
          <Link className="hover:underline" href="/donate/haytap">🐾</Link>
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
        <Link className="hover:underline" href="/legal">Yasal Not / Legal</Link>
      </div>
    </footer>
  )
}
