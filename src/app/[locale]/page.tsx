import BabyGames from '@/components/BabyGames'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  const isTurkish = locale === 'tr'
  const birthDate = new Date('2025-09-05')
  const actualBirthDate = new Date('2025-09-02T02:00:00') // Born early at 02:00!
  const now = new Date()
  const daysEarly = Math.ceil((birthDate.getTime() - actualBirthDate.getTime()) / (1000 * 60 * 60 * 24))
  const daysOld = Math.ceil((now.getTime() - actualBirthDate.getTime()) / (1000 * 60 * 60 * 24))
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 md:space-y-6 text-center">
          <div className="relative inline-block">
            <div className="text-6xl sm:text-7xl md:text-8xl animate-bounce">👶</div>
            <div className="absolute -top-2 -right-2 sm:-right-4 bg-green-400 text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full rotate-12 animate-pulse">
              v1.0 LIVE!
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient px-2">
            {isTurkish ? "Merhaba Dünya! 🎉" : "Hello World! 🎉"}
          </h1>
          
          <div className="space-y-2 md:space-y-3">
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto px-2">
              {isTurkish 
                ? `Ben Umay! ${daysEarly} gün erken doğdum çünkü sabırsızlandım! 🚀` 
                : `I'm Umay! I was born ${daysEarly} days early because I got impatient! 🚀`}
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 px-2">
              {isTurkish 
                ? `Deployment başarılı! Artık WiFi sinyali çok iyi! (${daysOld} günlük bebek developer) 💻` 
                : `Deployment successful! WiFi signal is great now! (${daysOld}-day-old baby developer) 💻`}
            </p>
            <p className="text-xs sm:text-sm text-pink-500 font-semibold px-2">
              {isTurkish 
                ? "🕐 02:00'da doğdum - Gece vardiyası çalışanıyım artık!" 
                : "🕐 Born at 02:00 - I'm now a night shift worker!"}
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
            <span className="text-[10px] sm:text-xs">umay@hospital:~$</span>
          </div>
          <div className="space-y-1">
            <div className="typing-animation">
              <span className="text-green-300">$</span> npm install life@1.0.0
            </div>
            <div className="text-green-400 text-[10px] sm:text-xs">✅ {isTurkish ? "BAŞARILI: 'life@1.0.0' kurulumu tamamlandı!" : "SUCCESS: 'life@1.0.0' installation completed!"}</div>
            <div className="text-blue-400 text-[10px] sm:text-xs">📦 {isTurkish ? "Yüklenen: ağlama, gülme, uyku-bug, süt-bağımlılığı" : "Installed: crying, laughing, sleep-bug, milk-dependency"}</div>
            <div className="text-cyan-400 text-[10px] sm:text-xs">🚀 {isTurkish ? "Çalışma süresi: " : "Uptime: "}{daysOld} {isTurkish ? "gün" : "days"}</div>
            <div className="text-purple-400 text-[10px] sm:text-xs">💡 {isTurkish ? "Son commit: 'İlk nefes 🫁'" : "Last commit: 'First breath 🫁'"}</div>
          </div>
        </div>

        {/* Live Stats Dashboard */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <span className="animate-pulse">🔴</span> 
            {isTurkish ? "Canlı Yayın - Hastane Odasından" : "Live Stream - From Hospital Room"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm font-medium">{isTurkish ? "Mevcut Durum:" : "Current Status:"}</span>
                <span className="bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                  {isTurkish ? "CANLI" : "LIVE"}
                </span>
              </div>
              <div className="text-base sm:text-lg md:text-2xl">
                {Math.random() > 0.7 ? "😴 " + (isTurkish ? "Uyuyorum (yeni iş zor)" : "Sleeping (new job is tough)") :
                 Math.random() > 0.4 ? "🍼 " + (isTurkish ? "Süt molası" : "Milk break") :
                 "👀 " + (isTurkish ? "Dünyayı keşfediyorum" : "Exploring the world")}
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{isTurkish ? "Şu Anki Boyut:" : "Current Size:"}</div>
              <div className="text-base sm:text-lg md:text-2xl">
                {"👶 " + (isTurkish ? "Tam bebek boyutu!" : "Full baby size!")}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isTurkish ? "Artık karın içi nostalji" : "Womb is now nostalgic"}
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{isTurkish ? "Son Aktivite:" : "Last Activity:"}</div>
              <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                <div>👋 {isTurkish ? "10:15 - İlk selam" : "10:15 - First hello"}</div>
                <div>😴 {isTurkish ? "09:30 - Power nap" : "09:30 - Power nap"}</div>
                <div>🍼 {isTurkish ? "08:45 - Süt toplantısı" : "08:45 - Milk meeting"}</div>
                <div>😊 {isTurkish ? "02:00 - Grand opening!" : "02:00 - Grand opening!"}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{isTurkish ? "Sistem Durumu:" : "System Status:"}</div>
              <div className="font-mono text-[10px] sm:text-xs md:text-sm space-y-0.5 sm:space-y-1">
                <div>🏥 Hospital WiFi: <span className="text-green-600">5ms</span></div>
                <div>🍼 Milk Supply: <span className="text-green-600">24/7 Active</span></div>
                <div>👶 BabyNet: <span className="text-green-600">Deployed</span></div>
                <div>😴 Sleep Mode: <span className="text-blue-600">Standby</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Birth Celebration */}
        <div className="relative">
          <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-4 bg-green-400 text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full rotate-[-15deg] z-10 animate-bounce">
            {isTurkish ? "DOĞDU!" : "BORN!"}
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 sm:border-4 border-green-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
              {isTurkish ? "🎉 Deployment Başarılı!" : "🎉 Deployment Successful!"}
            </h2>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
              {daysOld}
            </div>
            <p className="text-sm sm:text-base text-zinc-600 mb-3 sm:mb-4">
              {isTurkish ? `gün önce ${daysEarly} gün erken doğdum! 🚀` : `days old! Born ${daysEarly} days early! 🚀`}
            </p>
            <div className="bg-green-100 rounded-lg p-2 sm:p-3">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm text-green-700">{isTurkish ? "Yaşam Yüklendi ✅" : "Life Loaded ✅"}</span>
                <span className="text-xs sm:text-sm font-bold text-green-700">100%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3 sm:h-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500 w-full"></div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                {isTurkish ? "Tüm özellikler aktif! Ağlama, gülme, uyku modu çalışıyor." : "All features active! Crying, laughing, sleep mode operational."}
              </p>
            </div>
          </div>
        </div>

        {/* Baby Games Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200">
          <BabyGames locale={locale} />
        </div>

        {/* Baby's Life Reviews - Updated */}
        <div className="hidden sm:block bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
            {isTurkish ? "Yeni Yaşam Yorumlarım ⭐" : "My New Life Reviews ⭐"}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="font-semibold text-sm sm:text-base">{isTurkish ? "Hastane Servisi" : "Hospital Service"}</span>
                <div className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {isTurkish 
                  ? "WiFi çok hızlı, yatak rahat, süt servisi 24/7. Artık 5 yıldızlı konaklama!" 
                  : "WiFi is fast, bed is comfy, milk service 24/7. Now it's 5-star accommodation!"}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="font-semibold text-sm sm:text-base">{isTurkish ? "Görme Deneyimi" : "Vision Experience"}</span>
                <div className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {isTurkish 
                  ? "Her şey çok parlak! HD görüntü ama gözlerimi kapatmayı tercih ediyorum." 
                  : "Everything is so bright! HD vision but I prefer to keep my eyes closed."}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="font-semibold text-sm sm:text-base">{isTurkish ? "İlk Müdür Toplantısı" : "First Manager Meeting"}</span>
                <div className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {isTurkish 
                  ? "Anne ve baba ile ilk standup meeting. Çok verimli, sadece ağladım." 
                  : "First standup meeting with mom and dad. Very productive, just cried."}
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
                {isTurkish ? "Post-Launch Hediye Sistemi" : "Post-Launch Gift System"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mb-3 sm:mb-4">
                {isTurkish 
                  ? "Artık dünyada olduğuma göre hediye kabul etmeye başladım! Production ortamında çalışıyorum 🚀" 
                  : "Now that I'm in the world, I've started accepting gifts! Working in production environment 🚀"}
              </p>
              <a href={`/${locale}/donate/umay`} className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-xs sm:text-sm">
                {isTurkish ? "Hediye Gönder 🎁" : "Send Gift 🎁"}
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
            <span className="font-bold text-xs sm:text-sm">{isTurkish ? "CANLI HABERLER" : "LIVE NEWS"}</span>
          </div>
          <div className="text-[10px] sm:text-xs md:text-sm space-y-1 text-yellow-800">
            <div className="animate-slide">
              {isTurkish 
                ? "• FLAŞ: Umay dünyaya geldi! • İlk commit: 'Hello World' • Süt API'sı başarıyla entegre edildi • Uyku fonksiyonu beta sürümde • GitHub'da yeni repo açtı: 'my-life' • İlk pull request: 'Add crying feature' • Code review: 5/5 yıldız •" 
                : "• FLASH: Umay deployed to world! • First commit: 'Hello World' • Milk API successfully integrated • Sleep function in beta • Opened new GitHub repo: 'my-life' • First pull request: 'Add crying feature' • Code review: 5/5 stars •"}
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4">
          <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-4 sm:px-6 py-2 sm:py-3">
            <p className="text-xs sm:text-sm font-medium">
              {isTurkish 
                ? "🎉 Site v1.0 - Production Ready! 🎉" 
                : "🎉 Site v1.0 - Production Ready! 🎉"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs text-zinc-400">
              {isTurkish 
                ? "© 2025 Umay Çiftçi. Tüm hakları saklıdır. (Artık resmi olarak var oluyorum!)" 
                : "© 2025 Umay Çiftçi. All rights reserved. (Now I officially exist!)"}
            </p>
            <p className="text-[10px] sm:text-xs text-pink-500">
              {isTurkish 
                ? "🚀 İlk deployment: 2 Eylül 2025, 02:00 - Gece vardiyasında çalışmaya başladım!" 
                : "🚀 First deployment: September 2, 2025, 02:00 - Started working night shifts!"}
            </p>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 text-xl sm:text-2xl">
            <span className="hover:scale-125 transition-transform cursor-pointer" title="GitHub">👨‍💻</span>
            <span className="hover:scale-125 transition-transform cursor-pointer" title="Instagram">📸</span>
            <span className="hover:scale-125 transition-transform cursor-pointer" title="LinkedIn">👔</span>
            <span className="hover:scale-125 transition-transform cursor-pointer" title="TikTok">🎵</span>
          </div>
          <div className="flex justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <span className="bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {isTurkish ? "• Yeni Doğan" : "• Newborn"}
            </span>
            <span className="bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {isTurkish ? "• Junior Developer" : "• Junior Developer"}
            </span>
            <span className="bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {isTurkish ? "• 24/7 Aktif" : "• 24/7 Active"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}