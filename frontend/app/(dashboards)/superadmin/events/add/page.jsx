"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { 
  ArrowLeft, 
  Calendar, 
  Loader2, 
  Plus, 
  Star, 
  Trash, 
  Upload
} from "lucide-react"
import Link from "next/link"
import { getClubs, createEvent } from "@/lib/api"

export default function AddEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    date: "",
    time: "",
    location: "",
    club: "",
    maxCapacity: "100",
    ticketPrice: "",
    categories: [],
    highlighted: false,
    eventImage: null, // Main event image
  })

  // Separate states for complex nested data with file uploads
  const [speakers, setSpeakers] = useState([
    { name: "", role: "", bio: "", image: null, imagePreview: null }
  ])
  
  const [schedule, setSchedule] = useState([
    { time: "", title: "", description: "" }
  ])
  
  const [photos, setPhotos] = useState([
    { image: null, imagePreview: null, alt: "" }
  ])

  // Preview states
  const [eventImagePreview, setEventImagePreview] = useState(null)

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await getClubs()
        setClubs(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching clubs:", error)
        setLoading(false)
      }
    }

    fetchClubs()
  }, [])

  // Form field handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSlugGeneration = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")

      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleCategoryChange = (e) => {
    const { value } = e.target
    // Split by commas and trim whitespace
    const categories = value
      .split(",")
      .map((cat) => cat.trim())
      .filter(Boolean)

    setFormData((prev) => ({ ...prev, categories }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // File upload handlers
  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      setFormData((prev) => ({ 
        ...prev, 
        [name]: file 
      }))
      
      // Create URL preview
      const previewUrl = URL.createObjectURL(file)
      setEventImagePreview(previewUrl)
    }
  }

  // Handle speaker changes
  const handleSpeakerChange = (index, field, value) => {
    const updatedSpeakers = [...speakers]
    updatedSpeakers[index] = { ...updatedSpeakers[index], [field]: value }
    setSpeakers(updatedSpeakers)
  }

  const handleSpeakerImageChange = (index, e) => {
    const file = e.target.files[0]
    if (!file) return

    const updatedSpeakers = [...speakers]
    updatedSpeakers[index] = { 
      ...updatedSpeakers[index], 
      image: file,
      imagePreview: URL.createObjectURL(file)
    }
    setSpeakers(updatedSpeakers)
  }

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", role: "", bio: "", image: null, imagePreview: null }])
  }

  const removeSpeaker = (index) => {
    const updatedSpeakers = [...speakers]
    
    // Revoke object URL to prevent memory leaks
    if (updatedSpeakers[index].imagePreview) {
      URL.revokeObjectURL(updatedSpeakers[index].imagePreview)
    }
    
    updatedSpeakers.splice(index, 1)
    setSpeakers(updatedSpeakers)
  }

  // Handle schedule changes
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...schedule]
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value }
    setSchedule(updatedSchedule)
  }

  const addScheduleItem = () => {
    setSchedule([...schedule, { time: "", title: "", description: "" }])
  }

  const removeScheduleItem = (index) => {
    const updatedSchedule = [...schedule]
    updatedSchedule.splice(index, 1)
    setSchedule(updatedSchedule)
  }

  // Handle photo changes
  const handlePhotoChange = (index, field, value) => {
    const updatedPhotos = [...photos]
    
    if (field === 'alt') {
      updatedPhotos[index] = { ...updatedPhotos[index], alt: value }
    }
    
    setPhotos(updatedPhotos)
  }

  const handlePhotoImageChange = (index, e) => {
    const file = e.target.files[0]
    if (!file) return

    const updatedPhotos = [...photos]
    
    // Revoke previous URL if exists to prevent memory leaks
    if (updatedPhotos[index].imagePreview) {
      URL.revokeObjectURL(updatedPhotos[index].imagePreview)
    }
    
    updatedPhotos[index] = { 
      ...updatedPhotos[index], 
      image: file,
      imagePreview: URL.createObjectURL(file)
    }
    
    setPhotos(updatedPhotos)
  }

  const addPhoto = () => {
    setPhotos([...photos, { image: null, imagePreview: null, alt: "" }])
  }

  const removePhoto = (index) => {
    const updatedPhotos = [...photos]
    
    // Revoke object URL to prevent memory leaks
    if (updatedPhotos[index].imagePreview) {
      URL.revokeObjectURL(updatedPhotos[index].imagePreview)
    }
    
    updatedPhotos.splice(index, 1)
    setPhotos(updatedPhotos)
  }

  // Form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object
      const eventFormData = new FormData()
      
      // Add basic form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'eventImage' && key !== 'categories') {
          eventFormData.append(key, formData[key])
        }
      })
      
      // Add event image if exists
      if (formData.eventImage) {
        eventFormData.append('eventImage', formData.eventImage)
      }
      
      // Add categories as JSON string
      eventFormData.append('categories', JSON.stringify(formData.categories))
      
      // Add speakers
      speakers.forEach((speaker, index) => {
        eventFormData.append(`speakers[${index}][name]`, speaker.name)
        eventFormData.append(`speakers[${index}][role]`, speaker.role)
        eventFormData.append(`speakers[${index}][bio]`, speaker.bio)
        
        if (speaker.image) {
          eventFormData.append(`speakers[${index}][image]`, speaker.image)
        }
      })
      
      // Add schedule
      schedule.forEach((item, index) => {
        eventFormData.append(`schedule[${index}][time]`, item.time)
        eventFormData.append(`schedule[${index}][title]`, item.title)
        eventFormData.append(`schedule[${index}][description]`, item.description)
      })
      
      // Add photos
      photos.forEach((photo, index) => {
        if (photo.image) {
          eventFormData.append(`photos[${index}][image]`, photo.image)
        }
        eventFormData.append(`photos[${index}][alt]`, photo.alt)
      })
      
      // Send FormData to API
      const response = await createEvent(eventFormData)

      toast({
        title: `${response.title || 'Event'} Created`,
        description: "The event has been successfully created.",
      })

      // Cleanup object URLs to prevent memory leaks
      if (eventImagePreview) URL.revokeObjectURL(eventImagePreview)
      
      speakers.forEach(speaker => {
        if (speaker.imagePreview) URL.revokeObjectURL(speaker.imagePreview)
      })
      
      photos.forEach(photo => {
        if (photo.imagePreview) URL.revokeObjectURL(photo.imagePreview)
      })

      router.push("/superadmin/events")
    } catch (error) {
      console.error("Error creating event:", error)
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (eventImagePreview) URL.revokeObjectURL(eventImagePreview)
      
      speakers.forEach(speaker => {
        if (speaker.imagePreview) URL.revokeObjectURL(speaker.imagePreview)
      })
      
      photos.forEach(photo => {
        if (photo.imagePreview) URL.revokeObjectURL(photo.imagePreview)
      })
    }
  }, [eventImagePreview, speakers, photos])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/superadmin/events">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Event</h1>
            <p className="text-gray-500">Create a new event</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details for your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleSlugGeneration}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSlugGeneration}
                    className="h-5 text-xs text-blue-600 hover:text-blue-700"
                  >
                    Generate from title
                  </Button>
                </div>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    name="time"
                    placeholder="e.g., 6:00 PM - 9:00 PM"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="club">Hosting Club *</Label>
                <Select value={formData.club} onValueChange={(value) => handleSelectChange("club", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a club" />
                  </SelectTrigger>
                  <SelectContent>
                    { clubs.map((club) => (
                      <SelectItem key={club.id} value={club.id}>
                        {club.name}
                      </SelectItem>
                    ))}

                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventImage">Event Cover Image</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="eventImage"
                    name="eventImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {eventImagePreview && (
                    <div className="mt-2 relative">
                      <img 
                        src={eventImagePreview} 
                        alt="Event preview" 
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Detailed Description *</Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  rows={6}
                  placeholder="You can use HTML formatting for rich text"
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxCapacity">Maximum Capacity *</Label>
                  <Input
                    id="maxCapacity"
                    name="maxCapacity"
                    type="number"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Ticket Price</Label>
                  <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    placeholder="e.g., ₹500-1500 or Free"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categories (comma-separated) *</Label>
                <Input
                  id="categories"
                  name="categories"
                  placeholder="e.g., Workshop, Leadership, Competition"
                  value={formData.categories ? formData.categories.join(", ") : ""}
                  onChange={handleCategoryChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="highlighted"
                  checked={formData.highlighted}
                  onCheckedChange={(checked) => handleCheckboxChange("highlighted", checked)}
                />
                <Label
                  htmlFor="highlighted"
                  className="flex items-center gap-1.5 font-normal text-sm text-gray-700 cursor-pointer"
                >
                  <Star className="h-4 w-4 text-yellow-500" />
                  Highlight this event (featured on homepage)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Speakers Card */}
          <Card>
            <CardHeader>
              <CardTitle>Speakers & Performers</CardTitle>
              <CardDescription>Add speakers or performers for this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Speaker {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSpeaker(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input
                        value={speaker.name}
                        onChange={(e) => handleSpeakerChange(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Input
                        value={speaker.role}
                        onChange={(e) => handleSpeakerChange(index, "role", e.target.value)}
                        placeholder="e.g., Keynote Speaker"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={speaker.bio}
                      onChange={(e) => handleSpeakerChange(index, "bio", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSpeakerImageChange(index, e)}
                      className="cursor-pointer"
                    />
                    {speaker.imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={speaker.imagePreview} 
                          alt={`${speaker.name || 'Speaker'} preview`} 
                          className="h-20 w-20 object-cover rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addSpeaker}
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Speaker
              </Button>
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
              <CardDescription>Add the schedule for this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {schedule.map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Schedule Item {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScheduleItem(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Time *</Label>
                      <Input
                        value={item.time}
                        onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
                        placeholder="e.g., 6:00 PM - 6:30 PM"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => handleScheduleChange(index, "title", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleScheduleChange(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addScheduleItem}
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule Item
              </Button>
            </CardContent>
          </Card>

          {/* Photos Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Photos</CardTitle>
              <CardDescription>Add photos for this event (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {photos.map((photo, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Photo {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoto(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoImageChange(index, e)}
                        className="cursor-pointer"
                      />
                      {photo.imagePreview && (
                        <div className="mt-2">
                          <img 
                            src={photo.imagePreview} 
                            alt={photo.alt || 'Event photo preview'} 
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Alt Text</Label>
                      <Input
                        value={photo.alt}
                        onChange={(e) => handlePhotoChange(index, "alt", e.target.value)}
                        placeholder="Description of the photo"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addPhoto}
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/superadmin/events")}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Event...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Event
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )}