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
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Sparkles,
  Star,
  TicketIcon,
  Trophy,
  Users,
} from "lucide-react"
import Link from "next/link"

// Mock function to get event details
const getEventDetails = (slug) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be fetched from the API in a real app
      const events = [
        // {
        //   id: "1",
        //   title: "Bhopal International Storytelling Fest",
        //   slug: "BISF",
        //   description:
        //     "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
        //   longDescription: `
        //     <p>The Bhopal International Storytelling Fest (BISF) is a celebration of the art of storytelling from around the world. This premier event brings together master storytellers, emerging talents, and enthusiastic audiences for an unforgettable evening of narrative magic.</p>
        //     
        //     <p>This year's theme, "Stories Across Borders," emphasizes the universal power of storytelling to connect us across cultural, geographic, and generational divides. Our carefully curated lineup features traditional folk tales, personal narratives, and innovative storytelling formats that push the boundaries of the craft.</p>
        //     
        //     <p>Whether you're a seasoned storyteller or simply someone who appreciates the magic of a well-told tale, BISF offers something for everyone. Come be part of this unique celebration of one of humanity's oldest and most enduring art forms.</p>
        //   `,
        //   date: "2023-12-15",
        //   formattedDate: "December 15, 2023",
        //   time: "6:00 PM - 9:00 PM",
        //   location: "Cultural Center, New Delhi",
        //   image: "",
        //   highlighted: true,
        //   club: "1",
        //   clubName: "Bhopal Storytellers",
        //   attendees: 120,
        //   maxCapacity: 200,
        //   ticketPrice: "₹500-1500",
        //   categories: ["Cultural", "Performance", "Educational"],
        //   speakers: [
        //     {
        //       name: "Anita Desai",
        //       role: "International Storyteller",
        //       bio: "Award-winning storyteller with 20 years of experience performing across Asia and Europe",
        //       image: "",
        //     },
        //     {
        //       name: "Rajiv Sharma",
        //       role: "Folk Tale Specialist",
        //       bio: "Expert in Indian folk tales and their cultural significance",
        //       image: "",
        //     },
        //     {
        //       name: "Sarah Johnson",
        //       role: "Modern Narrative Expert",
        //       bio: "Pushing the boundaries of storytelling through digital media and interactive narratives",
        //       image: "",
        //     },
        //   ],
        //   schedule: [
        //     {
        //       time: "6:00 PM - 6:30 PM",
        //       title: "Welcome Reception",
        //       description: "Registration and refreshments",
        //     },
        //     {
        //       time: "6:30 PM - 7:30 PM",
        //       title: "Traditional Tales",
        //       description: "Folk stories from across India presented by our master storytellers",
        //     },
        //     {
        //       time: "7:30 PM - 8:00 PM",
        //       title: "Intermission",
        //       description: "Refreshments and networking",
        //     },
        //     {
        //       time: "8:00 PM - 9:00 PM",
        //       title: "Contemporary Narratives",
        //       description: "Modern storytelling formats and interactive experiences",
        //     },
        //   ],
        //   photos: [
        //     { url: "", alt: "Last year's storytelling session" },
        //     { url: "", alt: "Audience engagement" },
        //     { url: "", alt: "Award ceremony from previous edition" },
        //   ],
        // },
        // {
        //   id: "3",
        //   title: "Public Speaking Championship",
        //   slug: "speaking-championship-2024",
        //   description:
        //     "The annual competition where the best speakers compete for recognition and prizes. Categories include prepared speeches, impromptu speaking, and storytelling.",
        //   longDescription: `
        //     <p>The Public Speaking Championship is our prestigious annual competition that brings together the finest speakers from across the region. This thrilling event showcases extraordinary talent, inspiring speeches, and the art of effective communication at its best.</p>
        //     
        //     <p>Competition categories include:</p>
        //     <ul>
        //       <li><strong>Prepared Speeches:</strong> 5-7 minute speeches on topics of the speaker's choice</li>
        //       <li><strong>Impromptu Speaking:</strong> 2-3 minute speeches on topics provided just minutes before delivery</li>
        //       <li><strong>Storytelling:</strong> 6-8 minute original or adapted stories that captivate and inspire</li>
        //     </ul>
        //     
        //     <p>Participants will be judged by a panel of experienced Storytellers and communication professionals. Winners in each category will receive recognition, prizes, and the opportunity to represent our district at the national level competition.</p>
        //     
        //     <p>Even if you're not competing, attending the championship provides a valuable opportunity to witness excellent speeches, learn from skilled communicators, and be inspired to improve your own speaking abilities.</p>
        //   `,
        //   date: "2024-01-30",
        //   formattedDate: "January 30, 2024",
        //   time: "10:00 AM - 6:00 PM",
        //   location: "Auditorium, Mumbai",
        //   image: "",
        //   highlighted: true,
        //   club: "3",
        //   clubName: "Mumbai Speakers",
        //   attendees: 0,
        //   maxCapacity: 300,
        //   ticketPrice: "₹750",
        //   categories: ["Competition", "Speaking", "Awards"],
        //   speakers: [
        //     {
        //       name: "Vikram Mehta",
        //       role: "Chief Judge",
        //       bio: "Former National Public Speaking Champion and professional speaker",
        //       image: "",
        //     },
        //     {
        //       name: "Priya Desai",
        //       role: "Competition Chair",
        //       bio: "Certified Speaking Professional and coach with 15 years of experience",
        //       image: "",
        //     },
        //   ],
        //   schedule: [
        //     {
        //       time: "10:00 AM - 10:30 AM",
        //       title: "Opening Ceremony",
        //       description: "Welcome remarks and introduction of judges",
        //     },
        //     {
        //       time: "10:30 AM - 12:30 PM",
        //       title: "Prepared Speech Competition",
        //       description: "Contestants deliver speeches on chosen topics",
        //     },
        //     {
        //       time: "12:30 PM - 1:30 PM",
        //       title: "Lunch Break",
        //       description: "Networking opportunity",
        //     },
        //     {
        //       time: "1:30 PM - 3:30 PM",
        //       title: "Impromptu Speaking Competition",
        //       description: "Contestants respond to on-the-spot topics",
        //     },
        //     {
        //       time: "3:30 PM - 4:00 PM",
        //       title: "Break",
        //       description: "Refreshments",
        //     },
        //     {
        //       time: "4:00 PM - 5:30 PM",
        //       title: "Storytelling Competition",
        //       description: "Contestants share engaging stories",
        //     },
        //     {
        //       time: "5:30 PM - 6:00 PM",
        //       title: "Award Ceremony",
        //       description: "Recognition of winners and closing remarks",
        //     },
        //   ],
        //   photos: [
        //     { url: "", alt: "Previous championship winners" },
        //     { url: "", alt: "Contestant delivering speech" },
        //     { url: "", alt: "Judges panel" },
        //   ],
        // },
        {
          id: "bhopal-storytelling-championship-2026",
          title: "Bhopal Storytelling Championship - 2026",
          slug: "bhopal-storytelling-championship-2026",
          description:
            "The Search for the City's Best Young Storyteller. A four-phase mentorship championship for 1,000+ students, culminating in a grand finale in Bhopal.",
          organizer: "Bharat Storytellers Foundation",
          partner: "Indian Society for Training and Development (ISTD)",
          registrationDeadline: "March 31, 2026",
          masterclassDates: "April 3-4, 2026",
          auditionDeadline: "April 10, 2026",
          shortlistDate: "April 15, 2026",
          semifinalDates: "April 20-23, 2026",
          finaleDate: "April 26, 2026",
          fee: "Rs 350 per student",
          ageGroups: ["Junior (6 to 10 years)", "Senior (11 to 15 years)"],
          languages: ["Hindi", "English", "Hinglish"],
          prizePool: "Up to Rs 60,000",
          prizes: ["Winner: up to Rs 15,000", "1st runner-up: up to Rs 10,000", "2nd runner-up: up to Rs 5,000"],
          contactPhones: ["+91 8871317382", "6268244196"],
          contactEmail: "bharatstorytellers@gmail.com",
          registrationUrl: "https://www.bharatstorytellers.com",
          longDescription: `
            <p><strong>Organized by:</strong> Bharat Storytellers Foundation</p>
            <p><strong>In Association with:</strong> Indian Society for Training and Development (ISTD)</p>
            <hr />
            <p><strong>The Bhopal Storytelling Championship 2026</strong> is the city's largest platform for young voices. It is built to guide 1,000+ students from imagination to confident, polished performance through a structured mentorship journey.</p>
            <p>This is not just a contest. It is an end-to-end learning program where participants train in story design, voice and presence, and narrative impact, then apply those skills on a professional stage.</p>
            <p>From online masterclasses to live semi-finals and a grand finale in Bhopal, every phase is crafted to help young storytellers think clearly, speak boldly, and move audiences.</p>
            <hr />
            <h3>Why Your Child Should Participate?</h3>
            <ul>
              <li><strong>Overcome Stage Fright:</strong> Build the confidence to speak before large audiences.</li>
              <li><strong>Master Public Speaking:</strong> Learn to articulate ideas clearly and persuasively.</li>
              <li><strong>Enhance Creativity:</strong> Develop original story arcs and character depth.</li>
              <li><strong>Gain Professional Training:</strong> Access to masterclasses usually reserved for corporate leaders.</li>
            </ul>
            <hr />
            <h3>The 4-Phase Journey</h3>
            <ul>
              <li><strong>Phase 1: Registration & The Masterclass</strong> — Intensive online workshops covering story framework, storytelling, and public speaking essentials. <strong>Dates:</strong> 3rd & 4th April 2026.</li>
              <li><strong>Phase 2: Digital Auditions</strong> — Record and submit a short video of your story via our portal. <strong>Deadline:</strong> 10th April 2026.</li>
              <li><strong>Phase 3: The Semi-Finals</strong> — Top candidates perform live before a professional jury. <strong>Dates:</strong> 20th to 23rd April 2026.</li>
              <li><strong>Phase 4: The Grand Finale</strong> — The ultimate battle for the title on a grand stage in Bhopal. <strong>Date:</strong> Sunday, 26th April 2026.</li>
            </ul>
            <hr />
            <h3>Participation Categories</h3>
            <ul>
              <li><strong>Junior (6 to 10 Years):</strong> Expression, Imagination &amp; Joy</li>
              <li><strong>Senior (11 to 15 Years):</strong> Impact, Structure &amp; Stage Presence</li>
            </ul>
            <p><strong>Participation Fee:</strong> ₹350 per student (includes full workshop access, contest entry, and joint certification).</p>
            <hr />
            <h3>Rewards &amp; Recognition</h3>
            <p><strong>Total Cash Prize Pool:</strong> Up to ₹60,000</p>
            <p><strong>Prize Breakdown (Per Category):</strong></p>
            <ul>
              <li><strong>Winner:</strong> Up to ₹15,000</li>
              <li><strong>1st Runner-up:</strong> Up to ₹10,000</li>
              <li><strong>2nd Runner-up:</strong> Up to ₹5,000</li>
            </ul>
            <p><strong>Joint Certification:</strong> Every participant receives an official certificate from the Bharat Storytellers Foundation and ISTD recognizing their professional training.</p>
            <hr />
            <h3>Important Timeline: 2026</h3>
            <ul>
              <li><strong>March 31:</strong> Last Date to Register</li>
              <li><strong>April 3 &amp; 4:</strong> Online Storytelling Masterclass</li>
              <li><strong>April 10:</strong> Video Submission Deadline</li>
              <li><strong>April 15:</strong> Shortlist Announcement</li>
              <li><strong>April 20 - 23:</strong> Semi-Final Rounds (In-person)</li>
              <li><strong>April 26:</strong> The Grand Finale</li>
            </ul>
            <hr />
            <h3>Special Incentive for Schools</h3>
            <p>Bring the masterclass to your campus. For schools with 100 or more participants, Bharat Storytellers Foundation will organize a special in-person storytelling workshop on the school campus for all registered students at no additional cost.</p>
            <hr />
            <h3>Rules &amp; Guidelines</h3>
            <ul>
              <li>The story can be narrated in Hindi, English, or Hinglish.</li>
              <li>Story duration for auditions: 1-2 minutes.</li>
              <li>Participants must be within the specified age brackets as of April 1, 2026.</li>
              <li>Cash prizes are subject to the total number of registrations. The foundation reserves the right to adjust prize amounts proportionately.</li>
            </ul>
            <hr />
            <h3>How to Register?</h3>
            <ol>
              <li>Visit: www.bharatstorytellers.com</li>
              <li>Fill details: Select category (Junior/Senior) and school.</li>
              <li>Payment: Complete the ₹350 registration fee.</li>
              <li>Confirmation: Receive your workshop link and student kit via email.</li>
            </ol>
            <hr />
            <p><strong>Contact Us:</strong> Bharat Storytellers Foundation</p>
            <p><strong>Phone:</strong> +91 8871317382, 6268244196 | <strong>Email:</strong> bharatstorytellers@gmail.com</p>
          `,
          date: "2026-04-26",
          formattedDate: "April 26, 2026",
          time: "All day",
          location: "Bhopal, Madhya Pradesh",
          image: "",
          highlighted: true,
          club: "bhopal-storytellers-foundation",
          clubName: "Bharat Storytellers Foundation",
          attendees: 0,
          maxCapacity: 1000,
          ticketPrice: "₹350",
          categories: ["Championship", "Youth", "Storytelling", "Mentorship"],
          schedule: [
            {
              time: "April 3-4, 2026",
              title: "Phase 1: Registration & The Masterclass",
              description: "Intensive online workshops on story framework, storytelling, and public speaking essentials.",
            },
            {
              time: "By April 10, 2026",
              title: "Phase 2: Digital Auditions",
              description: "Record and submit a 1-2 minute story video via the portal.",
            },
            {
              time: "April 20-23, 2026",
              title: "Phase 3: Semi-Finals",
              description: "Top candidates perform live before a professional jury.",
            },
            {
              time: "April 26, 2026",
              title: "Phase 4: Grand Finale",
              description: "The ultimate face-off on a grand stage in Bhopal.",
            },
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
    fullName: "",
    email: "",
    phone: "",
    ageGroup: "",
    category: "",
    school: "",
    city: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: "", message: "" })

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventTitle: event.title,
          eventSlug: event.slug,
        }),
      })

      if (!response.ok) {
        throw new Error("Unable to send registration")
      }

      setRegistrationSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        ageGroup: "",
        category: "",
        school: "",
        city: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Unable to submit. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
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
    <div className="min-h-screen bg-[#F7F1E8] text-[#1F1B16]">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#E8D8C6] blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#F3E7D8] blur-3xl opacity-80" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />
          <img
            src={event.image || `/placeholder.svg?height=700&width=1600&text=${encodeURIComponent(event.title)}`}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr] lg:items-start">
            <div className="max-w-2xl">
              {event.highlighted && (
                <Badge className="mb-4 rounded-full bg-[#F3C969] text-[#1F1B16]">
                  <Star className="mr-1 h-3 w-3" />
                  Featured Event
                </Badge>
              )}
              <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">{event.organizer}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl font-serif">
                {event.title}
              </h1>
              <p className="mt-4 text-base text-[#5B4E44] sm:text-lg">{event.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {event.categories?.map((category) => (
                  <Badge key={category} variant="outline" className="rounded-full border-[#E1D3C1] text-[#6E5C4C]">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-[#6E5C4C]">
                    <Calendar className="h-4 w-4" />
                    {event.formattedDate}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1F1B16]">{event.time}</div>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-[#6E5C4C]">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1F1B16]">{event.location}</div>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-[#6E5C4C]">
                    <Users className="h-4 w-4" />
                    Seats
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1F1B16]">
                    {event.attendees}/{event.maxCapacity} Registered
                  </div>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-[#6E5C4C]">
                    <Trophy className="h-4 w-4" />
                    Prize Pool
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1F1B16]">{event.prizePool}</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsRSVPDialogOpen(true)}
                  disabled={!isEventUpcoming(event.date) || event.attendees >= event.maxCapacity}
                  className={
                    isEventUpcoming(event.date) && event.attendees < event.maxCapacity
                      ? "rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]"
                      : "rounded-full bg-gray-400 text-white cursor-not-allowed"
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
                  className="rounded-full border-[#1F1B16] text-[#1F1B16] hover:bg-[#1F1B16] hover:text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </div>

            <Card className="border-[#E7DCCF] bg-white/90 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Registration</p>
                  <h2 className="mt-2 text-2xl font-semibold font-serif">Reserve your spot</h2>
                  <p className="mt-2 text-sm text-[#6E5C4C]">
                    Join the mentorship journey and get guided by master storytellers.
                  </p>
                </div>
                <div className="space-y-3 text-sm text-[#5B4E44]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Fee: {event.fee}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Last date: {event.registrationDeadline}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Categories: {event.ageGroups?.join(" | ")}
                  </div>
                </div>
                <Separator />
                <Button
                  onClick={() => setIsRSVPDialogOpen(true)}
                  disabled={!isEventUpcoming(event.date) || event.attendees >= event.maxCapacity}
                  className={
                    isEventUpcoming(event.date) && event.attendees < event.maxCapacity
                      ? "w-full rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]"
                      : "w-full rounded-full bg-gray-400 text-white cursor-not-allowed"
                  }
                >
                  <TicketIcon className="mr-2 h-4 w-4" />
                  {isEventUpcoming(event.date)
                    ? event.attendees >= event.maxCapacity
                      ? "Sold Out"
                      : "Register Now"
                    : "Event Ended"}
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full border-[#1F1B16]">
                  <Link href={event.registrationUrl} target="_blank" rel="noreferrer">
                    Visit Registration Portal
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Back to all events */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="text-gray-700 hover:text-[#1F1B16]">
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all events
          </Link>
        </Button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">About the Championship</p>
                <h2 className="text-3xl font-semibold text-[#1F1B16]">A mentorship-first storytelling journey</h2>
                <p className="text-base text-[#5B4E44]">
                  Built to move young voices from imagination to confident performance, with expert coaching at every step.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">Organizer</p>
                  <p className="mt-2 text-lg font-semibold text-[#1F1B16]">{event.organizer}</p>
                  <p className="mt-1 text-sm text-[#6E5C4C]">In association with {event.partner}</p>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">Prize Pool</p>
                  <p className="mt-2 text-lg font-semibold text-[#1F1B16]">{event.prizePool}</p>
                  <p className="mt-1 text-sm text-[#6E5C4C]">Two categories, three winners each</p>
                </div>
                <div className="rounded-2xl border border-[#E7DCCF] bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">Who can join</p>
                  <p className="mt-2 text-lg font-semibold text-[#1F1B16]">Students age 6-15</p>
                  <p className="mt-1 text-sm text-[#6E5C4C]">Languages: {event.languages?.join(", ")}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
                <div
                  className="prose prose-lg max-w-none text-[#5B4E44] prose-headings:font-semibold prose-headings:text-[#1F1B16] prose-strong:text-[#1F1B16] prose-li:marker:text-[#8A6D4D] prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-hr:my-8 prose-hr:border-[#E7DCCF] prose-h3:mt-10 prose-h3:mb-4 prose-h3:rounded-2xl prose-h3:bg-[#F3E7D8] prose-h3:px-4 prose-h3:py-2 prose-h3:text-[#1F1B16]"
                  dangerouslySetInnerHTML={{ __html: event.longDescription }}
                ></div>
              </div>
            </section>

            {event.schedule && event.schedule.length > 0 && (
              <section className="rounded-3xl border border-[#E7DCCF] bg-white/80 p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1F1B16]">The 4-Phase Journey</h2>
                <div className="mt-6 space-y-6">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 md:flex-row md:items-start">
                      <div className="w-full md:w-40 shrink-0 text-sm font-medium text-[#8A6D4D]">
                        {item.time}
                      </div>
                      <div className="rounded-2xl border border-[#EFE4D6] bg-white p-4">
                        <h3 className="text-lg font-semibold text-[#1F1B16]">{item.title}</h3>
                        <p className="mt-2 text-sm text-[#5B4E44]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="grid gap-6 md:grid-cols-2">
              <Card className="border-[#E7DCCF] bg-white/90">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-[#1F1B16]">Eligibility</h3>
                  <p className="text-sm text-[#5B4E44]">Age groups:</p>
                  <div className="flex flex-wrap gap-2">
                    {event.ageGroups?.map((group) => (
                      <Badge key={group} variant="outline" className="rounded-full border-[#E1D3C1] text-[#6E5C4C]">
                        {group}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-[#5B4E44]">Languages: {event.languages?.join(", ")}</p>
                </CardContent>
              </Card>
              <Card className="border-[#E7DCCF] bg-white/90">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-[#1F1B16]">Rewards</h3>
                  <p className="text-sm text-[#5B4E44]">Total prize pool: {event.prizePool}</p>
                  <ul className="space-y-2 text-sm text-[#5B4E44]">
                    {event.prizes?.map((prize) => (
                      <li key={prize} className="flex items-start gap-2">
                        <Trophy className="h-4 w-4 text-[#8A6D4D]" />
                        <span>{prize}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="sticky top-6 border-[#E7DCCF] bg-white/90">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#1F1B16]">Key Dates</h3>
                <div className="space-y-3 text-sm text-[#5B4E44]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8A6D4D]" />
                    Registration closes: {event.registrationDeadline}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8A6D4D]" />
                    Masterclass: {event.masterclassDates}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8A6D4D]" />
                    Audition deadline: {event.auditionDeadline}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8A6D4D]" />
                    Shortlist: {event.shortlistDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8A6D4D]" />
                    Semi-finals: {event.semifinalDates}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8A6D4D]" />
                    Grand finale: {event.finaleDate}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-[#5B4E44]">
                  <p><strong>Organized by:</strong> {event.organizer}</p>
                  <p><strong>Partner:</strong> {event.partner}</p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-[#5B4E44]">
                  <p><strong>Contact:</strong> {event.contactPhones?.join(" | ")}</p>
                  <p><strong>Email:</strong> {event.contactEmail}</p>
                </div>
                <Separator />
                <Button
                  onClick={() => setIsRSVPDialogOpen(true)}
                  disabled={!isEventUpcoming(event.date) || event.attendees >= event.maxCapacity}
                  className={
                    isEventUpcoming(event.date) && event.attendees < event.maxCapacity
                      ? "w-full rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]"
                      : "w-full rounded-full bg-gray-400 text-white cursor-not-allowed"
                  }
                >
                  <TicketIcon className="mr-2 h-4 w-4" />
                  {isEventUpcoming(event.date)
                    ? event.attendees >= event.maxCapacity
                      ? "Sold Out"
                      : "Register Now"
                    : "Event Ended"}
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* RSVP Dialog */}
      <Dialog open={isRSVPDialogOpen && !registrationSuccess} onOpenChange={setIsRSVPDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {event.title}</DialogTitle>
            <DialogDescription>Fill out the form below and we will contact you with next steps.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageGroup">Age Group *</Label>
                <Input id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School *</Label>
                <Input id="school" name="school" value={formData.school} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Notes</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>
              <div className="pt-2 text-sm text-gray-500">
                <p>Ticket Price: {event.ticketPrice}</p>
                <p>Available Seats: {event.maxCapacity - event.attendees}</p>
              </div>
              {submitStatus.message && (
                <div className="text-sm text-red-600">{submitStatus.message}</div>
              )}
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
                {isSubmitting ? "Sending..." : "Complete Registration"}
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
            <DialogDescription>Your registration request has been sent to our team.</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-gray-600">
            Our team will reach out with your workshop link and student kit details. If you have any questions,
            email {event.contactEmail}.
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setRegistrationSuccess(false)
                setIsRSVPDialogOpen(false)
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

