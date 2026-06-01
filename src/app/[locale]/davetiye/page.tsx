import type { Metadata } from "next"
import Image from "next/image"
import Confetti from "@/components/Confetti"
import FloatingThings from "@/components/FloatingThings"
import RsvpForm from "@/components/RsvpForm"
import ShareButtons from "@/components/ShareButtons"
import { HERO_PHOTO } from "@/lib/photos"
import { PARTY } from "@/lib/party"

export const metadata: Metadata = {
  title: "Doğum Günü Davetiyesi 🎉",
  description: `Umay'ın doğum günü partisi — ${PARTY.date_tr}, saat ${PARTY.time_tr}, ${PARTY.venue}. Katılımını bildir!`,
  openGraph: {
    title: "Umay'ın Doğum Günü Partisi 🎉",
    description: `${PARTY.date_tr} · ${PARTY.time_tr} · ${PARTY.venue}`,
  },
}

const SHARE_TEXT = `🎉 Umay'ın doğum günü partisine davetlisin!\n📅 ${PARTY.date_tr}\n🕐 Saat ${PARTY.time_tr}\n📍 ${PARTY.venue}`

export default function DavetiyePage() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <FloatingThings />
      <Confetti />

      <div className="max-w-2xl mx-auto space-y-8">

        {/* ───────── DAVETİYE KARTI ───────── */}
        <section className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 sm:p-10 shadow-2xl">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-pink-200/40 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-200/40 blur-2xl" />

          <div className="relative flex flex-col items-center text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pink-600 shadow-sm">
              🎈 Doğum Günü Davetiyesi 🎈
            </div>

            {/* Foto */}
            <div className="relative animate-bob">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 blur-lg opacity-70" />
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt.tr}
                  width={HERO_PHOTO.w}
                  height={HERO_PHOTO.h}
                  priority
                  className="h-full w-full object-cover"
                  sizes="160px"
                />
              </div>
              <span className="absolute -top-2 -right-2 text-3xl rotate-12 animate-wiggle-soft">🎂</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-zinc-500">Sevgiyle davetlisin…</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                  Umay’ın Doğum Günü Partisi
                </span>
              </h1>
              <p className="text-base text-zinc-600 pt-1">
                Birlikte kutlamak, gülmek ve pasta yemek için seni aramızda görmek isteriz 💛
              </p>
            </div>

            {/* Detaylar */}
            <div className="grid w-full gap-3 pt-2 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 px-3 py-4 shadow-sm">
                <div className="text-2xl">📅</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-zinc-400">Tarih</div>
                <div className="text-sm font-bold text-zinc-700">{PARTY.date_tr}</div>
              </div>
              <div className="rounded-2xl bg-white/80 px-3 py-4 shadow-sm">
                <div className="text-2xl">🕐</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-zinc-400">Saat</div>
                <div className="text-sm font-bold text-zinc-700">{PARTY.time_tr}</div>
              </div>
              <div className="rounded-2xl bg-white/80 px-3 py-4 shadow-sm">
                <div className="text-2xl">📍</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-zinc-400">Yer</div>
                <a
                  href={PARTY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-purple-600 underline-offset-2 hover:underline"
                >
                  {PARTY.venue}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── KATILIM (RSVP) ───────── */}
        <section className="space-y-3">
          <h2 className="text-center text-2xl font-extrabold">Geliyor musun? ✋</h2>
          <RsvpForm />
        </section>

        {/* ───────── PAYLAŞ ───────── */}
        <section className="space-y-3">
          <h2 className="text-center text-lg font-bold text-zinc-700">Sevdiklerini de davet et 💌</h2>
          <ShareButtons shareText={SHARE_TEXT} />
        </section>

      </div>
    </div>
  )
}
