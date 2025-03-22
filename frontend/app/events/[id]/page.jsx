import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Share2 } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getEventById } from "@/lib/data/data" 

export default async function EventPage({ params }) {
  const {id} = await params
  const event = getEventById(id)
  

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container px-4 md:px-6 py-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{event.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Style Content */}
      <section className="container px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-6">
                <div className="prose prose-lg max-w-none">
                  <div className="bg-muted p-6 rounded-lg mb-8">
                    <p className="text-xl font-serif italic">{event.description}</p>
                  </div>

                  {event.content.map((item, index) => {
                    if (item.type === "heading") {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                          {item.content}
                        </h2>
                      )
                    }
                    if (item.type === "paragraph") {
                      return (
                        <p key={index} className="mb-4">
                          {item.content}
                        </p>
                      )
                    }
                    if (item.type === "image") {
                      return (
                        <div key={index} className="my-8">
                          <Image
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt || ""}
                            width={800}
                            height={400}
                            className="rounded-lg w-full"
                          />
                        </div>
                      )
                    }
                    if (item.type === "quote") {
                      return (
                        <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6">
                          <p className="text-xl">{item.content}</p>
                          {item.author && <cite className="block text-right mt-2">— {item.author}</cite>}
                        </blockquote>
                      )
                    }
                    if (item.type === "list" && item.items) {
                      return (
                        <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                          {item.items.map((listItem, i) => (
                            <li key={i}>{listItem}</li>
                          ))}
                        </ul>
                      )
                    }
                    return null
                  })}
                </div>
              </TabsContent>
              <TabsContent value="speakers" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.id} className="flex gap-4 items-start">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{speaker.name}</h3>
                        {speaker.role && <p className="text-sm text-primary">{speaker.role}</p>}
                        <p className="text-muted-foreground mt-1">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="schedule" className="mt-6">
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-lg font-bold">Registration</h3>
                    <p className="text-muted-foreground">30 minutes before event start - Check-in and welcome kit</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-lg font-bold">Welcome & Introduction</h3>
                    <p className="text-muted-foreground">Opening remarks and overview of the event</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-lg font-bold">Main Program</h3>
                    <p className="text-muted-foreground">Featured presentations and performances</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-lg font-bold">Intermission</h3>
                    <p className="text-muted-foreground">Refreshments and networking</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-lg font-bold">Q&A Session</h3>
                    <p className="text-muted-foreground">Interactive discussion with speakers</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-lg font-bold">Closing</h3>
                    <p className="text-muted-foreground">Final remarks and farewell</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Share This Event</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                {/* Add more social sharing buttons as needed */}
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">RSVP for this Event</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Secure your spot at this exclusive event. Limited seats available!
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Capacity:</span>
                <span className="text-sm">
                  {event.attendees || 0} / {event.maxCapacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${event.attendees && event.maxCapacity ? (event.attendees / event.maxCapacity) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Price:</span>
                <span className="text-sm">{event.ticketPrice || "Free"}</span>
              </div>
              <Button asChild className="w-full">
                <Link href={`/events/${id}/rsvp`}>Register Now</Link>
              </Button>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Event Location</h3>
              <div className="aspect-video bg-muted-foreground/20 rounded-lg mb-2 relative overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Map"
                  alt="Event location map"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium">{event.location}</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Get Directions
              </Button>
            </div>

            {event.categories && event.categories.length > 0 && (
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((category, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

