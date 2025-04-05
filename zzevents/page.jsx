"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronLeft, ChevronRight, MapPin, Search, Star } from "lucide-react"
import Link from "next/link"

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
          date: "2023-12-15",
          formattedDate: "December 15, 2023",
          time: "6:00 PM - 9:00 PM",
          location: "Cultural Center, New Delhi",
          image: "",
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
          image: "",
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
          image: "",
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
          image: "",
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
          title: "Annual Toastmasters Conference 2023",
          slug: "annual-conference-2023",
          description:
            "Join us for the annual Toastmasters conference featuring keynote speakers, workshops, networking opportunities, and the grand finals of our speaking competitions.",
          date: "2023-09-15",
          formattedDate: "September 15, 2023",
          time: "9:00 AM - 8:00 PM",
          location: "Grand Hotel, Chennai",
          image: "",
          highlighted: true,
          club: "1",
          clubName: "Bhopal Storytellers",
          attendees: 250,
          maxCapacity: 300,
          ticketPrice: "₹1500-2500",
          categories: ["Conference", "Networking", "Competition"],
        },
      ])
    }, 1000)
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
    <div className="min-h-screen bg-white">
      {/* Hero section with auto-sliding carousel */}
      {highlightedEvents.length > 0 && (
        <div className="relative bg-gray-900 text-white overflow-hidden">
          <div
            ref={carouselRef}
            className="relative h-[70vh] transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="absolute inset-0 flex">
              {highlightedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="relative min-w-full h-full flex items-center"
                  style={{ left: `${index * 100}%` }}
                >
                  <div className="absolute inset-0 bg-black/60 z-10"></div>
                  <img
                    src={
                      event.image || `/placeholder.svg?height=700&width=1400&text=${encodeURIComponent(event.title)}`
                    }
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="container mx-auto px-4 md:px-8 relative z-20">
                    <div className="max-w-3xl">
                      <Badge className="bg-yellow-500 text-white mb-4">
                        <Star className="mr-1 h-3 w-3" />
                        Featured Event
                      </Badge>
                      <h1 className="text-3xl md:text-5xl font-bold mb-4">{event.title}</h1>
                      <p className="text-lg md:text-xl mb-6 text-gray-100">{event.description}</p>
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{event.formattedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href={`/events/${event.slug}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          {highlightedEvents.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-30"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-30"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                {highlightedEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Events</h2>

        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="md:w-96">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 border-gray-200"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </form>
          </div>

          <div className="flex-grow overflow-x-auto">
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
              <TabsList className="flex justify-start h-10 bg-transparent">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  All Events
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Past Events
                </TabsTrigger>
                {allCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category.toLowerCase()}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Events listing */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No events found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
                router.push("/events")
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Events Section */}
            {filteredEvents.some((event) => isEventUpcoming(event.date)) && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents
                    .filter((event) => isEventUpcoming(event.date))
                    .map((event) => (
                      <Link key={event.id} href={`/events/${event.slug}`} className="group">
                        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative aspect-video bg-gray-100">
                            <img
                              src={
                                event.image ||
                                `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`
                              }
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            {event.highlighted && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-yellow-500 text-white">
                                  <Star className="mr-1 h-3 w-3" />
                                  Featured
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600">
                              {event.title}
                            </h4>
                            <div className="flex flex-col gap-1 mb-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {event.formattedDate} • {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">{event.clubName}</div>
                              <div className="text-sm font-medium text-blue-600">View Details →</div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* Past Events Section */}
            {filteredEvents.some((event) => !isEventUpcoming(event.date)) && (
              <div>
                <Separator className="my-8" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Past Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents
                    .filter((event) => !isEventUpcoming(event.date))
                    .map((event) => (
                      <Link key={event.id} href={`/events/${event.slug}`} className="group">
                        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow opacity-90">
                          <div className="relative aspect-video bg-gray-100">
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold">
                              Past Event
                            </div>
                            <img
                              src={
                                event.image ||
                                `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`
                              }
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-600">
                              {event.title}
                            </h4>
                            <div className="flex flex-col gap-1 mb-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {event.formattedDate} • {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                            <div className="text-sm text-gray-500">{event.clubName}</div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

