// Umay foto kataloğu. public/photos/ içindeki optimize webp'ler.
// caption: tr/en kısa, sevimli açıklamalar.

export type Photo = {
  src: string
  w: number
  h: number
  alt: { tr: string; en: string }
  caption: { tr: string; en: string }
}

export const PHOTOS: Photo[] = [
  {
    src: "/photos/umay-01.webp", w: 1050, h: 1400,
    alt: { tr: "Umay kırmızı şapkayla", en: "Umay in a red hat" },
    caption: { tr: "Kırmızı şapkalı şıklık 🎀", en: "Red-hat fancy look 🎀" },
  },
  {
    src: "/photos/umay-02.webp", w: 647, h: 1400,
    alt: { tr: "Umay denizci elbisesiyle gülüyor", en: "Umay laughing in a sailor dress" },
    caption: { tr: "Denizci kız kahkahası ⚓😄", en: "Sailor-girl giggles ⚓😄" },
  },
  {
    src: "/photos/umay-03.webp", w: 1050, h: 1400,
    alt: { tr: "Umay ayıcığıyla koltukta", en: "Umay on the sofa with her teddy" },
    caption: { tr: "Ayıcıkla derin düşünceler 🧸", en: "Deep thoughts with teddy 🧸" },
  },
  {
    src: "/photos/umay-04.webp", w: 788, h: 1400,
    alt: { tr: "Umay top havuzunda", en: "Umay in the ball pit" },
    caption: { tr: "Top havuzu = en sevdiğim ofis 🔴🟡🟢", en: "Ball pit = my favorite office 🔴🟡🟢" },
  },
  {
    src: "/photos/umay-05.webp", w: 933, h: 1400,
    alt: { tr: "Umay sarı tulumla oyun matında", en: "Umay in a yellow onesie on the play mat" },
    caption: { tr: "Sarı tulum, neşe dolu 💛", en: "Yellow onesie, full of joy 💛" },
  },
  {
    src: "/photos/umay-06.webp", w: 1050, h: 1400,
    alt: { tr: "Umay kalpli kazakla, kocaman gözler", en: "Umay in a heart sweater, big eyes" },
    caption: { tr: "O kocaman mavi gözler 💙", en: "Those big blue eyes 💙" },
  },
  {
    src: "/photos/umay-07.webp", w: 788, h: 1400,
    alt: { tr: "Umay oyuncaklarıyla", en: "Umay with her toys" },
    caption: { tr: "Oyun zamanı, iş başında 🧩", en: "Playtime, hard at work 🧩" },
  },
  {
    src: "/photos/umay-08.webp", w: 1400, h: 1050,
    alt: { tr: "Umay uzanmış dinleniyor", en: "Umay resting" },
    caption: { tr: "Mola: kısa şarj 🔋", en: "Break time: quick recharge 🔋" },
  },
  {
    src: "/photos/umay-09.webp", w: 647, h: 1400,
    alt: { tr: "Umay kahkaha atıyor", en: "Umay bursting into laughter" },
    caption: { tr: "Kahkaha modu açık 😆", en: "Laughter mode: ON 😆" },
  },
  {
    src: "/photos/umay-10.webp", w: 1050, h: 1400,
    alt: { tr: "Umay pembe kıyafetle", en: "Umay in pink" },
    caption: { tr: "Pembeler içinde minik prenses 👑", en: "Tiny princess in pink 👑" },
  },
]

// Hero için en ikonik kare
export const HERO_PHOTO = PHOTOS[0]
