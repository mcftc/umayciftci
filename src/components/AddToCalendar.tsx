"use client"
import { PARTY, PARTY_ISO } from "@/lib/party"

// Takvime ekle — Google Takvim linki + evrensel .ics indirme (iPhone/Android/Outlook).
const TITLE = "Umay’ın Doğum Günü Partisi 🎂"
const DURATION_MS = 2 * 60 * 60 * 1000 // 2 saat

function toICS(d: Date) {
  // YYYYMMDDTHHMMSSZ (UTC)
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")
}

const start = new Date(PARTY_ISO)
const end = new Date(start.getTime() + DURATION_MS)
const DESC = `Umay'ın doğum günü partisi · ${PARTY.date_tr} · Saat ${PARTY.time_tr}`

function googleUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${toICS(start)}/${toICS(end)}`,
    details: DESC,
    location: PARTY.venue,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//umayciftci//davetiye//TR",
    "BEGIN:VEVENT",
    `UID:umay-party-${start.getTime()}@umayciftci.com`,
    `DTSTAMP:${toICS(start)}`,
    `DTSTART:${toICS(start)}`,
    `DTEND:${toICS(end)}`,
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${DESC}`,
    `LOCATION:${PARTY.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "umay-dogum-gunu.ics"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

export default function AddToCalendar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <a
        href={googleUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-md ring-1 ring-blue-200 transition-transform hover:scale-105"
      >
        <span className="text-lg">📆</span> Google Takvim
      </a>
      <button
        onClick={downloadIcs}
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-purple-600 shadow-md ring-1 ring-purple-200 transition-transform hover:scale-105"
      >
        <span className="text-lg">🗓️</span> Takvime ekle (.ics)
      </button>
    </div>
  )
}
