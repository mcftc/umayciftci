import type { Metadata } from "next"
import AdminDashboard from "@/components/AdminDashboard"

// Gizli yönetim sayfası — sadece doğru ?key= ile. Arama motorlarına kapalı.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
}

export default async function YonetPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const { key } = await searchParams
  const ok = !!key && !!process.env.ADMIN_KEY && key === process.env.ADMIN_KEY

  if (!ok) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center space-y-3">
        <div className="text-5xl">🔒</div>
        <h1 className="text-xl font-bold text-zinc-700">Bu sayfa özeldir</h1>
        <p className="text-sm text-zinc-500">
          Yönetim paneline erişmek için doğru bağlantıyı kullanman gerekiyor.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Umay · Yönetim Paneli
          </span>
        </h1>
        <p className="text-sm text-zinc-500">Katılımcılar ve hatıra defteri notları</p>
      </div>
      <AdminDashboard adminKey={key!} />
    </div>
  )
}
