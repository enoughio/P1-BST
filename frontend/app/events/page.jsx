"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  MapPin, 
  Search, 
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink 
} from "lucide-react"
import Link from "next/link"
import { bhopalStorytellersImg, BISF } from "@/lib/data/images"

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
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("asc")
  const [expandedEventId, setExpandedEventId] = useState(null)

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

    // Sort events
    filtered.sort((a, b) => {
      let comparison = 0
      
      if (sortField === "date") {
        comparison = new Date(a.date) - new Date(b.date)
      } else if (sortField === "title") {
        comparison = a.title.localeCompare(b.title)
      } else if (sortField === "clubName") {
        comparison = a.clubName.localeCompare(b.clubName)
      } else if (sortField === "location") {
        comparison = a.location.localeCompare(b.location)
      }
      
      return sortDirection === "asc" ? comparison : -comparison
    })

    setFilteredEvents(filtered)
  }, [events, searchTerm, activeCategory, sortField, sortDirection])

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const toggleEventDetails = (eventId) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(eventId)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
            <p className="mt-4 text-gray-500">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
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
              <Button type="submit" className="bg-slate-600 hover:bg-slate-800 text-white">
                Search
              </Button>
            </form>
          </div>

          <div className="flex-grow overflow-x-auto">
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
              <TabsList className="flex justify-start h-10 bg-transparent">
                <TabsTrigger value="all" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
                  All Events
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-gray-600 data-[state=active]:text-white"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-slate-600 400 data-[state=active]:text-white">
                  Past Events
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Events listing as a table */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No events found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
                router.push("/events")
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th 
                    className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center">
                      Event Name
                      {sortField === "title" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === "date" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 hidden lg:table-cell"
                    onClick={() => handleSort("clubName")}
                  >
                    <div className="flex items-center">
                      Organizer
                      {sortField === "clubName" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  {/* <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th> */}
                </tr>
              </thead>

              <tbody>
                {filteredEvents.map((event) => (
                  <>
                  {/* <Link href={`/events/${event.slug}`}> */}
                    <tr 
                      key={event.id} onClick={() => router.push(`/events/${event.slug}`)}
                      className={`border-b hover:bg-gray-50 cursor-pointer ${!isEventUpcoming(event.date) ? 'opacity-75' : ''}`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">

                          <div className="font-medium">{event.title}</div>
                          {event.highlighted && (
                            <Badge className="bg-yellow-500 text-white h-6">
                              <Star className=" h-2 w-2" />
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{event.formattedDate}</span>
                        </div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-gray-800">{event.clubName}</span>
                      </td>
                      {/* <td className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleEventDetails(event.id)}
                            className="text-gray-600 hover:text-gray-800 border-gray-600"
                          >
                            {expandedEventId === event.id ? "Hide" : "Details"}
                          </Button>
                          <Link href={`/events/${event.slug}`}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-gray-800 hover:text-gray-600 border-gray-800"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </td> */}
                    </tr>
                    {expandedEventId === event.id && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="px-6 py-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-md shrink-0">
                              <img
                                src={event.image || `/placeholder.svg?text=${encodeURIComponent(event.title)}`}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-gray-700 mb-2">{event.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {event.categories.map((category, index) => (
                                  <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-6 mt-3 text-sm">
                                <div>
                                  <span className="font-medium">Price:</span> {event.ticketPrice}
                                </div>
                                <div>
                                  <span className="font-medium">Capacity:</span> {event.attendees}/{event.maxCapacity}
                                </div>
                                <div>
                                  <span className="font-medium">Status:</span>{" "}
                                  {isEventUpcoming(event.date) ? (
                                    <span className="text-green-600">Upcoming</span>
                                  ) : (
                                    <span className="text-gray-500">Past</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                {/* </Link> */}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}