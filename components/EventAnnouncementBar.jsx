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
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
        <div className="text-sm sm:text-base">
          <span className="font-semibold">Bhopal Storytelling Championship 2026</span>
          <span className="hidden sm:inline">
            {" "}
            — The search for the city's best young storyteller. Registrations open now.
          </span>
          <span className="ml-3 inline-flex items-center rounded-full bg-[#1F1B16] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            View<span className="hidden sm:inline-block">_details</span>
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
          className="self-start inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#1F1B16]/10 text-xs font-semibold text-[#8A6D4D] hover:bg-[#1F1B16] hover:text-white sm:self-auto"
        >
          X
        </button>
      </div>
    </Link>
  )
}
