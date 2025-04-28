"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock programs data
        const mockPrograms = [
          { id: "1", name: "Young Orators" },
          { id: "2", name: "Young Leaders" },
          { id: "3", name: "Storytellers" },
        ]

        // Mock project data
        const mockProjects = {
          1: {
            id: "1",
            title: "Ice Breaker",
            description: "First speech project focusing on introducing yourself to the club",
            level: "Level 1",
            status: "Completed",
            completedDate: "2023-10-15",
            feedback: "Great first speech! Effectively introduced yourself and showed your enthusiasm.",
            program: { id: "1", name: "Young Orators" },
          },
          2: {
            id: "2",
            title: "Researching and Presenting",
            description: "Research a topic, organize supporting materials, and deliver a well-organized speech",
            level: "Level 2",
            status: "In Progress",
            completedDate: null,
            feedback: "",
            program: { id: "1", name: "Young Orators" },
          },
          3: {
            id: "3",
            title: "Focus on the Positive",
            description: "Practice using language that shows positivity in your speech",
            level: "Level 3",
            status: "Completed",
            completedDate: "2023-09-22",
            feedback: "Excellent use of positive language. Very motivational and uplifting.",
            program: { id: "2", name: "Young Leaders" },
          },
          4: {
            id: "4",
            title: "Connect with Storytelling",
            description: "Practice storytelling techniques to connect with your audience",
            level: "Level 2",
            status: "Not Started",
            completedDate: null,
            feedback: "",
            program: { id: "3", name: "Storytellers" },
          },
        }

        const projectData = mockProjects[params.id]

        if (!projectData) {
          throw new Error("Project not found")
        }

        setProject(projectData)
        setPrograms(mockPrograms)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "There was a problem loading the project details.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    if (name === "program") {
      // Find the program object
      const selectedProgram = programs.find((p) => p.id === value)
      setProject((prev) => ({
        ...prev,
        program: selectedProgram ? { id: selectedProgram.id, name: selectedProgram.name } : null,
      }))
    } else {
      setProject((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      // await updateProject(project.id, project)

      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Project Updated",
          description: "The project has been successfully updated.",
        })
        router.push(`/superadmin/projects`)
        setIsSaving(false)
      }, 1000)
    } catch (error) {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      })
      setIsSaving(false)
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

  if (!project) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/superadmin/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
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
              <Link href="/superadmin/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Project</h1>
              <p className="text-gray-500">Update project details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Update the details for this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input id="title" name="title" value={project.title} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select value={project.level} onValueChange={(value) => handleSelectChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Level 1">Level 1</SelectItem>
                      <SelectItem value="Level 2">Level 2</SelectItem>
                      <SelectItem value="Level 3">Level 3</SelectItem>
                      <SelectItem value="Level 4">Level 4</SelectItem>
                      <SelectItem value="Level 5">Level 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={project.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-2">
                <Label htmlFor="program">Program *</Label>
                <Select
                  value={project.program?.id || ""}
                  onValueChange={(value) => handleSelectChange("program", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {project.status === "Completed" && (
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={project.feedback || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Provide feedback for the completed project"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/superadmin/projects")}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AdminLayout>
  )
}
