export default async function DonateUmayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isTurkish = locale === 'tr'
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full rotate-3 z-10 animate-pulse">
          {isTurkish ? "KARNIMDAKİ STARTUP'IM İÇİN YATIRIM ALIYORUM" : "ACCEPTING SEED FUNDING FROM THE WOMB"}
        </div>
        <div className="text-center space-y-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-10 border-4 border-pink-200">
          <div className="relative inline-block">
            <div className="text-7xl">💰</div>
            <div className="absolute -bottom-2 -right-2 text-4xl animate-bounce">👶</div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            {isTurkish ? "Umay'ın Kickstarter'ı" : "Umay's Kickstarter"}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            {isTurkish 
              ? "Merhaba yatırımcı! 👋 Ben Umay, insanlık sektöründe yeni bir oyuncuyum. Lansmanım 5 Eylül 2025'te!" 
              : "Hello investor! 👋 I'm Umay, a new player in the humanity sector. My launch date is September 5, 2025!"}
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
              {isTurkish ? "✅ Doğum Öncesi Fon" : "✅ Pre-Birth Funding"}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
              {isTurkish ? "🚀 Erken Aşama" : "🚀 Early Stage"}
            </span>
          </div>
        </div>
      </div>

      {/* Investment Tiers */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📊</span>
          {isTurkish ? "Yatırım Paketleri (ROI: Sınırsız Sevgi)" : "Investment Tiers (ROI: Unlimited Love)"}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🥉</div>
              <h3 className="font-bold text-lg">{isTurkish ? "Melek Yatırımcı" : "Angel Investor"}</h3>
              <div className="text-3xl font-bold text-gray-700 mt-2">₺50-100</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ {isTurkish ? "İlk gülümsemede anılacaksınız" : "Mentioned at first smile"}</li>
              <li>✓ {isTurkish ? "Teşekkür mektubu (el izi ile)" : "Thank you letter (with handprint)"}</li>
              <li>✓ {isTurkish ? "Bebek fotoğrafı (dijital)" : "Baby photo (digital)"}</li>
              <li>✓ {isTurkish ? "Karma +100" : "Karma +100"}</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer border-2 border-yellow-400 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {isTurkish ? "EN POPÜLER" : "MOST POPULAR"}
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🥈</div>
              <h3 className="font-bold text-lg">{isTurkish ? "Girişim Sermayesi" : "Venture Capital"}</h3>
              <div className="text-3xl font-bold text-yellow-700 mt-2">₺100-500</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ {isTurkish ? "Yukarıdakilerin hepsi" : "Everything above"}</li>
              <li>✓ {isTurkish ? "İlk 'Anne' kelimesinde anılma" : "Mentioned at first 'Mama'"}</li>
              <li>✓ {isTurkish ? "Özel bebek videosu" : "Exclusive baby video"}</li>
              <li>✓ {isTurkish ? "Bezi değiştirme hakkı (1 kez)" : "Diaper change right (1x)"}</li>
              <li>✓ {isTurkish ? "CEO (Chief Emotional Officer) unvanı" : "CEO (Chief Emotional Officer) title"}</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer border-2 border-purple-400">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🥇</div>
              <h3 className="font-bold text-lg">{isTurkish ? "Unicorn Yatırımcı" : "Unicorn Investor"}</h3>
              <div className="text-3xl font-bold text-purple-700 mt-2">₺500+</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ {isTurkish ? "Yukarıdakilerin hepsi" : "Everything above"}</li>
              <li>✓ {isTurkish ? "Doğum gününde VIP davet" : "VIP birthday invitation"}</li>
              <li>✓ {isTurkish ? "İsim sponsoru (orta isim)" : "Name sponsor (middle name)"}</li>
              <li>✓ {isTurkish ? "Sınırsız sarılma hakkı" : "Unlimited hug rights"}</li>
              <li>✓ {isTurkish ? "Board üyeliği (oyuncak seçiminde)" : "Board member (toy selection)"}</li>
              <li>✓ {isTurkish ? "NFT olarak ilk ağlama sesi" : "First cry as NFT"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Coming Soon Card Payment */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-dashed border-blue-300">
        <div className="text-center space-y-4">
          <div className="text-5xl">💳</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isTurkish ? "Kartla Ödeme Yakında!" : "Card Payment Coming Soon!"}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {isTurkish 
              ? "Online ödeme sistemi üzerinde çalışıyorum! Şimdilik banka havalesi veya QR kod ile destekleyebilirsin 🚀" 
              : "Working on the online payment system! For now, you can support via bank transfer or QR code 🚀"}
          </p>
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
            {isTurkish ? "⏳ Geliştiriliyor..." : "⏳ In Development..."}
          </div>
        </div>
      </div>

      {/* Bank Transfer with QR Code */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bank Transfer Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-3 rounded-full animate-pulse">
              <div className="text-3xl">🏦</div>
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {isTurkish ? "Klasik Banka Havalesi" : "Classic Bank Transfer"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isTurkish ? "(Boomer yöntemi ama çalışıyor 😄)" : "(Boomer method but it works 😄)"}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
              <span className="text-sm font-bold">{isTurkish ? "Banka:" : "Bank:"}</span>
              <span className="text-gray-800 font-medium">Garanti BBVA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
              <span className="text-sm font-bold">{isTurkish ? "Hesap Sahibi:" : "Account Name:"}</span>
              <span className="text-gray-800 font-medium">Bilal ÇİFTÇİ</span>
            </div>
            <div className="p-3 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">IBAN:</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                  {isTurkish ? "📋 Kopyala" : "📋 Copy"}
                </button>
              </div>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                TR13 0006 2000 4880 0006 6373 09
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <span className="text-sm font-medium text-yellow-800">
                💡 {isTurkish ? "Açıklama:" : "Description:"}
              </span>
              <p className="text-xs text-yellow-700 italic mt-1">
                {isTurkish ? '"Umay için hediye 👶"' : '"Gift for Umay 👶"'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            {isTurkish 
              ? "* Yasal Uyarı: Henüz vergi mükellefi değilim, doğunca konuşuruz 👶" 
              : "* Legal Notice: Not a taxpayer yet, we'll talk after birth 👶"}
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <div className="text-3xl">📱</div>
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {isTurkish ? "QR Kod ile Ödeme" : "QR Code Payment"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isTurkish ? "(Gen-Z yöntemi, çok modern! 🤳)" : "(Gen-Z method, so modern! 🤳)"}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <img 
                src="https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,width=1024,height=968/image/523380965/c5865a7f-bb6c-4ae5-8f50-edfdf205ebc7.jpg"
                alt="QR Code"
                className="w-full h-auto max-w-[250px] mx-auto"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              {isTurkish 
                ? "📸 Telefonunuzla tarayın ve ödeme yapın!" 
                : "📸 Scan with your phone and pay!"}
            </p>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 text-center">
          {isTurkish ? "📈 Başarı Metrikleri" : "📈 Success Metrics"}
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-xs text-gray-600">{isTurkish ? "Diş Sayısı" : "Teeth Count"}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-pink-600">∞</div>
            <div className="text-xs text-gray-600">{isTurkish ? "Sevimlilik" : "Cuteness"}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600">{isTurkish ? "Ağlama Desteği" : "Cry Support"}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-600">{isTurkish ? "Organik" : "Organic"}</div>
          </div>
        </div>
      </div>

      {/* Thank You Message with Humor */}
      <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl p-8 text-center border-4 border-dashed border-pink-300">
        <div className="text-5xl mb-4 animate-bounce">🍼</div>
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          {isTurkish ? "Teşekkürler, Büyük İnsan!" : "Thanks, Big Human!"}
        </h3>
        <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
          {isTurkish 
            ? "Doğduğumda ilk işim sana sarılmak olacak! (Tabii önce ağlayıp, süt içip, uyuyup, tekrar ağladıktan sonra... ama sonunda sarılacağım, söz!)" 
            : "When I'm born, my first job will be to hug you! (Well, after crying, drinking milk, sleeping, crying again... but eventually I'll hug you, promise!)"}
        </p>
        <div className="inline-block bg-white rounded-full px-6 py-3 shadow-lg">
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="animate-pulse">❤️</span>
            {isTurkish ? "Sevgiyle pişiyorum..." : "Cooking with love..."}
            <span className="animate-pulse">❤️</span>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}