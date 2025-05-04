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
import { ArrowLeft, Loader2, Plus, Save, Trash } from "lucide-react"
import Link from "next/link"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [project, setProject] = useState(null)
  const [resources, setResources] = useState([])
  const [objectives, setObjectives] = useState([])
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
        const mockProject = {
          id: params.id,
          title: "Researching and Presenting",
          description:
            "Research a topic, organize supporting materials, and deliver a well-organized speech. This project helps members develop their research skills and learn how to structure a clear, informative presentation.",
          level: "Level 2",
          path: "Presentation Mastery",
          status: "In Progress",
          completedDate: null,
          startDate: "2023-10-01",
          expectedCompletionDate: "2023-12-15",
          feedback: "",
          program: { id: "1", name: "Young Orators" },
          objectives: [
            "Research a topic thoroughly using credible sources",
            "Organize information logically with a clear introduction, body, and conclusion",
            "Cite sources and incorporate visual aids as appropriate",
            "Deliver a 5-7 minute speech on your researched topic",
          ],
          resources: [
            {
              title: "Project Checklist",
              type: "PDF",
              url: "https://example.com/checklist.pdf",
            },
            {
              title: "Effective Research Guide",
              type: "PDF",
              url: "https://example.com/research-guide.pdf",
            },
            {
              title: "Presentation Structure Template",
              type: "DOCX",
              url: "https://example.com/template.docx",
            },
          ],
        }

        setProject(mockProject)
        setPrograms(mockPrograms)

        // Convert objectives array to array of objects
        setObjectives(mockProject.objectives.map((obj) => ({ description: obj })))

        // Set resources
        setResources(mockProject.resources)

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

  // Handle resource changes
  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...resources]
    updatedResources[index][field] = value
    setResources(updatedResources)
  }

  // Add new resource
  const addResource = () => {
    setResources([...resources, { title: "", type: "PDF", url: "" }])
  }

  // Remove resource
  const removeResource = (index) => {
    const updatedResources = [...resources]
    updatedResources.splice(index, 1)
    setResources(updatedResources)
  }

  // Handle objective changes
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...objectives]
    updatedObjectives[index].description = value
    setObjectives(updatedObjectives)
  }

  // Add new objective
  const addObjective = () => {
    setObjectives([...objectives, { description: "" }])
  }

  // Remove objective
  const removeObjective = (index) => {
    const updatedObjectives = [...objectives]
    updatedObjectives.splice(index, 1)
    setObjectives(updatedObjectives)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Filter out empty resources and objectives
      const validResources = resources.filter((r) => r.title.trim() !== "")
      const validObjectives = objectives.filter((o) => o.description.trim() !== "").map((o) => o.description)

      // Prepare data for submission
      const projectData = {
        ...project,
        resources: validResources,
        objectives: validObjectives,
      }

      // In a real app, this would be an API call
      // await updateProject(project.id, projectData)

      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Project Updated",
          description: "The project has been successfully updated.",
        })
        router.push(`/superadmin/projects/${params.id}`)
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
              <Link href={`/superadmin/projects/${params.id}`}>
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
          <div className="grid gap-6">
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
                    <Label htmlFor="path">Path</Label>
                    <Input id="path" name="path" value={project.path} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
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
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Objectives</CardTitle>
                <CardDescription>Define what members will accomplish with this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`objective-${index}`} className={index > 0 ? "sr-only" : ""}>
                        Objective {index > 0 ? index + 1 : ""}
                      </Label>
                      <Textarea
                        id={`objective-${index}`}
                        value={objective.description}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        placeholder="Describe an objective for this project"
                        rows={2}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeObjective(index)}
                      disabled={objectives.length === 1}
                      className="mt-6"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addObjective} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Objective
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Resources</CardTitle>
                <CardDescription>Add materials that will help members complete this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="grid gap-4 border rounded-md p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`resource-title-${index}`}>Resource Title</Label>
                        <Input
                          id={`resource-title-${index}`}
                          value={resource.title}
                          onChange={(e) => handleResourceChange(index, "title", e.target.value)}
                          placeholder="e.g., Project Checklist"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`resource-type-${index}`}>Resource Type</Label>
                        <Select
                          value={resource.type}
                          onValueChange={(value) => handleResourceChange(index, "type", value)}
                        >
                          <SelectTrigger id={`resource-type-${index}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="DOCX">DOCX</SelectItem>
                            <SelectItem value="PPTX">PPTX</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                            <SelectItem value="Link">Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`resource-url-${index}`}>Resource URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`resource-url-${index}`}
                          value={resource.url}
                          onChange={(e) => handleResourceChange(index, "url", e.target.value)}
                          placeholder="https://example.com/resource"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-shrink-0"
                          onClick={() => removeResource(index)}
                          disabled={resources.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addResource} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/superadmin/projects/${params.id}`)}
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
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
