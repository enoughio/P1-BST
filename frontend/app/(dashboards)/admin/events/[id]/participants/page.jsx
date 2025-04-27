"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { getEvent, getEventParticipants, getCurrentUser } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Calendar, Download, Loader2, Mail, Phone, Search, User } from "lucide-react"
import Link from "next/link"

export default function EventParticipantsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState(null)
  const [participants, setParticipants] = useState([])
  const [filteredParticipants, setFilteredParticipants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUser(user)

        const eventData = await getEvent(params.id)

        // Check if this event belongs to the current admin
        if (eventData.createdBy !== user.id) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to view participants for this event.",
            variant: "destructive",
          })
          router.push("/admin/events")
          return
        }

        const participantsData = await getEventParticipants(params.id)

        setEvent(eventData)
        setParticipants(participantsData)
        setFilteredParticipants(participantsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load event participants.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, router, toast])

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = participants.filter(
        (participant) =>
          participant.name.toLowerCase().includes(term) ||
          participant.email.toLowerCase().includes(term) ||
          participant.phone.includes(term),
      )
      setFilteredParticipants(filtered)
    } else {
      setFilteredParticipants(participants)
    }
  }, [searchTerm, participants])

  const handleExportCSV = () => {
    if (!participants.length) return

    // Create CSV content
    const headers = ["Name", "Email", "Phone"]
    const csvContent = [headers.join(","), ...participants.map((p) => `"${p.name}","${p.email}","${p.phone}"`)].join(
      "\n",
    )

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${event.title.replace(/\s+/g, "_")}_participants.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </AdminLayout>
    )
  }

  if (!event) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/admin/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/events">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Participants</h1>
              <div className="flex items-center text-gray-500">
                <span>{event.title}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {event.formattedDate}
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleExportCSV}
            disabled={!participants.length}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Participants</CardTitle>
            <CardDescription>
              {participants.length} {participants.length === 1 ? "person" : "people"} registered for this{" "}
              {event.type === "event" ? "event" : "workshop"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            {filteredParticipants.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No participants found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium flex items-center">
                        <User className="mr-2 h-4 w-4 text-gray-400" />
                        {participant.name}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${participant.email}`}
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <Mail className="mr-1 h-4 w-4" />
                          {participant.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`tel:${participant.phone}`}
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <Phone className="mr-1 h-4 w-4" />
                          {participant.phone}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
