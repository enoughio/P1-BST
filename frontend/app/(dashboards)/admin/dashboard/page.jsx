"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getMembers, getMeetings, getEvents, getRequests } from "@/lib/api"
import { Calendar, UserCheck, UserMinus, Clock, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    expiringMembers: 0,
    activeProjects: 0,
    upcomingMeetings: 0,
    upcomingEvents: 0,
    pendingRequests: 0,
  })


  const [members, setMembers] = useState([])
  const [meetings, setMeetings] = useState([])
  const [events, setEvents] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for dashboard
        //TODO: this will create a network waterfall, we can use Promise.all to fetch all data in parallel
 
        // const membersData = await getMembers("1")
        // const meetingsData = await getMeetings("1")
        // const eventsData = await getEvents("1")
        // const requestsData = await getRequests("1")

        const [membersData, meetingsData, eventsData, requestsData] = await Promise.all([
          getMembers('1'),
          getMeetings('1'),
          getEvents('1'),
          getRequests('1'),
        ])

        // Set data to state

        setMembers(membersData)
        setMeetings(meetingsData)
        setEvents(eventsData)
        setRequests(requestsData)

        // Calculate stats
        const now = new Date()
        const nextMonth = new Date()
        nextMonth.setMonth(nextMonth.getMonth() + 1)

        // Filter members whose membership is expiring in the next 30 days
        // Assuming membershipExpiryDate is in YYYY-MM-DD format
        const expiringMembers = membersData.filter((member) => {
          const expiryDate = new Date(member.membershipExpiryDate)
          return expiryDate > now && expiryDate < nextMonth
        })

        const upcomingMeetings = meetingsData.filter((meeting) => {
          const meetingDate = new Date(meeting.date)
          return meetingDate > now
        })

        const upcomingEvents = eventsData.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate > now
        })

        const pendingRequests = requestsData.filter((request) => {
          return request.status === "Pending"
        })

        setStats({
          totalMembers: membersData.length,
          expiringMembers: expiringMembers.length,
          activeProjects: 2, // Placeholder value
          upcomingMeetings: upcomingMeetings.length,
          upcomingEvents: upcomingEvents.length,
          pendingRequests: pendingRequests.length,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Bhopal Storytellers club management dashboard.</p>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-24 bg-muted/40"></CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground mt-1">Club is growing steadily</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Memberships Expiring Soon</CardTitle>
                  <UserMinus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.expiringMembers}</div>
                  <p className="text-xs text-muted-foreground mt-1">In the next 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.upcomingMeetings}</div>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled for this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled for this quarter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeProjects}</div>
                  <p className="text-xs text-muted-foreground mt-1">Currently in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting response from Super Admin</p>
                </CardContent>
              </Card>
            </div>

            {stats.expiringMembers > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Action Required</AlertTitle>
                <AlertDescription>
                  {stats.expiringMembers} member(s) have memberships expiring in the next 30 days.{" "}
                  <Link href="/admin/members" className="font-medium underline underline-offset-4">
                    View Members
                  </Link>
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="members" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="members">Recent Members</TabsTrigger>
                <TabsTrigger value="meetings">Upcoming Meetings</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="grid grid-cols-4 font-medium">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Phone</div>
                      <div>Expires</div>
                    </div>
                  </div>

          
                  <div className="divide-y">
                    {members.slice(0, 10).map((member) => (
                      <div key={member.id} className="grid grid-cols-4 p-4">
                        <div className="font-medium">
                          {member.first_name} {member.last_name}
                        </div>
                        <div>{member.email}</div>
                        <div>{member.phone}</div>
                        <div>{new Date(member.membershipExpiryDate).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/admin/members">View All Members</Link>
                </Button>
              </TabsContent>

              <TabsContent value="meetings" className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="grid grid-cols-3 font-medium">
                      <div>Title</div>
                      <div>Date & Time</div>
                      <div>Location</div>
                    </div>
                  </div>

                  <div className="divide-y">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="grid grid-cols-3 p-4">
                        <div className="font-medium">{meeting.title}</div>
                        <div>
                          {meeting.date}, {meeting.time}
                        </div>
                        <div>{meeting.location}</div>
                      </div>
                    ))}
                  </div>
                
                </div>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/admin/meetings">View All Meetings</Link>
                </Button>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="grid grid-cols-3 font-medium">
                      <div>Title</div>
                      <div>Date & Time</div>
                      <div>Location</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {events.map((event) => (
                      <div key={event.id} className="grid grid-cols-3 p-4">
                        <div className="font-medium">{event.title}</div>
                        <div>
                          {event.formattedDate}, {event.time}
                        </div>
                        <div>{event.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/admin/events">View All Events</Link>
                </Button>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

