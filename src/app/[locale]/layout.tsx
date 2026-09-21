import type { Metadata } from "next"
import Link from "next/link"
import "../globals.css"

export const metadata: Metadata = {
    title: { default: "Umay'ın Yeri 👶🎉", template: "%s | Umay'ın Yeri" },
    description: "Merhaba dünya! Ben Umay, 2 Eylül 2025'te 02:00'da 3 gün erken deploy edildim 🚀 Artık 1 yaşındayım, yürüyorum ve 4 dişim var!"
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
                <Link href={`/${locale}`} className="font-bold text-sm sm:text-base md:text-xl hover:scale-110 transition-transform flex items-center gap-1 sm:gap-2 group">
                    <span className="text-2xl sm:text-3xl group-hover:animate-bounce">👶</span>
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Umay.exe</span>
                    <span className="text-[10px] sm:text-xs bg-green-300 text-black px-1 sm:px-2 py-0.5 rounded-full animate-pulse">v1.1 LIVE</span>
                </Link>
                <nav className="hidden md:flex gap-6 text-sm items-center">
                    <Link className="hover:text-purple-500 hover:scale-110 transition-all flex items-center gap-1" href={`/${locale}/games`}>
                        <span className="text-xl">🎮</span>
                        <span className="font-medium">{locale === 'tr' ? 'Oyunlar' : 'Games'}</span>
                    </Link>
                    <Link className="hover:text-blue-500 hover:scale-110 transition-all flex items-center gap-1" href={`/${locale}/donate/umay`}>
                        <span className="text-xl">🎁</span>
                        <span className="font-medium">{locale === 'tr' ? 'Sponsor Ol' : 'Become Sponsor'}</span>
                    </Link>
                    <Link className="hover:text-green-500 hover:scale-110 transition-all flex items-center gap-1" href={`/${locale}/donate/haytap`}>
                        <span className="text-xl">🐾</span>
                        <span className="font-medium">{locale === 'tr' ? 'Pati Dostlar' : 'Paw Friends'}</span>
                    </Link>
                    <div className="flex gap-2 items-center border-l-2 border-gray-300 pl-4">
                        <Link href="/tr" className={`px-3 py-1.5 rounded-lg transition-all ${locale === 'tr' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'hover:bg-gray-100'}`}>
                            <span className="font-bold">TR</span> 🇹🇷
                        </Link>
                        <Link href="/en" className={`px-3 py-1.5 rounded-lg transition-all ${locale === 'en' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'hover:bg-gray-100'}`}>
                            <span className="font-bold">EN</span> 🇺🇸
                        </Link>
                    </div>
                </nav>
                {/* Mobile menu */}
                <div className="md:hidden flex gap-2 sm:gap-3 items-center">
                    <Link href={`/${locale}/games`} className="text-xl sm:text-2xl hover:scale-110 transition-transform">🎮</Link>
                    <Link href={`/${locale}/donate/umay`} className="text-xl sm:text-2xl hover:scale-110 transition-transform">🎁</Link>
                    <Link href={`/${locale}/donate/haytap`} className="text-xl sm:text-2xl hover:scale-110 transition-transform">🐾</Link>
                    <Link href={locale === 'tr' ? '/en' : '/tr'} className="text-lg sm:text-xl hover:scale-110 transition-transform">
                        {locale === 'tr' ? '🇺🇸' : '🇹🇷'}
                    </Link>
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
                            ? "© 2026 Umay Çiftçi - 1 yaşındayım, yürüyorum ve haklarım tam geçerli! 🎉"
                            : "© 2026 Umay Çiftçi - I'm 1, I walk now, and my rights are fully valid! 🎉"}
                    </p>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500">
                    {locale === 'tr'
                        ? "Bu site karın içinden kodlandı, 2 Eylül 2025'te hastanede deploy edildi. 1 yıl kesintisiz uptime, 1. yıl güncellemesi yayında: yürüme modülü aktif! 🚀"
                        : "This site was coded from the womb, deployed at the hospital on Sep 2, 2025. One full year of uptime, year-one update is live: walking module enabled! 🚀"}
                </div>
                <div className="flex justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {locale === 'tr' ? "• Organik" : "• Organic"}
              </span>
                    <span className="bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {locale === 'tr' ? "• GDO'suz" : "• GMO-Free"}
              </span>
                    <span className="bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {locale === 'tr' ? "• Yürüyor" : "• Now Walking"}
              </span>
                </div>
            </div>
        </footer>
        </body>
        </html>
    )
}