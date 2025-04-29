"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Award, Briefcase, Cake, Calendar, Clock, Edit, Loader2, Mail, MapPin, Phone, User, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getMember } from "@/lib/api"

// Mock function to get member details with new API format
// const getMemberDetails = (id) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: "Vikikumar",
//         username: "u000",
//         email: "u000@example.com",
//         mobile: "9594548313",
//         club_name: "Bharat Storytellers",
//         join_date: "14-Apr-2025 05:22 PM",
//         membership_start_date: null,
//         membership_expiry_date: null,
//         avatar: "",
//         address: "Mumbai, MH-400037",
//         gender: "Male",
//         dob: "2025-04-14",
//         id_proof: null,
//         occupation: "Student",
//         completed_projects: 0,
//         active_projects: [],
//         upcoming_meetings: [],
//         achievements: [
//           {
//             id: 1,
//             title: "Ice Breaker",
//             date: "2023-10-15",
//             type: "Project Completion"
//           },
//           {
//             id: 2,
//             title: "Best Speaker",
//             date: "2023-09-22",
//             type: "Meeting Award"
//           }
//         ]
//       })
//     }, 1000)
//   })
// }

export default function MemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMember(params.username || params.id)
        setMember(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching member details:", error)
        toast({
          title: "Error",
          description: "Failed to load member details",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  const getMembershipStatus = () => {
    if (!member.membership_start_date) {
      return <Badge className="bg-gray-100 text-gray-800">Not Active</Badge>
    }
    if (member.membership_expiry_date) {
      const expiryDate = new Date(member.membership_expiry_date)
      if (expiryDate < new Date()) {
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      }
    }
    return <Badge className="bg-green-100 text-green-800">Active</Badge>
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    // Check if date is already in a formatted string like "14-Apr-2025 05:22 PM"
    if (dateString.includes("-") && dateString.includes(":")) {
      return dateString
    }
    // Otherwise format as a standard date
    return new Date(dateString).toLocaleDateString()
  }

  const getAchievementIcon = (type) => {
    switch (type) {
      case "Project Completion":
        return <Award className="h-4 w-4 mr-2 text-green-500" />
      case "Meeting Award":
        return <Award className="h-4 w-4 mr-2 text-yellow-500" />
      default:
        return <Award className="h-4 w-4 mr-2 text-blue-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Member Not Found</h1>
        <p className="text-gray-500 mb-6">The member you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/superadmin/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/superadmin/members">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{member.name}</h1>
            <p className="text-gray-500">
              @{member.username} • {member.club_name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={`/superadmin/members/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Member
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                {member.avatar && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    {/* <Image 
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Membership:</span>
                {getMembershipStatus()}
              </div>

              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{member.email}</span>
              </div>

              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{member.mobile}</span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">Joined: {formatDate(member.join_date)}</span>
              </div>

              {member.membership_start_date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    Membership: {formatDate(member.membership_start_date)} - {formatDate(member.membership_expiry_date || "Present")}
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">Club: {member.club_name}</span>
              </div>

              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                <span className="text-gray-700">{member.address}</span>
              </div>

              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">Gender: {member.gender}</span>
              </div>

              <div className="flex items-center">
                <Cake className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">DOB: {formatDate(member.dob)}</span>
              </div>

              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">Occupation: {member.occupation}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!member.achievements || member.achievements.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No achievements yet</p>
              ) : (
                member.achievements.map((achievement) => (
                  <div key={achievement.id} className="space-y-2">
                    <div className="flex items-center">
                      {getAchievementIcon(achievement.type)}
                      <span className="font-medium">{achievement.title}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {formatDate(achievement.date)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">{achievement.type}</p>
                    {achievement.id !== member.achievements[member.achievements.length - 1].id && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-3xl font-bold text-blue-600">{member.completed_projects}</span>
                  <span className="text-sm text-gray-500">Completed Projects</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-3xl font-bold text-green-600">{member.achievements ? member.achievements.length : 0}</span>
                  <span className="text-sm text-gray-500">Achievements</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="projects">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="meetings">Upcoming Meetings</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Projects the member is working on</CardDescription>
                </CardHeader>
                <CardContent>
                  {!member.active_projects || member.active_projects.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No active projects</p>
                  ) : (
                    <div className="space-y-4">
                      {member.active_projects.map((project, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-gray-900">{project.title}</h3>
                                <div className="mt-1">
                                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                                </div>
                              </div>
                              {project.start_date && (
                                <div className="text-sm text-gray-500">
                                  Started: {formatDate(project.start_date)}
                                </div>
                              )}
                            </div>
                            {project.description && <p className="text-sm text-gray-700 mt-2">{project.description}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meetings" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>Scheduled meetings and roles</CardDescription>
                </CardHeader>
                <CardContent>
                  {!member.upcoming_meetings || member.upcoming_meetings.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No upcoming meetings scheduled</p>
                  ) : (
                    <div className="space-y-4">
                      {member.upcoming_meetings.map((meeting, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium text-gray-900">
                                    {formatDate(meeting.date)}
                                  </span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <User className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-sm text-gray-700">Role: {meeting.role}</span>
                                </div>
                              </div>
                              {meeting.time && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                  <span className="text-sm text-gray-500">{meeting.time}</span>
                                </div>
                              )}
                            </div>
                            {meeting.notes && <p className="text-sm text-gray-700 mt-2">{meeting.notes}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}