"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Globe, 
  Loader2, 
  MapPin, 
  Star, 
  Trash, 
  Users, 
  User,
  LayoutList
} from "lucide-react"
import Link from "next/link"
import { getEvent, highlightEvent, deleteEvent } from "@/lib/api"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEvent(params.id)
        console.log("Event data:", eventData)

        toast({
          title: "Event Loaded",
          description: "Event details have been successfully loaded.",
        })

        setEvent(eventData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "There was a problem loading the event details.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  const handleDelete = async () => {
    setIsProcessing(true)

    try {
      await deleteEvent(event.event_id)
      setIsDeleteDialogOpen(false)
      router.push("/superadmin/events")

      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleToggleHighlight = async () => {
    setIsProcessing(true)

    try {
      await highlightEvent(event.event_id, !event.highlighted)

      setEvent({
        ...event,
        highlighted: !event.highlighted,
      })

      toast({
        title: event.highlighted ? "Event Unhighlighted" : "Event Highlighted",
        description: `The event has been ${event.highlighted ? "removed from" : "added to"} highlighted events.`,
      })
    } catch (error) {
      console.error("Error toggling highlight:", error)
      toast({
        title: "Error",
        description: "Failed to update event highlight status.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/superadmin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
    )
  }

  const formattedDate = formatDate(event.date)
  const organizationName = event.club_name || "Bharat Storytellers"
  const isPastEvent = new Date(event.date) < new Date()

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/superadmin/events">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.title}</h1>
              <div className="flex items-center text-gray-500">
                <span>{formattedDate}</span>
                <span className="mx-2">•</span>
                <span>{organizationName}</span>
                {event.highlighted && (
                  <>
                    <span className="mx-2">•</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button
              variant={event.highlighted ? "outline" : "default"}
              onClick={handleToggleHighlight}
              disabled={isProcessing}
              className={
                event.highlighted
                  ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }
            >
              <Star className="mr-2 h-4 w-4" />
              {event.highlighted ? "Remove Highlight" : "Highlight Event"}
            </Button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Event Details
            </button>
            <button
              onClick={() => setActiveTab('speakers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'speakers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Speakers
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'photos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Photos
            </button>
          </nav>
        </div>

        {/* Content area */}
        <div className="grid gap-6 md:grid-cols-3">
          {activeTab === 'details' && (
            <>
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>Information about this event</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={event.image || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(event.title)}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          Date
                        </div>
                        <p className="font-medium text-gray-900">{formattedDate}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          Time
                        </div>
                        <p className="font-medium text-gray-900">{event.time}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1 h-4 w-4" />
                          Location
                        </div>
                        <p className="font-medium text-gray-900">{event.location}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Globe className="mr-1 h-4 w-4" />
                          Organized by
                        </div>
                        <p className="font-medium text-gray-900">{organizationName}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {event.categories &&
                          event.categories.map((category, index) => (
                            <Badge key={index} variant="outline" className="border-gray-200 text-gray-700">
                              {category}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Attendance:</span>
                      <span className="font-medium">
                        {event.attendees}{event.max_capacity > 0 ? `/${event.max_capacity}` : " (Unlimited)"}
                      </span>
                    </div>

                    {event.max_capacity > 0 && (
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(event.attendees / event.max_capacity) * 100}%` }}
                        ></div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Ticket Price:</span>
                      <span className="font-medium">{event.ticket_price || "Free"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Status:</span>
                      <Badge
                        className={
                          isPastEvent ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
                        }
                      >
                        {isPastEvent ? "Past" : "Upcoming"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href={`/events/${event.event_id}`} target="_blank">
                        <Globe className="mr-2 h-4 w-4" />
                        View Public Page
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={handleToggleHighlight}
                      disabled={isProcessing}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      {event.highlighted ? "Remove Highlight" : "Highlight Event"}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Event ID:</span>
                      <span className="font-medium">{event.event_id}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Speakers:</span>
                      <span className="font-medium">{event.speakers?.length || 0}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Schedule Items:</span>
                      <span className="font-medium">{event.schedule?.length || 0}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Photos:</span>
                      <span className="font-medium">{event.photos?.length || 0}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'speakers' && (
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Speakers</CardTitle>
                  <CardDescription>Event presenters and performers</CardDescription>
                </CardHeader>
                <CardContent>
                  {event.speakers && event.speakers.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {event.speakers.map((speaker, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="aspect-[4/3] bg-gray-100">
                            <img 
                              src={speaker.image || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(speaker.name)}`}
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="pt-4">
                            <h3 className="text-lg font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-blue-600 mb-2">{speaker.role}</p>
                            <p className="text-sm text-gray-600">{speaker.bio}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <User className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No speakers</h3>
                      <p className="mt-1 text-sm text-gray-500">No speakers have been added to this event yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Event Schedule</CardTitle>
                  <CardDescription>Timeline for the event</CardDescription>
                </CardHeader>
                <CardContent>
                  {event.schedule && event.schedule.length > 0 ? (
                    <div className="space-y-8">
                      {event.schedule.map((item, index) => (
                        <div key={index} className="relative pl-8 pb-8">
                          {/* Timeline connector */}
                          {index < event.schedule.length - 1 && (
                            <div className="absolute left-3 top-3 -bottom-3 w-0.5 bg-gray-200"></div>
                          )}
                          {/* Dot marker */}
                          <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-blue-600 bg-white"></div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm font-medium text-blue-600">{item.time}</p>
                            <p className="mt-2 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <LayoutList className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No schedule</h3>
                      <p className="mt-1 text-sm text-gray-500">No schedule items have been added to this event yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Event Photos</CardTitle>
                  <CardDescription>Gallery from this or previous events</CardDescription>
                </CardHeader>
                <CardContent>
                  {event.photos && event.photos.length > 0 ? (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {event.photos.map((photo, index) => (
                        <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={photo.image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(photo.alt)}`}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="p-2 bg-gray-50 text-sm text-gray-600">{photo.alt}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Globe className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No photos</h3>
                      <p className="mt-1 text-sm text-gray-500">No photos have been added to this event yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{event.title}</p>
              <p className="text-sm text-gray-500">
                {formattedDate} • {event.time}
              </p>
              <p className="text-sm text-gray-500">{organizationName}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isProcessing}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Event"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}