
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventCard from "@/components/ui/event/event-card"
import EventCarousel from "@/components/ui/event/event-carousel" 
import { categorizeEvents, getHighlightedEvents } from "@/lib/utils"
import { events } from "@/lib/data/data"

export default function HomePage() {
  // Get highlighted events for the carousel
  const highlightedEvents = getHighlightedEvents(events)

  // Categorize events based on dates
  const { past, upcoming } = categorizeEvents(events)

  // Get the latest event for the hero section
  const latestEvent = upcoming.length > 0 ? upcoming[0] : past[0]

  return (
    <main className="min-h-screen mx-auto ">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 ">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Latest / Recent
                  <br />
                  or Upcoming
                  <br />
                  Event
                </h1>
              </div>
              <p className="text-muted-foreground">{latestEvent.description}</p>
              <Button asChild className="mt-4">
                <Link href={`/events/${latestEvent.id}`}>
                  GET TICKET <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Ticket</h2>
                  <h3 className="text-3xl font-bold mb-4">{latestEvent.title}</h3>
                  <p className="text-sm">
                    {latestEvent.formattedDate} • {latestEvent.time} • {latestEvent.location}
                  </p>
                </div>
                <div className="absolute right-0 top-0 h-full">
                  <div className="h-full flex items-center">
                    <Image
                      src="/placeholder.svg?height=260&width=100&text=Barcode"
                      alt="Barcode"
                      width={100}
                      height={260}
                      className="h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Carousel */}
      <section className="w-full py-8 md:py-12 bg-muted/50 relative ">
        <div className="container px-4 md:px-6  mx-auto">
          <EventCarousel events={highlightedEvents} />
        </div>
      </section>

      {/* Event Tabs */}
      <section className="w-full py-8 md:py-12 ">
        <div className="container px-4 md:px-6  mx-auto">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-3 rounded-full bg-slate-200  ">
              <TabsTrigger value="past" className="rounded-full border-2 bg-blue-100 ">
                Past
              </TabsTrigger>
              {/* <TabsTrigger value="present" className="rounded-full">
                Present
              </TabsTrigger> */}
              <TabsTrigger value="upcoming" className="rounded-full border-2 bg-blue-100 ">
                Upcoming
              </TabsTrigger>
            </TabsList>
            <TabsContent value="past" className="mt-6">
              {past.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((event) => (
                    <EventCard
                      key={event.id}
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      href={`/events/${event.id}`}
                      date={event.formattedDate}
                      location={event.location}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No past events available</p>
                </div>
              )}
            </TabsContent>
            
            {/* <TabsContent value="present" className="mt-6">
              {present.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {present.map((event) => (
                    <EventCard
                      key={event.id}
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      href={`/events/${event.id}`}
                      date={event.formattedDate}
                      location={event.location}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No current events available</p>
                </div>
              )}
            </TabsContent> */}

            <TabsContent value="upcoming" className="mt-6">
              {upcoming.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((event) => (
                    <EventCard
                      key={event.id}
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      href={`/events/${event.id}`}
                      date={event.formattedDate}
                      location={event.location}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming events available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}

