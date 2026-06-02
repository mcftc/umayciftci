// Basit spam koruması: IP hız limiti, honeypot ve hafif küfür filtresi.
// Hız limiti bellek-içi (sıcak instance başına) — "basit" düzey için yeterli.

const hits = new Map<string, number[]>()

export function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

// limit: pencere içinde izin verilen istek sayısı. Aşılırsa false döner.
export function checkRate(bucket: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const arr = (hits.get(bucket) || []).filter((t) => now - t < windowMs)
  if (arr.length >= limit) {
    hits.set(bucket, arr)
    return false
  }
  arr.push(now)
  hits.set(bucket, arr)
  // Haritanın şişmesini önlemek için ara sıra temizle
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > windowMs)) hits.delete(k)
    }
  }
  return true
}

// Honeypot: gizli alan doldurulmuşsa bot kabul edilir.
export function isBot(body: Record<string, unknown>): boolean {
  const hp = body?.["website"]
  return typeof hp === "string" && hp.trim().length > 0
}

const BAD_WORDS = [
  // TR
  "amk", "aq", "orospu", "piç", "pic", "sik", "sikt", "siktir", "yarrak", "yarak",
  "göt", "got ver", "puşt", "pust", "kahpe", "ibne", "oç", "o.ç", "amcık", "amcik",
  "amına", "amina", "gavat", "kaltak", "pezevenk",
  // EN
  "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "bastard",
]

export function isProfane(text: string): boolean {
  const normalized = text.toLowerCase().replace(/[^a-zçğıöşü0-9\s]/gi, " ")
  const tokens = new Set(normalized.split(/\s+/).filter(Boolean))
  return BAD_WORDS.some((w) => {
    if (tokens.has(w)) return true // tam kelime eşleşmesi
    // uzun/karakteristik kelimeler için içerik eşleşmesi (ör. "siktir")
    return w.length >= 5 && normalized.includes(w)
  })
}
