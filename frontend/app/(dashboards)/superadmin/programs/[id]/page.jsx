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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Book, Edit, Loader2, Trash, Users } from "lucide-react"
import Link from "next/link"

export default function ProgramDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [program, setProgram] = useState(null)
  const [projects, setProjects] = useState([])
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        // In a real app, these would be API calls
        // const programData = await getProgram(params.id)
        // const projectsData = await getProgramProjects(params.id)
        // const clubsData = await getProgramClubs(params.id)

        // Mock data
        const mockPrograms = {
          1: {
            id: "1",
            name: "Young Orators",
            description: "A program designed for young speakers to develop their public speaking skills.",
          },
          2: {
            id: "2",
            name: "Young Leaders",
            description: "Focused on developing leadership skills in young individuals.",
          },
          3: {
            id: "3",
            name: "Storytellers",
            description: "A program for those who want to master the art of storytelling.",
          },
        }

        const programData = mockPrograms[params.id]

        if (!programData) {
          throw new Error("Program not found")
        }

        // Mock projects for this program
        const mockProjects = [
          {
            id: "1",
            title: "Introduction to Public Speaking",
            level: "Level 1",
            status: "Active",
            assignedCount: 12,
          },
          {
            id: "2",
            title: "Effective Evaluations",
            level: "Level 2",
            status: "Active",
            assignedCount: 8,
          },
          {
            id: "3",
            title: "Persuasive Speaking",
            level: "Level 3",
            status: "Active",
            assignedCount: 5,
          },
          {
            id: "4",
            title: "Storytelling Techniques",
            level: "Level 2",
            status: "Active",
            assignedCount: 10,
          },
        ]

        // Mock clubs for this program
        const mockClubs = [
          {
            id: "1",
            name: "Bhopal Storytellers",
            city: "Bhopal",
            members: 32,
          },
          {
            id: "2",
            name: "Delhi Orators",
            city: "New Delhi",
            members: 45,
          },
          {
            id: "3",
            name: "Mumbai Speakers",
            city: "Mumbai",
            members: 38,
          },
        ]

        setProgram(programData)
        setProjects(mockProjects)
        setClubs(mockClubs)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching program details:", error)
        toast({
          title: "Error",
          description: "Failed to load program details",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchProgramDetails()
  }, [params.id, toast])

  const handleDelete = async () => {
    try {
      // In a real app, this would be an API call
      // await deleteProgram(program.id)

      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Program Deleted",
          description: "The program has been successfully deleted.",
        })
        router.push("/superadmin/programs")
      }, 1000)
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
    //  <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
     // </AdminLayout>
    )
  }

  if (!program) {
    return (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <p className="text-gray-500 mb-6">The program you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/superadmin/programs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
          </Button>
        </div>
    )
  }

  return (
  //  <AdminLayout>
      <div className="px-4 py-6">
      <div className="flex flex-col gap-6 max-[95vw]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/superadmin/programs">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{program.name}</h1>
              <p className="text-gray-500">Program details and associated projects and clubs</p>
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
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href={`/superadmin/programs/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Program
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
                <CardDescription>Details about this program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Projects</span>
                      <Badge className="bg-blue-100 text-blue-800">{projects.length}</Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Clubs</span>
                      <Badge className="bg-green-100 text-green-800">{clubs.length}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Projects in this Program</CardTitle>
                <CardDescription>All projects associated with {program.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No projects found for this program.
                        </TableCell>
                      </TableRow>
                    ) : (
                      projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>{project.level}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{project.status}</Badge>
                          </TableCell>
                          <TableCell>{project.assignedCount} members</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/superadmin/projects/add">
                    <Book className="mr-2 h-4 w-4" />
                    Add New Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Associated Clubs</CardTitle>
                <CardDescription>Clubs participating in this program</CardDescription>
              </CardHeader>
              <CardContent>
                {clubs.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No clubs associated with this program.</p>
                ) : (
                  <div className="space-y-4">
                    {clubs.map((club) => (
                      <div key={club.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{club.name}</p>
                          <p className="text-sm text-gray-500">{club.city}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          <Users className="h-3 w-3 mr-1" />
                          {club.members}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={`/superadmin/programs/${params.id}/clubs`}>
                    <Users className="mr-2 h-4 w-4" />
                    View All Clubs
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Program</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this program? This action cannot be undone. All associated projects will
              be unlinked from this program.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{program.name}</p>
              <p className="text-sm text-gray-500">{program.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete Program
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
   // </AdminLayout>
  )
}
