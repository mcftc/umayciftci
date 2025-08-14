export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  const isTurkish = locale === 'tr'
  const birthDate = new Date('2025-09-05')
  const now = new Date()
  const daysLeft = Math.ceil((birthDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const weeksPregnant = Math.floor((40 - (daysLeft / 7)))
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 md:space-y-6 text-center">
          <div className="relative inline-block">
            <div className="text-6xl sm:text-7xl md:text-8xl animate-bounce">👶</div>
            <div className="absolute -top-2 -right-2 sm:-right-4 bg-yellow-400 text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full rotate-12 animate-pulse">
              BETA
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient px-2">
            {isTurkish ? "Merhaba Dünya! (yakında)" : "Hello World! (coming soon)"}
          </h1>
          
          <div className="space-y-2 md:space-y-3">
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto px-2">
              {isTurkish 
                ? "Ben Umay! Şu an annemin karnındayım ve WiFi sinyali çok kötü 📶" 
                : "I'm Umay! Currently in my mom's belly and the WiFi signal is terrible 📶"}
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 px-2">
              {isTurkish 
                ? "Bu siteyi tek elle yaptım. (Diğer elim parmak emmeyle meşgul) 👍" 
                : "I made this site with one hand. (The other one is busy thumb-sucking) 👍"}
            </p>
          </div>
        </div>

        {/* Developer Console */}
        <div className="bg-black text-green-400 rounded-lg sm:rounded-xl p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] sm:text-xs">umay@womb:~$</span>
          </div>
          <div className="space-y-1">
            <div className="typing-animation">
              <span className="text-green-300">$</span> npm install life@1.0.0
            </div>
            <div className="text-yellow-400 text-[10px] sm:text-xs">⚠️ {isTurkish ? "UYARI: 'life' paketi " : "WARNING: 'life' package "}{daysLeft}{isTurkish ? " gün sonra yüklenecek" : " days until installation"}</div>
            <div className="text-blue-400 text-[10px] sm:text-xs">📦 {isTurkish ? "Bağımlılıklar: anne-sütü, uyku, sevgi, kaka-bezi" : "Dependencies: milk, sleep, love, diapers"}</div>
          </div>
        </div>

        {/* Live Stats Dashboard */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <span className="animate-pulse">🔴</span> 
            {isTurkish ? "Canlı Yayın - Karın İçinden" : "Live Stream - From The Womb"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm font-medium">{isTurkish ? "Mevcut Durum:" : "Current Status:"}</span>
                <span className="bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                  {isTurkish ? "ÇEVRİMİÇİ" : "ONLINE"}
                </span>
              </div>
              <div className="text-base sm:text-lg md:text-2xl">
                {weeksPregnant < 20 ? "🤸 " + (isTurkish ? "Takla atıyorum!" : "Doing flips!") :
                 weeksPregnant < 30 ? "🥊 " + (isTurkish ? "Anneyi tekmeliyorum" : "Kicking mom") :
                 "😴 " + (isTurkish ? "Yer kalmadı, uyuyorum" : "No space left, sleeping")}
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{isTurkish ? "Boyut Karşılaştırması:" : "Size Comparison:"}</div>
              <div className="text-base sm:text-lg md:text-2xl">
                {weeksPregnant < 12 ? "🫘 " + (isTurkish ? "Fasulye" : "Bean") :
                 weeksPregnant < 20 ? "🥑 " + (isTurkish ? "Avokado" : "Avocado") :
                 weeksPregnant < 30 ? "🍆 " + (isTurkish ? "Patlıcan" : "Eggplant") :
                 "🍉 " + (isTurkish ? "Karpuz (Annem yardım!)" : "Watermelon (Mom help!)")}
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{isTurkish ? "Son Aktivite:" : "Last Activity:"}</div>
              <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                <div>👊 {isTurkish ? "14:32 - Mesaneye tekme" : "14:32 - Kicked bladder"}</div>
                <div>🎵 {isTurkish ? "13:45 - Dans partisi" : "13:45 - Dance party"}</div>
                <div>🍕 {isTurkish ? "12:00 - Anne pizza yedi (👍)" : "12:00 - Mom ate pizza (👍)"}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{isTurkish ? "Ping Durumu:" : "Ping Status:"}</div>
              <div className="font-mono text-[10px] sm:text-xs md:text-sm space-y-0.5 sm:space-y-1">
                <div>🏥 Hospital: <span className="text-green-600">12ms</span></div>
                <div>🍼 Milk Supply: <span className="text-yellow-600">{daysLeft}d timeout</span></div>
                <div>👶 BabyNet: <span className="text-blue-600">Connected</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown with humor */}
        <div className="relative">
          <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-4 bg-yellow-300 text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full rotate-[-15deg] z-10">
            {isTurkish ? "YAKINDA!" : "COMING SOON!"}
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 sm:border-4 border-pink-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
              {isTurkish ? "Kalan Pişme Süresi ⏲️" : "Time Left in the Oven ⏲️"}
            </h2>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
              {daysLeft}
            </div>
            <p className="text-sm sm:text-base text-zinc-600 mb-3 sm:mb-4">
              {isTurkish ? "gün (sabırsızlanıyorum!)" : "days (I'm impatient!)"}
            </p>
            <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm">{isTurkish ? "Yükleniyor..." : "Loading..."}</span>
                <span className="text-xs sm:text-sm font-bold">{Math.round((40 - daysLeft/7)/40 * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full transition-all duration-500 animate-pulse"
                  style={{ width: `${Math.round((40 - daysLeft/7)/40 * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Baby's Reviews Section - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:block bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
            {isTurkish ? "Karın İçi Yorumlarım ⭐" : "My Womb Reviews ⭐"}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="font-semibold text-sm sm:text-base">{isTurkish ? "Plasenta Büfe" : "Placenta Buffet"}</span>
                <div className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {isTurkish 
                  ? "7/24 açık, sınırsız yemek. Menü biraz tekrar ediyor ama şikayet etmiyorum." 
                  : "Open 24/7, unlimited food. Menu is a bit repetitive but I'm not complaining."}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="font-semibold text-sm sm:text-base">{isTurkish ? "Yatak Konforu" : "Bed Comfort"}</span>
                <div className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {isTurkish 
                  ? "Su yatağı güzel ama yer gittikçe daralıyor. Büyüme sorunları..." 
                  : "Water bed is nice but space is getting tight. Growing pains..."}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="relative group">
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full animate-bounce">
              {isTurkish ? "YENİ!" : "NEW!"}
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎁</div>
              <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                {isTurkish ? "Erken Erişim Hediyesi" : "Early Access Gift"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mb-3 sm:mb-4">
                {isTurkish 
                  ? "Doğmadan hediye alıyorum! Startup kültürü bu olsa gerek 🚀" 
                  : "Getting gifts before launch! This must be startup culture 🚀"}
              </p>
              <a href={`/${locale}/donate/umay`} className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-xs sm:text-sm">
                {isTurkish ? "Pre-order Hediye 🎮" : "Pre-order Gift 🎮"}
              </a>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {isTurkish ? "EKO" : "ECO"}
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🐾</div>
              <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                {isTurkish ? "Pati Kardeşlerim İçin" : "For My Paw Friends"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mb-3 sm:mb-4">
                {isTurkish 
                  ? "Ben doğmadan önce dünyayı daha iyi yapalım! (CV'me yazarım)" 
                  : "Let's make the world better before I arrive! (Going on my CV)"}
              </p>
              <a href={`/${locale}/donate/haytap`} className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-xs sm:text-sm">
                {isTurkish ? "HAYTAP'a Bağış 🌍" : "Donate to HAYTAP 🌍"}
              </a>
            </div>
          </div>
        </div>

        {/* Fun Facts Ticker */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg sm:rounded-xl p-3 sm:p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <span className="text-xl sm:text-2xl">📢</span>
            <span className="font-bold text-xs sm:text-sm">{isTurkish ? "SON DAKİKA" : "BREAKING NEWS"}</span>
          </div>
          <div className="text-[10px] sm:text-xs md:text-sm space-y-1 text-yellow-800">
            <div className="animate-slide">
              {isTurkish 
                ? "• Umay bugün 73 kez hıçkırdı • Anne dondurma yedi, Umay mutlu • Ultrason'da el salladı • Doktor 'Çok hareketli' dedi •" 
                : "• Umay hiccuped 73 times today • Mom ate ice cream, Umay happy • Waved in ultrasound • Doctor said 'Very active' •"}
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4">
          <div className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 sm:px-6 py-2 sm:py-3">
            <p className="text-xs sm:text-sm font-medium">
              {isTurkish 
                ? "Site v0.9 (Doğunca v1.0 çıkacak)" 
                : "Site v0.9 (v1.0 releases at birth)"}
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-400">
            {isTurkish 
              ? "© 2025 Umay. Tüm hakları saklıdır. (Henüz hukuki ehliyetim yok ama olsun)" 
              : "© 2025 Umay. All rights reserved. (No legal capacity yet but whatever)"}
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 text-xl sm:text-2xl">
            <span className="hover:scale-125 transition-transform cursor-pointer" title="GitHub">👨‍💻</span>
            <span className="hover:scale-125 transition-transform cursor-pointer" title="Instagram">📸</span>
            <span className="hover:scale-125 transition-transform cursor-pointer" title="LinkedIn">👔</span>
            <span className="hover:scale-125 transition-transform cursor-pointer" title="TikTok">🎵</span>
          </div>
        </div>
      </div>
    </div>
  )
}