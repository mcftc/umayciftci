"use client"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { PHOTOS } from "@/lib/photos"

type Props = { locale: string }

export default function PhotoGallery({ locale }: Props) {
  const tr = locale === "tr"
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  )
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, close, prev, next])

  return (
    <>
      <div className="columns-2 sm:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setOpen(i)}
            className="group mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-md ring-1 ring-pink-100 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <span className="relative block">
              <Image
                src={photo.src}
                width={photo.w}
                height={photo.h}
                alt={tr ? photo.alt.tr : photo.alt.en}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-[11px] font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-xs">
                {tr ? photo.caption.tr : photo.caption.en}
              </span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <button
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
            onClick={close}
            aria-label="Kapat"
          >
            ✕
          </button>
          <button
            className="absolute left-2 sm:left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Önceki"
          >
            ‹
          </button>
          <figure className="max-h-[88vh] max-w-[92vw] sm:max-w-[70vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={PHOTOS[open].src}
              width={PHOTOS[open].w}
              height={PHOTOS[open].h}
              alt={tr ? PHOTOS[open].alt.tr : PHOTOS[open].alt.en}
              className="mx-auto h-auto max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
              priority
            />
            <figcaption className="mt-3 text-center text-sm font-medium text-white/90">
              {tr ? PHOTOS[open].caption.tr : PHOTOS[open].caption.en}
              <span className="ml-2 text-white/50">{open + 1}/{PHOTOS.length}</span>
            </figcaption>
          </figure>
          <button
            className="absolute right-2 sm:right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Sonraki"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
