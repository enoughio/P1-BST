"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, MapPin, Search, Star } from "lucide-react"
import Link from "next/link"
import { bhopalStorytellersImg, BISF } from "@/lib/data/images"
import Image from "next/image"

// Placeholder for getting events from API
const getEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Bhopal International Storytelling Fest",
          slug: "BISF",
          description:
            "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
          date: "2025-3-23",
          formattedDate: "March 23, 2025",
          time: "6:00 PM - 9:00 PM",
          location: "Cultural Center, New Delhi",
          image: BISF,
          highlighted: true,
          club: "1",
          clubName: "Bhopal Storytellers",
          attendees: 120,
          maxCapacity: 200,
          ticketPrice: "₹500-1500",
          categories: ["Cultural", "Performance", "Educational"],
        },
        {
          id: "2",
          title: "Leadership Workshop",
          slug: "leadership-workshop-2023",
          description:
            "An intensive workshop focusing on essential leadership skills for today's professionals. Learn how to inspire teams and navigate challenges effectively.",
          date: "2023-11-20",
          formattedDate: "November 20, 2023",
          time: "9:00 AM - 5:00 PM",
          location: "Conference Hall, Bangalore",
          image: bhopalStorytellersImg,
          highlighted: false,
          club: "2",
          clubName: "Delhi Orators",
          attendees: 85,
          maxCapacity: 100,
          ticketPrice: "₹1000",
          categories: ["Workshop", "Professional Development", "Leadership"],
        },
        {
          id: "3",
          title: "Public Speaking Championship",
          slug: "speaking-championship-2024",
          description:
            "The annual competition where the best speakers compete for recognition and prizes. Categories include prepared speeches, impromptu speaking, and storytelling.",
          date: "2024-01-30",
          formattedDate: "January 30, 2024",
          time: "10:00 AM - 6:00 PM",
          location: "Auditorium, Mumbai",
          image: bhopalStorytellersImg,
          highlighted: true,
          club: "3",
          clubName: "Mumbai Speakers",
          attendees: 0,
          maxCapacity: 300,
          ticketPrice: "₹750",
          categories: ["Competition", "Speaking", "Awards"],
        },
        {
          id: "4",
          title: "Effective Communication Seminar",
          slug: "effective-communication-2023",
          description:
            "Learn practical techniques to enhance your communication skills in professional settings. This seminar covers verbal and non-verbal communication, active listening, and handling difficult conversations.",
          date: "2023-10-05",
          formattedDate: "October 5, 2023",
          time: "2:00 PM - 6:00 PM",
          location: "Business Center, Hyderabad",
          image: bhopalStorytellersImg,
          highlighted: false,
          club: "2",
          clubName: "Delhi Orators",
          attendees: 120,
          maxCapacity: 120,
          ticketPrice: "₹800",
          categories: ["Seminar", "Communication", "Professional Development"],
        },
        {
          id: "5",
          title: "Annual Storytelling Conference 2023",
          slug: "annual-conference-2023",
          description:
            "Join us for the annual Storytelling conference featuring keynote speakers, workshops, networking opportunities, and the grand finals of our speaking competitions.",
          date: "2023-09-15",
          formattedDate: "September 15, 2023",
          time: "9:00 AM - 8:00 PM",
          location: "Grand Hotel, Chennai",
          image: bhopalStorytellersImg,
          highlighted: true,
          club: "1",
          clubName: "Bhopal Storytellers",
          attendees: 250,
          maxCapacity: 300,
          ticketPrice: "₹1500-2500",
          categories: ["Conference", "Networking", "Competition"],
        },
      ])
    }, 0)
  })
}

export default function EventsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [events, setEvents] = useState([])
  const [highlightedEvents, setHighlightedEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
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

        // Parse url params if any
        const category = searchParams.get("category")
        const search = searchParams.get("search")

        if (search) {
          setSearchTerm(search)
        }

        if (category && category !== "all") {
          setActiveCategory(category)
        }

        setEvents(data)
        setHighlightedEvents(data.filter((event) => event.highlighted))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [searchParams])

  // Filter events based on search term and active category
  useEffect(() => {
    let filtered = [...events]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term) ||
          event.clubName.toLowerCase().includes(term) ||
          event.categories.some((cat) => cat.toLowerCase().includes(term)),
      )
    }

    // Apply category filter
    if (activeCategory !== "all") {
      if (activeCategory === "upcoming") {
        filtered = filtered.filter((event) => new Date(event.date) >= new Date())
      } else if (activeCategory === "past") {
        filtered = filtered.filter((event) => new Date(event.date) < new Date())
      } else {
        // Filter by specific category
        filtered = filtered.filter((event) =>
          event.categories.some((cat) => cat.toLowerCase() === activeCategory.toLowerCase()),
        )
      }
    }

    // Sort by date (upcoming first, then past)
    filtered.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      const now = new Date()

      // Both upcoming or both past
      if ((dateA >= now && dateB >= now) || (dateA < now && dateB < now)) {
        return dateA - dateB
      }

      // A is upcoming, B is past
      if (dateA >= now && dateB < now) {
        return -1
      }

      // A is past, B is upcoming
      return 1
    })

    setFilteredEvents(filtered)
  }, [events, searchTerm, activeCategory])

  // Extract all unique categories from events
  const allCategories = events.reduce((cats, event) => {
    event.categories.forEach((cat) => {
      if (!cats.includes(cat)) {
        cats.push(cat)
      }
    })
    return cats
  }, [])

  const nextSlide = () => {
    if (highlightedEvents.length <= 1) return

    setCurrentSlide((current) => (current === highlightedEvents.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    if (highlightedEvents.length <= 1) return

    setCurrentSlide((current) => (current === 0 ? highlightedEvents.length - 1 : current - 1))
  }

  const isEventUpcoming = (date) => {
    return new Date(date) >= new Date()
  }

  const totalEvents = events.length
  const upcomingCount = events.filter((event) => isEventUpcoming(event.date)).length
  const pastCount = totalEvents - upcomingCount
  const clubCount = new Set(events.map((event) => event.clubName)).size

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/events?search=${encodeURIComponent(searchTerm)}`)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    router.push(`/events?category=${encodeURIComponent(category)}`)
  }

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
              <div className="grid w-full max-w-md grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold font-serif">{totalEvents}</div>
                  <p className="text-[#6E5C4C]">Total events</p>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold font-serif">{upcomingCount}</div>
                  <p className="text-[#6E5C4C]">Upcoming gatherings</p>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold font-serif">{pastCount}</div>
                  <p className="text-[#6E5C4C]">Past highlights</p>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-semibold font-serif">{clubCount}</div>
                  <p className="text-[#6E5C4C]">Active clubs</p>
                </div>
              </div>
            </div>

            <div className="relative mt-12 overflow-hidden rounded-[32px] border border-white/70 bg-white/60 shadow-2xl">
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
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">All Events</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl font-serif">Find your next stage</h2>
          </div>
          <div className="text-sm text-[#6E5C4C]">
            {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"} match your filters.
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#E7DCCF] bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A6D4D]" />
                <Input
                  placeholder="Search by event, club, city, or category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full rounded-full border-[#E7DCCF] bg-white/90 pl-10 text-sm"
                />
              </div>
              <Button type="submit" className="h-11 rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]">
                Search
              </Button>
            </form>

            <div className="w-full overflow-x-auto">
              <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
                <TabsList className="flex w-max gap-2 bg-transparent p-0">
                  <TabsTrigger
                    value="all"
                    className="rounded-full border border-transparent bg-[#F5EEE6] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#6E5C4C] data-[state=active]:border-[#1F1B16] data-[state=active]:bg-white data-[state=active]:text-[#1F1B16]"
                  >
                    All Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="upcoming"
                    className="rounded-full border border-transparent bg-[#F5EEE6] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#6E5C4C] data-[state=active]:border-[#1F1B16] data-[state=active]:bg-white data-[state=active]:text-[#1F1B16]"
                  >
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger
                    value="past"
                    className="rounded-full border border-transparent bg-[#F5EEE6] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#6E5C4C] data-[state=active]:border-[#1F1B16] data-[state=active]:bg-white data-[state=active]:text-[#1F1B16]"
                  >
                    Past Events
                  </TabsTrigger>
                  {allCategories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category.toLowerCase()}
                      className="rounded-full border border-transparent bg-[#F5EEE6] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#6E5C4C] data-[state=active]:border-[#1F1B16] data-[state=active]:bg-white data-[state=active]:text-[#1F1B16]"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-[#E7DCCF] bg-white/70 p-10 text-center">
            <p className="text-[#6E5C4C]">No events found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
                router.push("/events")
              }}
              className="mt-6 rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {filteredEvents.some((event) => isEventUpcoming(event.date)) && (
              <section>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight font-serif">Upcoming Events</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Stay ahead</span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredEvents
                    .filter((event) => isEventUpcoming(event.date))
                    .map((event) => (
                      <Link key={event.id} href={`/events/${event.slug}`} className="group">
                        <Card className="h-full overflow-hidden rounded-3xl border border-[#EFE4D6] bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={
                                event.image ||
                                `/placeholder.svg?height=260&width=460&text=${encodeURIComponent(event.title)}`
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
                            <h4 className="text-lg font-semibold tracking-tight text-[#1F1B16] group-hover:text-[#5B3B1D]">
                              {event.title}
                            </h4>
                            <div className="mt-3 space-y-2 text-sm text-[#6E5C4C]">
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
                            <p className="mt-4 text-sm text-[#5B4E44] line-clamp-2">{event.description}</p>
                            <div className="mt-6 flex items-center justify-between text-sm">
                              <span className="text-[#6E5C4C]">{event.clubName}</span>
                              <span className="inline-flex items-center gap-2 font-medium text-[#1F1B16]">
                                View Details <ArrowUpRight className="h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                </div>
              </section>
            )}

            {filteredEvents.some((event) => !isEventUpcoming(event.date)) && (
              <section>
                <Separator className="my-8 bg-[#E7DCCF]" />
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight font-serif">Past Events</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Highlights</span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredEvents
                    .filter((event) => !isEventUpcoming(event.date))
                    .map((event) => (
                      <Link key={event.id} href={`/events/${event.slug}`} className="group">
                        <Card className="h-full overflow-hidden rounded-3xl border border-[#EFE4D6] bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={
                                event.image ||
                                `/placeholder.svg?height=260&width=460&text=${encodeURIComponent(event.title)}`
                              }
                              alt={event.title}
                              fill
                              className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                            <div className="absolute left-5 bottom-5 text-xs uppercase tracking-[0.3em] text-white/80">
                              Past Event
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="text-lg font-semibold tracking-tight text-[#1F1B16] group-hover:text-[#5B3B1D]">
                              {event.title}
                            </h4>
                            <div className="mt-3 space-y-2 text-sm text-[#6E5C4C]">
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
                            <p className="mt-4 text-sm text-[#5B4E44] line-clamp-2">{event.description}</p>
                            <div className="mt-6 text-sm text-[#6E5C4C]">{event.clubName}</div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

