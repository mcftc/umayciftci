import Image from "next/image"
import Link from "next/link"
import BabyGames from "@/components/BabyGames"
import AgeCounter from "@/components/AgeCounter"
import LiveStatus from "@/components/LiveStatus"
import PhotoGallery from "@/components/PhotoGallery"
import FloatingThings from "@/components/FloatingThings"
import Confetti from "@/components/Confetti"
import { HERO_PHOTO } from "@/lib/photos"
import { ageLabel, daysOld, DAYS_EARLY } from "@/lib/umay"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const tr = locale === "tr"
  const age = ageLabel(locale)
  const days = daysOld()

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <FloatingThings />
      <Confetti />

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">

        {/* ───────────────── HERO ───────────────── */}
        <section className="grid items-center gap-6 md:grid-cols-2 md:gap-10 pt-4">
          {/* Foto */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative animate-bob">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 blur-xl opacity-60" />
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
                <Image
                  src={HERO_PHOTO.src}
                  width={HERO_PHOTO.w}
                  height={HERO_PHOTO.h}
                  alt={tr ? HERO_PHOTO.alt.tr : HERO_PHOTO.alt.en}
                  priority
                  className="h-auto w-[260px] sm:w-[320px] md:w-full max-w-[380px] object-cover"
                  sizes="(max-width: 768px) 320px, 380px"
                />
              </div>
              <div className="absolute -top-3 -right-3 rotate-12 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-wiggle-soft">
                {age} 🎂
              </div>
              <div className="absolute -bottom-3 -left-3 -rotate-6 rounded-full bg-white px-3 py-1 text-xs font-bold text-purple-600 shadow-lg">
                {tr ? "merhaba dünya 👋" : "hello world 👋"}
              </div>
            </div>
          </div>

          {/* Metin */}
          <div className="order-2 md:order-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-pink-600 shadow-sm border border-pink-100">
              <span className="animate-heartbeat">💖</span>
              {tr ? "Çiftçi ailesinin minik mucizesi" : "The Çiftçi family's little miracle"}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                {tr ? "Ben Umay! 🍼" : "I'm Umay! 🍼"}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-md mx-auto md:mx-0">
              {tr
                ? `Dünyaya geldim ve her şey çok eğlenceli! ${DAYS_EARLY} gün erken geldim çünkü merakımı yenemedim 🚀`
                : `I'm here and everything is so much fun! I came ${DAYS_EARLY} days early because I couldn't wait 🚀`}
            </p>

            <p className="text-sm text-zinc-500 max-w-md mx-auto md:mx-0">
              {tr
                ? "Babam yüzbaşı, amcam ise yazılımcı — bu minik siteyi bana amcam hazırladı 💻 Ben de büyüyünce ne olurum bakalım, ama şimdilik işim gülmek, mama yemek ve uyumak 😴"
                : "My dad's an army captain and my uncle's a developer — he built this little site for me 💻 No idea what I'll be when I grow up, but for now my job is giggling, milk and naps 😴"}
            </p>

            <div className="pt-2">
              <AgeCounter locale={locale} />
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <Link
                href={`/${locale}/donate/umay`}
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                {tr ? "Bana hediye al 🎁" : "Get me a gift 🎁"}
              </Link>
              <Link
                href={`/${locale}/games`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-purple-600 shadow-lg ring-1 ring-purple-200 transition-transform hover:scale-105"
              >
                {tr ? "Benimle oyna 🎮" : "Play with me 🎮"}
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────────── CANLI DURUM ───────────────── */}
        <section className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            {tr ? "Umay şu an ne yapıyor?" : "What is Umay doing right now?"}
          </h2>
          <LiveStatus locale={locale} />
        </section>

        {/* ───────────────── FOTO GALERİSİ ───────────────── */}
        <section className="space-y-5">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              📸 {tr ? "Albümüm" : "My Album"}
            </h2>
            <p className="text-sm text-zinc-500">
              {tr ? "En sevdiğim kareler (bir dokunuşla büyüt)" : "My favorite moments (tap to enlarge)"}
            </p>
          </div>
          <PhotoGallery locale={locale} />
        </section>

        {/* ───────────────── KİLOMETRE TAŞLARI ───────────────── */}
        <section className="rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-5 sm:p-8 border-2 border-pink-100">
          <h2 className="mb-6 text-center text-2xl sm:text-3xl font-extrabold">
            🌱 {tr ? "Minik Kilometre Taşlarım" : "My Tiny Milestones"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { e: "👶", tr: "İlk nefes", en: "First breath", st: tr ? "tamamlandı" : "done" },
              { e: "😊", tr: "İlk gülümseme", en: "First smile", st: tr ? "tamamlandı" : "done" },
              { e: "🦷", tr: "İlk diş", en: "First tooth", st: tr ? "geliyor!" : "incoming!" },
              { e: "🍌", tr: "İlk ek gıda", en: "First solid food", st: tr ? "yumyum" : "yum yum" },
              { e: "🪑", tr: "Desteksiz oturma", en: "Sitting up solo", st: tr ? "başardım" : "nailed it" },
              { e: "🚼", tr: "Emekleme", en: "Crawling", st: tr ? "beta sürümde" : "in beta" },
            ].map((m) => (
              <div key={m.tr} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <span className="text-2xl">{m.e}</span>
                <span className="flex-1 font-medium text-zinc-700">{tr ? m.tr : m.en}</span>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-700">
                  {m.st}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── GÜNLÜK İSTATİSTİK ───────────────── */}
        <section>
          <h2 className="mb-6 text-center text-2xl sm:text-3xl font-extrabold">
            📊 {tr ? "Günlük Karne" : "Daily Report Card"}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { e: "😄", v: "∞", tr: "Gülücük", en: "Giggles" },
              { e: "🍼", v: "8/8", tr: "Mama (bugün)", en: "Bottles (today)" },
              { e: "😴", v: "16s", tr: "Uyku", en: "Sleep" },
              { e: "🦷", v: days > 180 ? "2" : "0", tr: "Diş", en: "Teeth" },
            ].map((s) => (
              <div key={s.tr} className="rounded-2xl bg-white p-4 text-center shadow-md ring-1 ring-pink-50">
                <div className="text-3xl">{s.e}</div>
                <div className="mt-1 text-2xl font-extrabold text-purple-600">{s.v}</div>
                <div className="text-xs text-zinc-500">{tr ? s.tr : s.en}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-zinc-400">
            {tr
              ? `Çalışma süresi: ${days} gün · sistemde hiç çökme yok (sadece birkaç ağlama krizi) 💪`
              : `Uptime: ${days} days · zero crashes (just a few crying sessions) 💪`}
          </p>
        </section>

        {/* ───────────────── OYUNLAR ───────────────── */}
        <section className="rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 md:p-8 border-2 border-purple-100">
          <BabyGames locale={locale} />
        </section>

        {/* ───────────────── YORUMLAR ───────────────── */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 p-5 sm:p-8">
          <h2 className="mb-6 text-2xl sm:text-3xl font-extrabold text-center">
            ⭐ {tr ? "Hayata 5 Yıldız Veriyorum" : "I Give Life 5 Stars"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t_tr: "Mama Servisi", t_en: "Milk Service", s: 5, b_tr: "7/24 açık, sıcacık geliyor. Bu kadar iyi hizmet görülmedi!", b_en: "Open 24/7, always warm. Best service ever!" },
              { t_tr: "Kucak Konforu", t_en: "Cuddle Comfort", s: 5, b_tr: "Annemin kucağı dünyanın en rahat yeri. Yorgan bile gereksiz.", b_en: "Mom's lap is the comfiest place on earth. Don't even need a blanket." },
              { t_tr: "Uyku Modu", t_en: "Sleep Mode", s: 4, b_tr: "Gayet iyi ama bazen gece kendiliğinden kapanıyor, biraz buglı 😴", b_en: "Pretty good, but sometimes it shuts off at night on its own. A bit buggy 😴" },
            ].map((r) => (
              <div key={r.t_tr} className="rounded-2xl bg-white p-4 shadow">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-sm">{tr ? r.t_tr : r.t_en}</span>
                  <span className="text-yellow-400 text-sm">{"⭐".repeat(r.s)}</span>
                </div>
                <p className="text-xs text-zinc-600">{tr ? r.b_tr : r.b_en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── BAĞIŞ CTA ───────────────── */}
        <section className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 transition-transform hover:scale-[1.02]">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="text-lg font-bold mb-1">{tr ? "Bana Minik Hediye" : "A Tiny Gift for Me"}</h3>
            <p className="text-sm text-zinc-600 mb-4">
              {tr
                ? "Hediye kabul ediyorum! Hepsi kumbarama (ve ileride belki ilk bilgisayarıma) gidiyor 💝"
                : "I accept gifts! They all go to my piggy bank (and maybe my first computer one day) 💝"}
            </p>
            <Link href={`/${locale}/donate/umay`} className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg">
              {tr ? "Hediye gönder 🎁" : "Send a gift 🎁"}
            </Link>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 p-6 transition-transform hover:scale-[1.02]">
            <div className="text-4xl mb-3">🐾</div>
            <h3 className="text-lg font-bold mb-1">{tr ? "Pati Kardeşlerime" : "For My Paw Friends"}</h3>
            <p className="text-sm text-zinc-600 mb-4">
              {tr
                ? "Ben mutluyum, sıra sokaktaki dostlarımda. HAYTAP'a destek olur musun? 💚"
                : "I'm happy — now it's my street friends' turn. Will you support HAYTAP? 💚"}
            </p>
            <Link href={`/${locale}/donate/haytap`} className="inline-block rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg">
              {tr ? "HAYTAP'a bağış 🌍" : "Donate to HAYTAP 🌍"}
            </Link>
          </div>
        </section>

        {/* ───────────────── HABER BANDI ───────────────── */}
        <section className="overflow-hidden rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-3 sm:p-4">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xl">📢</span>
            <span className="text-xs font-bold">{tr ? "UMAY HABERLERİ" : "UMAY NEWS"}</span>
          </div>
          <div className="overflow-hidden">
            <div className="animate-slide text-xs sm:text-sm text-yellow-800">
              {tr
                ? "🍼 Mama saatleri tıkır tıkır işliyor • 😄 Günün gülücük rekoru kırıldı • 🦷 İlk diş alarmı verildi • 🧸 Ayıcık en iyi arkadaş seçildi • 👏 El çırpma öğrenildi • 😴 Gece uykusu güncellemesi yüklendi • 🐾 Pati dostlara selam •"
                : "🍼 Milk schedule running smoothly • 😄 New daily giggle record • 🦷 First tooth alert issued • 🧸 Teddy elected best friend • 👏 Clapping unlocked • 😴 Night-sleep update installed • 🐾 Shout-out to paw friends •"}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
