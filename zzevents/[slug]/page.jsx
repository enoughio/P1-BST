"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Download, MapPin, Share2, Star, TicketIcon, Users } from "lucide-react"
import Link from "next/link"

// Mock function to get event details
const getEventDetails = (slug) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be fetched from the API in a real app
      const events = [
        {
          id: "1",
          title: "Bhopal International Storytelling Fest",
          slug: "BISF",
          description:
            "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
          longDescription: `
            <p>The Bhopal International Storytelling Fest (BISF) is a celebration of the art of storytelling from around the world. This premier event brings together master storytellers, emerging talents, and enthusiastic audiences for an unforgettable evening of narrative magic.</p>
            
            <p>This year's theme, "Stories Across Borders," emphasizes the universal power of storytelling to connect us across cultural, geographic, and generational divides. Our carefully curated lineup features traditional folk tales, personal narratives, and innovative storytelling formats that push the boundaries of the craft.</p>
            
            <p>Whether you're a seasoned storyteller or simply someone who appreciates the magic of a well-told tale, BISF offers something for everyone. Come be part of this unique celebration of one of humanity's oldest and most enduring art forms.</p>
          `,
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
          speakers: [
            {
              name: "Anita Desai",
              role: "International Storyteller",
              bio: "Award-winning storyteller with 20 years of experience performing across Asia and Europe",
              image: "",
            },
            {
              name: "Rajiv Sharma",
              role: "Folk Tale Specialist",
              bio: "Expert in Indian folk tales and their cultural significance",
              image: "",
            },
            {
              name: "Sarah Johnson",
              role: "Modern Narrative Expert",
              bio: "Pushing the boundaries of storytelling through digital media and interactive narratives",
              image: "",
            },
          ],
          schedule: [
            {
              time: "6:00 PM - 6:30 PM",
              title: "Welcome Reception",
              description: "Registration and refreshments",
            },
            {
              time: "6:30 PM - 7:30 PM",
              title: "Traditional Tales",
              description: "Folk stories from across India presented by our master storytellers",
            },
            {
              time: "7:30 PM - 8:00 PM",
              title: "Intermission",
              description: "Refreshments and networking",
            },
            {
              time: "8:00 PM - 9:00 PM",
              title: "Contemporary Narratives",
              description: "Modern storytelling formats and interactive experiences",
            },
          ],
          photos: [
            { url: "", alt: "Last year's storytelling session" },
            { url: "", alt: "Audience engagement" },
            { url: "", alt: "Award ceremony from previous edition" },
          ],
        },
        {
          id: "3",
          title: "Public Speaking Championship",
          slug: "speaking-championship-2024",
          description:
            "The annual competition where the best speakers compete for recognition and prizes. Categories include prepared speeches, impromptu speaking, and storytelling.",
          longDescription: `
            <p>The Public Speaking Championship is our prestigious annual competition that brings together the finest speakers from across the region. This thrilling event showcases extraordinary talent, inspiring speeches, and the art of effective communication at its best.</p>
            
            <p>Competition categories include:</p>
            <ul>
              <li><strong>Prepared Speeches:</strong> 5-7 minute speeches on topics of the speaker's choice</li>
              <li><strong>Impromptu Speaking:</strong> 2-3 minute speeches on topics provided just minutes before delivery</li>
              <li><strong>Storytelling:</strong> 6-8 minute original or adapted stories that captivate and inspire</li>
            </ul>
            
            <p>Participants will be judged by a panel of experienced Toastmasters and communication professionals. Winners in each category will receive recognition, prizes, and the opportunity to represent our district at the national level competition.</p>
            
            <p>Even if you're not competing, attending the championship provides a valuable opportunity to witness excellent speeches, learn from skilled communicators, and be inspired to improve your own speaking abilities.</p>
          `,
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
          speakers: [
            {
              name: "Vikram Mehta",
              role: "Chief Judge",
              bio: "Former National Public Speaking Champion and professional speaker",
              image: "",
            },
            {
              name: "Priya Desai",
              role: "Competition Chair",
              bio: "Certified Speaking Professional and coach with 15 years of experience",
              image: "",
            },
          ],
          schedule: [
            {
              time: "10:00 AM - 10:30 AM",
              title: "Opening Ceremony",
              description: "Welcome remarks and introduction of judges",
            },
            {
              time: "10:30 AM - 12:30 PM",
              title: "Prepared Speech Competition",
              description: "Contestants deliver speeches on chosen topics",
            },
            {
              time: "12:30 PM - 1:30 PM",
              title: "Lunch Break",
              description: "Networking opportunity",
            },
            {
              time: "1:30 PM - 3:30 PM",
              title: "Impromptu Speaking Competition",
              description: "Contestants respond to on-the-spot topics",
            },
            {
              time: "3:30 PM - 4:00 PM",
              title: "Break",
              description: "Refreshments",
            },
            {
              time: "4:00 PM - 5:30 PM",
              title: "Storytelling Competition",
              description: "Contestants share engaging stories",
            },
            {
              time: "5:30 PM - 6:00 PM",
              title: "Award Ceremony",
              description: "Recognition of winners and closing remarks",
            },
          ],
          photos: [
            { url: "", alt: "Previous championship winners" },
            { url: "", alt: "Contestant delivering speech" },
            { url: "", alt: "Judges panel" },
          ],
        },
      ]

      const event = events.find((e) => e.slug === slug) || null
      resolve(event)
    }, 1000)
  })
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isRSVPDialogOpen, setIsRSVPDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [ticketData, setTicketData] = useState(null)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await getEventDetails(params.slug)
        if (!data) {
          router.push("/events")
          return
        }
        setEvent(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching event details:", error)
        setLoading(false)
      }
    }

    fetchEventDetails()
  }, [params.slug, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate ticket data
      const ticketNumber = Math.floor(100000 + Math.random() * 900000)

      setTicketData({
        number: ticketNumber,
        name: formData.name,
        email: formData.email,
        eventTitle: event.title,
        eventDate: event.formattedDate,
        eventTime: event.time,
        eventLocation: event.location,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET${ticketNumber}`,
      })

      setIsSubmitting(false)
      setRegistrationSuccess(true)
    }, 1500)
  }

  const isEventUpcoming = (date) => {
    return new Date(date) >= new Date()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading event details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Event Not Found</h1>
            <p className="text-gray-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src={event.image || `/placeholder.svg?height=600&width=1600&text=${encodeURIComponent(event.title)}`}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-20">
          <div className="max-w-4xl">
            {event.highlighted && (
              <div className="mb-4">
                <span className="inline-flex items-center bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  <Star className="mr-1 h-3 w-3" />
                  Featured Event
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{event.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="text-lg">{event.formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-lg">{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-lg">
                  {event.attendees}/{event.maxCapacity} Registered
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setIsRSVPDialogOpen(true)}
                disabled={!isEventUpcoming(event.date) || event.attendees >= event.maxCapacity}
                className={
                  isEventUpcoming(event.date) && event.attendees < event.maxCapacity
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }
                size="lg"
              >
                {isEventUpcoming(event.date)
                  ? event.attendees >= event.maxCapacity
                    ? "Sold Out"
                    : "Register Now"
                  : "Event Ended"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to all events */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="text-gray-700 hover:text-blue-600">
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all events
          </Link>
        </Button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Left column - main content */}
          <div className="md:col-span-2 space-y-12">
            {/* About the event */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About this Event</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: event.longDescription }}
              ></div>
            </section>

            {/* Event schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Event Schedule</h2>
                <div className="space-y-6">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="w-32 shrink-0 font-medium text-gray-700">{item.time}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Speakers & Performers</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {event.speakers.map((speaker, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="h-16 w-16 shrink-0 rounded-full bg-gray-100 overflow-hidden">
                            <img
                              src={
                                speaker.image ||
                                `/placeholder.svg?height=64&width=64&text=${encodeURIComponent(speaker.name[0])}`
                              }
                              alt={speaker.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{speaker.name}</h3>
                            <p className="text-sm text-blue-600 mb-2">{speaker.role}</p>
                            <p className="text-sm text-gray-600">{speaker.bio}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Photo gallery */}
            {event.photos && event.photos.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Past Highlights</h2>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                  {event.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={photo.url || `/placeholder.svg?height=300&width=300&text=Photo+${index + 1}`}
                        alt={photo.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right column - event details */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Event Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date and Time</h4>
                    <p className="text-gray-900">{event.formattedDate}</p>
                    <p className="text-gray-900">{event.time}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                    <p className="text-gray-900">{event.location}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Organized by</h4>
                    <p className="text-gray-900">{event.clubName}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Registration</h4>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-900">{event.ticketPrice}</p>
                      <p className="text-sm text-gray-600">
                        {event.attendees}/{event.maxCapacity} Registered
                      </p>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={() => setIsRSVPDialogOpen(true)}
                      disabled={!isEventUpcoming(event.date) || event.attendees >= event.maxCapacity}
                      className={
                        isEventUpcoming(event.date) && event.attendees < event.maxCapacity
                          ? "w-full bg-blue-600 hover:bg-blue-700 text-white"
                          : "w-full bg-gray-400 text-white cursor-not-allowed"
                      }
                    >
                      <TicketIcon className="mr-2 h-4 w-4" />
                      {isEventUpcoming(event.date)
                        ? event.attendees >= event.maxCapacity
                          ? "Sold Out"
                          : "Register Now"
                        : "Event Ended"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* RSVP Dialog */}
      <Dialog open={isRSVPDialogOpen && !registrationSuccess} onOpenChange={setIsRSVPDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {event.title}</DialogTitle>
            <DialogDescription>Fill out the form below to register for this event.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="pt-2 text-sm text-gray-500">
                <p>Ticket Price: {event.ticketPrice}</p>
                <p>Available Seats: {event.maxCapacity - event.attendees}</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRSVPDialogOpen(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                {isSubmitting ? "Processing..." : "Complete Registration"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ticket Success Dialog */}
      <Dialog open={registrationSuccess} onOpenChange={setRegistrationSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>Your registration for {event.title} has been confirmed.</DialogDescription>
          </DialogHeader>
          {ticketData && (
            <div className="py-6">
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                  <img src={ticketData.qrCode || "/placeholder.svg"} alt="QR Code" className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">E-Ticket #{ticketData.number}</h3>
                <p className="text-gray-600 mb-4">{ticketData.name}</p>

                <div className="w-full border-t border-dashed border-gray-300 my-4"></div>

                <div className="text-left w-full space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Event:</span>
                    <span className="text-sm font-medium">{ticketData.eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date:</span>
                    <span className="text-sm font-medium">{ticketData.eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Time:</span>
                    <span className="text-sm font-medium">{ticketData.eventTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Venue:</span>
                    <span className="text-sm font-medium">{ticketData.eventLocation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setRegistrationSuccess(false)
                setIsRSVPDialogOpen(false)
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

