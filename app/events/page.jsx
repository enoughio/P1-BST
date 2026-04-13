"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { bhopalStorytellersImg } from "@/lib/data/images"
import Image from "next/image"

// Placeholder for getting events from API
const getEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // {
        //   id: "1",
        //   title: "Bhopal International Storytelling Fest",
        //   slug: "BISF",
        //   description:
        //     "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
        //   date: "2025-3-23",
        //   formattedDate: "March 23, 2025",
        //   time: "6:00 PM - 9:00 PM",
        //   location: "Cultural Center, New Delhi",
        //   image: BISF,
        //   highlighted: true,
        //   club: "1",
        //   clubName: "Bhopal Storytellers",
        //   attendees: 120,
        //   maxCapacity: 200,
        //   ticketPrice: "₹500-1500",
        //   categories: ["Cultural", "Performance", "Educational"],
        // },
        // {
        //   id: "2",
        //   title: "Leadership Workshop",
        //   slug: "leadership-workshop-2023",
        //   description:
        //     "An intensive workshop focusing on essential leadership skills for today's professionals. Learn how to inspire teams and navigate challenges effectively.",
        //   date: "2023-11-20",
        //   formattedDate: "November 20, 2023",
        //   time: "9:00 AM - 5:00 PM",
        //   location: "Conference Hall, Bangalore",
        //   image: bhopalStorytellersImg,
        //   highlighted: false,
        //   club: "2",
        //   clubName: "Delhi Orators",
        //   attendees: 85,
        //   maxCapacity: 100,
        //   ticketPrice: "₹1000",
        //   categories: ["Workshop", "Professional Development", "Leadership"],
        // },
        // {
        //   id: "3",
        //   title: "Public Speaking Championship",
        //   slug: "speaking-championship-2024",
        //   description:
        //     "The annual competition where the best speakers compete for recognition and prizes. Categories include prepared speeches, impromptu speaking, and storytelling.",
        //   date: "2024-01-30",
        //   formattedDate: "January 30, 2024",
        //   time: "10:00 AM - 6:00 PM",
        //   location: "Auditorium, Mumbai",
        //   image: bhopalStorytellersImg,
        //   highlighted: true,
        //   club: "3",
        //   clubName: "Mumbai Speakers",
        //   attendees: 0,
        //   maxCapacity: 300,
        //   ticketPrice: "₹750",
        //   categories: ["Competition", "Speaking", "Awards"],
        // },
        // {
        //   id: "4",
        //   title: "Effective Communication Seminar",
        //   slug: "effective-communication-2023",
        //   description:
        //     "Learn practical techniques to enhance your communication skills in professional settings. This seminar covers verbal and non-verbal communication, active listening, and handling difficult conversations.",
        //   date: "2023-10-05",
        //   formattedDate: "October 5, 2023",
        //   time: "2:00 PM - 6:00 PM",
        //   location: "Business Center, Hyderabad",
        //   image: bhopalStorytellersImg,
        //   highlighted: false,
        //   club: "2",
        //   clubName: "Delhi Orators",
        //   attendees: 120,
        //   maxCapacity: 120,
        //   ticketPrice: "₹800",
        //   categories: ["Seminar", "Communication", "Professional Development"],
        // },
        // {
        //   id: "5",
        //   title: "Annual Storytelling Conference 2023",
        //   slug: "annual-conference-2023",
        //   description:
        //     "Join us for the annual Storytelling conference featuring keynote speakers, workshops, networking opportunities, and the grand finals of our speaking competitions.",
        //   date: "2023-09-15",
        //   formattedDate: "September 15, 2023",
        //   time: "9:00 AM - 8:00 PM",
        //   location: "Grand Hotel, Chennai",
        //   image: bhopalStorytellersImg,
        //   highlighted: true,
        //   club: "1",
        //   clubName: "Bhopal Storytellers",
        //   attendees: 250,
        //   maxCapacity: 300,
        //   ticketPrice: "₹1500-2500",
        //   categories: ["Conference", "Networking", "Competition"],
        // },
        // {
        //   id: "bhopal-storytelling-championship-2026",
        //   title: "Bhopal Storytelling Championship - 2026",
        //   slug: "bhopal-storytelling-championship-2026",
        //   description:
        //     "The Search for the City's Best Young Storyteller. A four-phase mentorship championship for 1,000+ students, culminating in a grand finale in Bhopal.",
        //   partner: "Indian Society for Training and Development (ISTD)",
        //   date: "2026-04-26",
        //   formattedDate: "April 26, 2026",
        //   time: "All day",
        //   location: "Bhopal, Madhya Pradesh",
        //   image: bhopalStorytellersImg,
        //   highlighted: true,
        //   club: "bhopal-storytellers-foundation",
        //   clubName: "Bharat Storytellers Foundation",
        //   attendees: 0,
        //   maxCapacity: 1000,
        //   ticketPrice: "₹350",
        //   categories: ["Championship", "Youth", "Storytelling", "Mentorship"],
        // },
      ])
    }, 0)
  })
}

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [highlightedEvents, setHighlightedEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef(null)

  // Set up autoplay for carousel
  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }

    const interval = setInterval(play, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents()
        setEvents(data)
        setHighlightedEvents(data.filter((event) => event.highlighted))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const nextSlide = () => {
    if (highlightedEvents.length <= 1) return

    setCurrentSlide((current) => (current === highlightedEvents.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    if (highlightedEvents.length <= 1) return

    setCurrentSlide((current) => (current === 0 ? highlightedEvents.length - 1 : current - 1))
  }

  const totalEvents = events.length
  const clubCount = new Set(events.map((event) => event.clubName)).size

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#1F1B16]">
      {highlightedEvents.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#E8D8C6] blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#F3E7D8] blur-3xl opacity-80" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 py-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Bharat Storytellers</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl font-serif">
                  Events designed to move an audience
                </h1>
                <p className="mt-4 text-base text-[#5B4E44] sm:text-lg">
                  Discover workshops, festivals, and competitions crafted by leading storyteller clubs across India.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]">
                    <Link href="/events?category=upcoming">Browse Upcoming</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-[#1F1B16] text-[#1F1B16]">
                    <Link href="/events">View All Events</Link>
                  </Button>
                </div>
              </div>
              <div className="grid w-full max-w-sm grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold font-serif">{totalEvents}</div>
                  <p className="text-[#6E5C4C]">Total events</p>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold font-serif">{clubCount}</div>
                  <p className="text-[#6E5C4C]">Active clubs</p>
                </div>
              </div>
            </div>

            {/* <div className="relative mt-12 overflow-hidden rounded-[32px] border border-white/70 bg-white/60 shadow-2xl">
              <div
                ref={carouselRef}
                className="relative h-[60vh] min-h-[420px] transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="absolute inset-0 flex">
                  {highlightedEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="relative min-w-full h-full flex items-center"
                      style={{ left: `${index * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1F1B16]/80 via-[#1F1B16]/40 to-transparent z-10" />
                      <Image
                        src={
                          event.image || `/placeholder.svg?height=700&width=1400&text=${encodeURIComponent(event.title)}`
                        }
                        width={1400}
                        height={700}
                        alt={event.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        priority={index === 0}
                      />
                      <div className="container mx-auto px-6 relative z-20">
                        <div className="max-w-2xl text-white">
                          <Badge className="mb-4 rounded-full bg-[#F3C969] text-[#1F1B16]">
                            <Star className="mr-1 h-3 w-3" />
                            Featured Event
                          </Badge>
                          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl font-serif">
                            {event.title}
                          </h2>
                          <p className="mt-4 text-base text-white/85 sm:text-lg">{event.description}</p>
                          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                              <Calendar className="h-4 w-4" />
                              <span>{event.formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center gap-4">
                            <Button asChild className="rounded-full bg-white text-[#1F1B16] hover:bg-white/90">
                              <Link href={`/events/${event.slug}`}>View Details</Link>
                            </Button>
                            <div className="text-sm text-white/70">Hosted by {event.clubName}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {highlightedEvents.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-[#1F1B16] shadow hover:bg-white"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-[#1F1B16] shadow hover:bg-white"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {highlightedEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-8 rounded-full transition-all ${
                          currentSlide === index ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div> */}

            
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-14 pb-[30vh]  ">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">All Events</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl font-serif">Find your next stage</h2>
          </div>
          <div className="text-sm text-[#6E5C4C]">
            {events.length} event{events.length === 1 ? "" : "s"} available.
          </div>
        </div>

        {events.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-[#E7DCCF] bg-white/70 p-10 text-center">
            <p className="text-[#6E5C4C]">No events available right now.</p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                <Card className="overflow-hidden rounded-3xl border border-[#EFE4D6] bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                    <div className="relative h-56 md:h-full">
                      <Image
                        src={
                          event.image || `/placeholder.svg?height=260&width=460&text=${encodeURIComponent(event.title)}`
                        }
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute left-5 bottom-5 flex flex-wrap gap-2">
                        {event.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="rounded-full bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#1F1B16]"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      {event.highlighted && (
                        <div className="absolute top-4 right-4">
                          <Badge className="rounded-full bg-[#F3C969] text-[#1F1B16]">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#8A6D4D]">
                        <span>{event.clubName}</span>
                        <span className="h-1 w-1 rounded-full bg-[#D9C7B4]" />
                        <span>{event.ticketPrice}</span>
                      </div>
                      {event.partner && (
                        <div className="mt-2 text-sm text-[#6E5C4C]">
                          <span className="font-medium text-[#5B4E44]">Partner:</span> {event.partner}
                        </div>
                      )}
                      <h4 className="mt-3 text-2xl font-semibold tracking-tight text-[#1F1B16] group-hover:text-[#5B3B1D]">
                        {event.title}
                      </h4>
                      <p className="mt-3 text-sm text-[#5B4E44] line-clamp-3">{event.description}</p>
                      <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#6E5C4C]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {event.formattedDate} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1F1B16]">
                        View Details <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

