import PaytrButton from "@/components/PaytrButton"
import CopyButton from "@/components/CopyButton"
import Link from "next/link"

const IBAN = "TR13 0006 2000 4880 0006 6373 09"
const HOLDER = "Bilal ÇİFTÇİ"
const BANK = "Garanti BBVA"

export default async function DonateUmay({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const tr = locale === "tr"

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Hero */}
        <div className="space-y-3 text-center">
          <div className="text-6xl animate-bob">🎁</div>
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            {tr ? "Bana Minik Bir Hediye" : "A Tiny Gift for Me"}
          </h1>
          <p className="mx-auto max-w-md text-zinc-600">
            {tr
              ? "Merhaba, ben Umay! 🍼 Bana hediye almak istersen çok sevinirim. Hepsi kumbarama gidiyor — belki ileride ilk bisikletim ya da bir sürü oyuncak olur! 💝"
              : "Hi, I'm Umay! 🍼 If you'd like to get me a gift, I'd be so happy. It all goes into my piggy bank — maybe my first bike one day, or lots of toys! 💝"}
          </p>
        </div>

        {/* Kartla öde */}
        <div className="rounded-2xl border border-pink-100 bg-white p-4 sm:p-6 shadow">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            💳 {tr ? "Kartla Öde" : "Pay by Card"}
          </h2>
          <p className="mb-4 text-sm text-zinc-500">
            {tr
              ? "Güvenli ödeme (PayTR). Dilediğin tutarı yazıp kartınla gönderebilirsin."
              : "Secure payment (PayTR). Enter any amount and pay with your card."}
          </p>
          <PaytrButton />
        </div>

        {/* Banka havalesi */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            🏦 {tr ? "Banka Havalesi (EFT)" : "Bank Transfer"}
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-zinc-500">{tr ? "Hesap Sahibi" : "Account Holder"}</span>
              <span className="font-medium">{HOLDER}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b pb-2">
              <div className="min-w-0">
                <div className="text-zinc-500">IBAN</div>
                <div className="font-mono text-xs sm:text-sm break-all">{IBAN}</div>
              </div>
              <CopyButton text={IBAN.replace(/\s/g, "")} locale={locale} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">{tr ? "Banka" : "Bank"}</span>
              <span className="font-medium">{BANK}</span>
            </div>
          </div>
        </div>

        {/* Pati dostlar yönlendirme */}
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5 text-center">
          <p className="text-sm text-zinc-600">
            {tr
              ? "Hediye yerine iyilik mi yapmak istersin? Pati dostlarıma destek ol 🐾"
              : "Prefer doing a good deed instead of a gift? Support my paw friends 🐾"}
          </p>
          <Link
            href={`/${locale}/donate/haytap`}
            className="mt-3 inline-block rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {tr ? "HAYTAP'a bağış 🌍" : "Donate to HAYTAP 🌍"}
          </Link>
        </div>

        <p className="text-center text-xs text-zinc-400">
          {tr
            ? "Sevgiyle toplanır, sevgiyle harcanır 💕"
            : "Collected with love, spent with love 💕"}
        </p>
      </div>
    </div>
  )
}
