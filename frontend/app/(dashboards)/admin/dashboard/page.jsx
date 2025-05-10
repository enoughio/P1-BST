"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {  getMeetings, getEvents, getRequests, getClubMembers } from "@/lib/api"
import { Calendar, UserCheck, UserMinus, Clock, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    expiringMembers: 0,
    activeProjects: 0,
    upcomingMeetings: 0,
    upcomingEvents: 0,
    pendingRequests: 0,
  })

  const { user: admin } = useAuth()
  const [members, setMembers] = useState([])
  const [meetings, setMeetings] = useState([])
  const [events, setEvents] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for dashboard in parallel
        const [membersData, meetingsData, eventsData, requestsData] = await Promise.all([
          getClubMembers(admin.clubId),
          getMeetings(admin.clubId),
          getEvents(),
          getRequests(admin.clubId),
        ])

        console.log("membersData", membersData)

        // Set data to state
        setMembers(membersData)
        setMeetings(meetingsData)

        const filteredEvents = eventsData.filter((event) => {
          return event.club === admin.clubId
        })

        setEvents(filteredEvents)
        setRequests(requestsData)

        // Calculate stats
        const now = new Date()
        const nextMonth = new Date()
        nextMonth.setMonth(nextMonth.getMonth() + 1)

        // Filter members whose membership is expiring in the next 30 days
        // Check if membership_expiry_date exists and is not null
        const expiringMembers = membersData.filter((member) => {
          if (!member.membership_expiry_date) return false
          const expiryDate = new Date(member.membership_expiry_date)
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

        // Count active projects across all members
        const activeProjectsCount = membersData.reduce((total, member) => {
          return total + (member.active_projects ? member.active_projects.length : 0)
        }, 0)

        setStats({
          totalMembers: membersData.length,
          expiringMembers: expiringMembers.length,
          activeProjects: activeProjectsCount,
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
                    <div>Join Date</div>
                  </div>
                </div>

                <div className="divide-y">
                  {members.slice(0, 10).map((member, index) => (
                    <div key={index} className="grid grid-cols-4 p-4">
                      <div className="font-medium">
                        {member.name}
                      </div>
                      <div>{member.email}</div>
                      <div>{member.mobile}</div>
                      <div>{member.join_date}</div>
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
                    <div key={meeting.meeting_id} className="grid grid-cols-3 p-4">
                      <div className="font-medium">{meeting.title}</div>
                      <div>
                        {new Date(meeting.date).toLocaleDateString()}, {meeting.time}
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
                    <div key={event.event_id} className="grid grid-cols-3 p-4">
                      <div className="font-medium">{event.title}</div>
                      <div>
                        {new Date(event.date).toLocaleDateString()}, {event.time}
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
  )
}