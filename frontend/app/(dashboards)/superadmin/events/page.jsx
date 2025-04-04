"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { getEvents, getClubs, highlightEvent } from "@/lib/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronDown, Filter, MapPin, MoreHorizontal, Search, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [clubs, setClubs] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClub, setSelectedClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getEvents()
        const clubsData = await getClubs()

        setEvents(eventsData)
        setFilteredEvents(eventsData)
        setClubs(clubsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedClub, events])

  const applyFilters = () => {
    let filtered = [...events]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term),
      )
    }

    // Apply club filter
    if (selectedClub) {
      filtered = filtered.filter((event) => event.club === selectedClub)
    }

    setFilteredEvents(filtered)
  }

  const getClubName = (clubId) => {
    const club = clubs.find((c) => c.id === clubId)
    return club ? club.name : clubId
  }

  const handleToggleHighlight = async (event) => {
    try {
      await highlightEvent(event.id, !event.highlighted)

      // Update local state
      const updatedEvents = events.map((e) => (e.id === event.id ? { ...e, highlighted: !e.highlighted } : e))

      setEvents(updatedEvents)

      toast({
        title: event.highlighted ? "Event Unhighlighted" : "Event Highlighted",
        description: `"${event.title}" has been ${event.highlighted ? "removed from" : "added to"} highlighted events.`,
      })
    } catch (error) {
      console.error("Error toggling event highlight:", error)
      toast({
        title: "Error",
        description: "Failed to update event highlight status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isUpcoming = (date) => {
    return new Date(date) > new Date()
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Events</h1>
            <p className="text-muted-foreground">Manage events across all clubs in the organization.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>

            <div className="w-full sm:w-64">
              <Select value={selectedClub || ""} onValueChange={(value) => setSelectedClub(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilteredEvents(events)}>All Events</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilteredEvents(events.filter((e) => isUpcoming(e.date)))}>
                    Upcoming Events
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilteredEvents(events.filter((e) => e.highlighted))}>
                    Highlighted Events
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="grid" className="space-y-4">
            <TabsList className="ml-auto">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader className="h-40 bg-muted/40"></CardHeader>
                      <CardContent className="h-24 mt-4 space-y-2">
                        <div className="h-4 bg-muted/60 rounded w-1/2"></div>
                        <div className="h-4 bg-muted/60 rounded w-full"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">No events found.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="flex flex-col overflow-hidden">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={
                              event.image ||
                              `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`
                            }
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {event.highlighted && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-yellow-500">
                              <Star className="mr-1 h-3 w-3" />
                              Highlighted
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4" />
                          {event.formattedDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="outline">{getClubName(event.club)}</Badge>
                          {event.categories &&
                            event.categories.slice(0, 2).map((category, i) => (
                              <Badge variant="outline" key={i}>
                                {category}
                              </Badge>
                            ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 mt-auto">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span className="truncate max-w-[120px]">{event.location}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/events/${event.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleHighlight(event)}>
                              {event.highlighted ? <>Remove Highlight</> : <>Highlight Event</>}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="grid grid-cols-6 font-medium">
                        <div>Event</div>
                        <div>Date & Time</div>
                        <div>Location</div>
                        <div>Club</div>
                        <div>Attendees</div>
                        <div>Actions</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {filteredEvents.map((event) => (
                        <div key={event.id} className="grid grid-cols-6 p-4">
                          <div className="font-medium flex items-center">
                            {event.highlighted && <Star className="mr-1 h-4 w-4 text-yellow-500" />}
                            {event.title}
                          </div>
                          <div>
                            {event.formattedDate}, {event.time}
                          </div>
                          <div>{event.location}</div>
                          <div>{getClubName(event.club)}</div>
                          <div>
                            {event.attendees}/{event.maxCapacity}
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/superadmin/events/${event.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleHighlight(event)}>
                                  {event.highlighted ? <>Remove Highlight</> : <>Highlight Event</>}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}

