import type { MetadataRoute } from "next"

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/tr`, priority: 1 },
    { url: `${base}/en`, priority: 0.9 },
    { url: `${base}/donate/umay` },
    { url: `${base}/donate/haytap` },
    { url: `${base}/legal` }
  ]
}