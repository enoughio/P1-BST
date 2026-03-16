"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function EventAnnouncementBar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const eventUrl = "/events/bhopal-storytelling-championship-2026"

  if (!isVisible || pathname !== "/") {
    return null
  }

  return (
    <Link href={eventUrl} className="block bg-[#F3E7D8] text-[#1F1B16]">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm sm:text-base">
          <span className="font-semibold">Bhopal Storytelling Championship 2026</span> — The search for the city's best
          young storyteller. Registrations open now.
          <span className="ml-3 inline-flex items-center rounded-full bg-[#1F1B16] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            View details
          </span>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setIsVisible(false)
          }}
          aria-label="Dismiss announcement"
          className="self-start text-xs text-[#8A6D4D] underline underline-offset-4 hover:text-[#1F1B16] sm:self-auto"
        >
          Close
        </button>
      </div>
    </Link>
  )
}
