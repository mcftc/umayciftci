import { list, put, del } from "@vercel/blob"

// Blob tabanlı basit kayıt deposu — her kayıt ayrı bir blob (yarış/çakışma yok).

export async function saveEntry(prefix: string, id: string, data: unknown) {
  await put(`${prefix}${id}.json`, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: true,
  })
}

// Bir prefix altındaki tüm kayıtları getirir. _url alanı silme için eklenir.
export async function listEntries<T>(prefix: string): Promise<Array<T & { _url: string }>> {
  const { blobs } = await list({ prefix })
  const items = await Promise.all(
    blobs.map(async (b) => {
      try {
        const res = await fetch(b.url, { cache: "no-store" })
        if (!res.ok) return null
        const data = (await res.json()) as T
        return { ...data, _url: b.url }
      } catch {
        return null
      }
    })
  )
  return items.filter((x) => x !== null) as Array<T & { _url: string }>
}

export async function deleteByUrl(url: string) {
  await del(url)
}
