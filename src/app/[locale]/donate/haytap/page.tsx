import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ExternalLink } from "lucide-react"
import CopyButton from "@/components/CopyButton"

export default async function DonateHaytapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isTurkish = locale === 'tr'
  
  const ibanList = [
    {
      bank: "Türkiye İş Bankası",
      currency: "TL",
      iban: "TR89 0006 4000 0011 0920 3358 62"
    },
    {
      bank: "Garanti Bankası",
      currency: "TL",
      iban: "TR21 0006 2000 3570 0006 2970 59"
    },
    {
      bank: "Garanti Bankası",
      currency: "€",
      iban: "TR24 0006 2000 3570 0009 0848 82"
    },
    {
      bank: "Garanti Bankası",
      currency: "US$",
      iban: "TR94 0006 2000 3570 0009 0848 83"
    },
    {
      bank: "Garanti Bankası",
      currency: "CHF",
      iban: "TR21 0006 2000 3570 0009 0542 84"
    },
    {
      bank: "Finansbank",
      currency: "TL",
      iban: "TR85 0011 1000 0000 0029 5756 36"
    },
    {
      bank: "Yapı Kredi Bankası",
      currency: "TL",
      iban: "TR24 0006 7010 0000 0088 6926 83"
    },
    {
      bank: "Akbank",
      currency: "TL",
      iban: "TR86 0004 6012 3388 8000 0384 04"
    }
  ]
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-white text-xs font-bold px-4 py-2 rounded-full rotate-2 z-10">
          {isTurkish ? "UMAY'DAN SOSYAL SORUMLULUK" : "SOCIAL RESPONSIBILITY BY UMAY"}
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border-4 border-green-200">
          <div className="relative inline-block mb-4">
            <div className="text-6xl">🐾</div>
            <div className="absolute -bottom-2 -right-3 text-3xl animate-bounce">👶</div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            {isTurkish ? "Pati Kardeşlerim İçin HAYTAP" : "HAYTAP for My Paw Friends"}
          </h1>
          
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-4">
            {isTurkish 
              ? "Merhaba! Ben Umay 👶 Dünyaya geldim ve sokak hayvanlarının da mutlu olmasını çok istiyorum!" 
              : "Hi! I'm Umay 👶 I'm here in the world, and I really want street animals to be happy too!"}
          </p>
          
          <div className="bg-white/70 rounded-xl p-4 max-w-md mx-auto border-2 border-yellow-300">
            <p className="text-sm font-medium text-gray-700">
              {isTurkish 
                ? "💡 Bebek Mantığı: Eğer patili dostlarımız mutluysa, dünya daha güzel bir yer olur. Ben de mutlu bir dünyada büyümek istiyorum!"
                : "💡 Baby Logic: If our paw friends are happy, the world becomes a better place. I want to grow up in a happy world!"}
            </p>
          </div>
        </div>
      </div>

      {/* Why HAYTAP Card */}
      <Card className="border-2 border-green-300 shadow-xl hover:scale-[1.02] transition-transform">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-6 w-6 text-red-500 animate-pulse" />
            {isTurkish ? "Neden HAYTAP? (Umay Açıklıyor)" : "Why HAYTAP? (Umay Explains)"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 bg-yellow-50 rounded-lg p-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-semibold text-sm">{isTurkish ? "Türkiye'nin En Büyüğü" : "Turkey's Largest"}</p>
                <p className="text-xs text-gray-600">
                  {isTurkish 
                    ? "83 üye derneği var! (Ben daha sayı sayamıyorum ama çok gibi duruyor)" 
                    : "83 member associations! (I can't count yet but sounds like a lot)"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
              <span className="text-2xl">🏥</span>
              <div>
                <p className="font-semibold text-sm">{isTurkish ? "Tedavi Ediyor" : "Provides Treatment"}</p>
                <p className="text-xs text-gray-600">
                  {isTurkish 
                    ? "Yaralı hayvanları tedavi ediyorlar. (Ben de ilerde doktor olursam yardım ederim!)" 
                    : "They treat injured animals. (If I become a doctor, I'll help too!)"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
              <span className="text-2xl">🍖</span>
              <div>
                <p className="font-semibold text-sm">{isTurkish ? "Mama Veriyor" : "Provides Food"}</p>
                <p className="text-xs text-gray-600">
                  {isTurkish 
                    ? "Aç hayvanları besliyorlar. (Ben de sürekli acıkıyorum, anlıyorum onları)" 
                    : "They feed hungry animals. (I'm always hungry too, I understand them)"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mt-4">
            <p className="text-sm font-medium text-amber-800">
              <strong>{isTurkish ? "Umay'ın Sözü:" : "Umay's Promise:"}</strong> {isTurkish 
                ? "En büyük hayalim bir sokak kedisini sevmek! 🐱 (Önce şu minik ellerimi tam koordine edeyim de)"
                : "My biggest dream is to pet a street cat! 🐱 (Once I fully coordinate these tiny hands)"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Online Donation Button */}
      <Card className="border-2 border-purple-300 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <span className="text-3xl">🎯</span>
              {isTurkish ? "Online Bağış Yap!" : "Donate Online!"}
            </h2>
            <p className="text-gray-600">
              {isTurkish 
                ? "HAYTAP'ın güvenli bağış sayfasına yönlendirileceksiniz" 
                : "You'll be redirected to HAYTAP's secure donation page"}
            </p>
            <a 
              href="https://fonzip.com/haytap/bagis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full max-w-md mx-auto"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl hover:scale-105 transition-all shadow-xl">
                <div className="flex items-center justify-center gap-3">
                  <Heart className="h-8 w-8 animate-pulse" />
                  <div>
                    <div className="text-xl font-bold">{isTurkish ? "HAYTAP'a Bağış Yap" : "Donate to HAYTAP"}</div>
                    <div className="text-sm opacity-90">{isTurkish ? "Güvenli ödeme sayfasına git" : "Go to secure payment page"}</div>
                  </div>
                  <ExternalLink className="h-6 w-6" />
                </div>
              </div>
            </a>
            <p className="text-xs text-gray-500">
              {isTurkish 
                ? "* fonzip.com üzerinden güvenli bağış yapabilirsiniz" 
                : "* You can donate securely via fonzip.com"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SMS Donation Option */}
      <Card className="border-2 border-blue-300 shadow-xl">
        <CardContent className="pt-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">📱</span>
              {isTurkish ? "SMS ile Hızlı Bağış" : "Quick SMS Donation"}
            </h3>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                {isTurkish ? "Telefonunuzdan" : "From your phone"}
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                HAYTAP
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {isTurkish ? "yazıp" : "text to"}
              </p>
              <div className="text-3xl font-bold text-pink-600">
                2868
              </div>
              <p className="text-xs text-gray-500 mt-3">
                {isTurkish ? "10₺ bağış yapılır" : "10₺ donation will be made"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Transfer Options */}
      <Card className="border-2 border-green-300 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-2xl">🏦</span>
            {isTurkish ? "Banka Havalesi ile Bağış" : "Bank Transfer Donation"}
          </CardTitle>
          <CardDescription>
            HAYTAP - HAYVAN HAKLARI FEDERASYONU
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {/* TL Accounts */}
            <div className="bg-green-50 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 text-green-800">
                💚 {isTurkish ? "Türk Lirası (TL) Hesapları" : "Turkish Lira (TL) Accounts"}
              </h4>
              <div className="space-y-2">
                {ibanList.filter(item => item.currency === "TL").map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-xs">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <span className="font-semibold">{item.bank}</span>
                      <CopyButton text={item.iban.replace(/\s/g, '')} locale={locale} />
                    </div>
                    <div className="font-mono bg-gray-50 p-2 rounded mt-1 break-all">
                      {item.iban}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Foreign Currency Accounts */}
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 text-blue-800">
                💙 {isTurkish ? "Döviz Hesapları" : "Foreign Currency Accounts"}
              </h4>
              <div className="space-y-2">
                {ibanList.filter(item => item.currency !== "TL").map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-xs">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <span className="font-semibold">{item.bank} ({item.currency})</span>
                      <CopyButton text={item.iban.replace(/\s/g, '')} locale={locale} />
                    </div>
                    <div className="font-mono bg-gray-50 p-2 rounded mt-1 break-all">
                      {item.iban}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SWIFT Code */}
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-sm">SWIFT Code:</span>
                  <span className="font-mono text-sm ml-2">TGBATRIS</span>
                </div>
                <CopyButton text="TGBATRIS" locale={locale} />
              </div>
            </div>

            <p className="text-xs text-gray-500 italic text-center pt-2">
              {isTurkish 
                ? '💬 Açıklama kısmına "Umay\'dan sevgilerle 👶🐾" yazabilirsiniz' 
                : '💬 You can write "With love from Umay 👶🐾" in the description'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Fun Impact Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
        <h3 className="font-bold text-lg mb-4 text-center">
          {isTurkish ? "🎮 Bağışının Etkisi (Umay Skoru)" : "🎮 Your Impact (Umay Score)"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 shadow hover:scale-110 transition-transform cursor-pointer">
            <div className="text-2xl mb-1">🥫</div>
            <div className="text-xs font-bold">10₺</div>
            <div className="text-xs text-gray-600">{isTurkish ? "1 Mama" : "1 Meal"}</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow hover:scale-110 transition-transform cursor-pointer">
            <div className="text-2xl mb-1">💊</div>
            <div className="text-xs font-bold">50₺</div>
            <div className="text-xs text-gray-600">{isTurkish ? "1 İlaç" : "1 Medicine"}</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow hover:scale-110 transition-transform cursor-pointer">
            <div className="text-2xl mb-1">🏠</div>
            <div className="text-xs font-bold">100₺</div>
            <div className="text-xs text-gray-600">{isTurkish ? "1 Kulübe" : "1 Shelter"}</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow hover:scale-110 transition-transform cursor-pointer">
            <div className="text-2xl mb-1">❤️</div>
            <div className="text-xs font-bold">500₺</div>
            <div className="text-xs text-gray-600">{isTurkish ? "1 Hayat" : "1 Life"}</div>
          </div>
        </div>
      </div>

      {/* Thank You Footer */}
      <div className="text-center space-y-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-300">
        <div className="text-4xl animate-bounce">🤱</div>
        <p className="text-sm font-medium text-gray-700 max-w-md mx-auto">
          {isTurkish 
            ? "Teşekkürler! Doğduğumda sana ve tüm pati dostlarına sarılacağım! - Umay 👶" 
            : "Thank you! When I'm born, I'll hug you and all the paw friends! - Umay 👶"}
        </p>
        <div className="flex justify-center gap-2">
          <span className="bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            {isTurkish ? "#BebektenDestek" : "#SupportFromBaby"}
          </span>
          <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            {isTurkish ? "#PatiSever" : "#PawLover"}
          </span>
        </div>
        </div>
      </div>
    </div>
  )
}