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
import { ArrowLeft, Award, Calendar, Clock, Edit, Loader2, Mail, MapPin, Phone, User, Users } from "lucide-react"
import Link from "next/link"

// Mock function to get member details
const getMemberDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+91 98765 43210",
        joinDate: "2021-05-15",
        status: "Active",
        role: "Member",
        club: {
          id: "1",
          name: "Bhopal Storytellers",
        },
        address: "123 Main Street, Bhopal, Madhya Pradesh",
        bio: "Passionate about public speaking and helping others improve their communication skills.",
        profileImage: "",
        achievements: [
          {
            id: "1",
            title: "Competent Communicator",
            date: "2022-03-10",
            description: "Completed 10 speech projects demonstrating various communication skills.",
          },
          {
            id: "2",
            title: "Advanced Leadership Bronze",
            date: "2022-08-22",
            description: "Completed leadership projects and served in club officer roles.",
          },
        ],
        projects: [
          {
            id: "1",
            title: "Ice Breaker",
            status: "Completed",
            completedDate: "2021-06-20",
            feedback: "Excellent first speech. Great introduction and personal story.",
          },
          {
            id: "2",
            title: "Researching and Presenting",
            status: "In Progress",
            startDate: "2022-09-05",
            expectedCompletionDate: "2022-10-30",
          },
          {
            id: "3",
            title: "Persuasive Speaking",
            status: "Not Started",
          },
        ],
        meetings: [
          {
            id: "1",
            date: "2022-09-15",
            role: "Speaker",
            feedback: "Well-structured speech with good vocal variety.",
          },
          {
            id: "2",
            date: "2022-08-18",
            role: "Evaluator",
            feedback: "Provided constructive feedback with specific examples.",
          },
          {
            id: "3",
            date: "2022-07-21",
            role: "Table Topics Master",
            feedback: "Created engaging impromptu speaking topics.",
          },
        ],
      })
    }, 1000)
  })
}

export default function MemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberDetails(params.id)
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getProjectStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "Not Started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
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

  if (!member) {
    return (
      <AdminLayout>
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
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
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
                {member.role} at {member.club.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href={`/superadmin/members/${member.id}/edit`}>
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
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status:</span>
                  {getStatusBadge(member.status)}
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{member.email}</span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{member.phone}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Club: {member.club.name}</span>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                  <span className="text-gray-700">{member.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {member.achievements.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No achievements yet</p>
                ) : (
                  member.achievements.map((achievement) => (
                    <div key={achievement.id} className="space-y-2">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="font-medium">{achievement.title}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Achieved on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700">{achievement.description}</p>
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
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{member.bio}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="projects">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="meetings">Meeting History</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Projects the member is working on or has completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.projects.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No projects assigned yet</p>
                    ) : (
                      <div className="space-y-4">
                        {member.projects.map((project) => (
                          <Card key={project.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                                  <div className="mt-1">{getProjectStatusBadge(project.status)}</div>
                                </div>
                                {project.status === "Completed" && (
                                  <div className="text-sm text-gray-500">
                                    Completed: {new Date(project.completedDate).toLocaleDateString()}
                                  </div>
                                )}
                                {project.status === "In Progress" && (
                                  <div className="text-sm text-gray-500">
                                    Started: {new Date(project.startDate).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                              {project.feedback && <p className="text-sm text-gray-700 mt-2">{project.feedback}</p>}
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
                    <CardTitle>Meeting History</CardTitle>
                    <CardDescription>Record of meeting attendance and roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.meetings.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No meeting history available</p>
                    ) : (
                      <div className="space-y-4">
                        {member.meetings.map((meeting) => (
                          <Card key={meeting.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium text-gray-900">
                                      {new Date(meeting.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm text-gray-700">Role: {meeting.role}</span>
                                  </div>
                                </div>
                              </div>
                              {meeting.feedback && <p className="text-sm text-gray-700 mt-2">{meeting.feedback}</p>}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Timeline of member's recent activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <Award className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="h-full w-px bg-gray-200"></div>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="text-sm font-medium text-gray-900">Earned Achievement</p>
                          <p className="text-sm text-gray-500">Earned the Advanced Leadership Bronze achievement</p>
                          <p className="text-xs text-gray-500">August 22, 2022</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                            <Clock className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="h-full w-px bg-gray-200"></div>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="text-sm font-medium text-gray-900">Meeting Participation</p>
                          <p className="text-sm text-gray-500">Served as Evaluator in the weekly club meeting</p>
                          <p className="text-xs text-gray-500">August 18, 2022</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                            <User className="h-4 w-4 text-purple-600" />
                          </div>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="text-sm font-medium text-gray-900">Project Started</p>
                          <p className="text-sm text-gray-500">
                            Started working on the Researching and Presenting project
                          </p>
                          <p className="text-xs text-gray-500">September 5, 2022</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
