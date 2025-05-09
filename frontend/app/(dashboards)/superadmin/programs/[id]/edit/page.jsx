"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"

export default function EditProgramPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        // In a real app, this would be an API call
        // const data = await getProgram(params.id)

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

        const data = mockPrograms[params.id]

        if (!data) {
          throw new Error("Program not found")
        }

        setProgram(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching program:", error)
        toast({
          title: "Error",
          description: "Failed to load program details",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchProgram()
  }, [params.id, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProgram((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      // await updateProgram(program.id, program)

      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Program Updated",
          description: "The program has been successfully updated.",
        })
        router.push("/superadmin/programs")
        setIsSaving(false)
      }, 1000)
    } catch (error) {
      console.error("Error updating program:", error)
      toast({
        title: "Error",
        description: "Failed to update program. Please try again.",
        variant: "destructive",
      })
      setIsSaving(false)
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
   //   <AdminLayout>
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
    //  </AdminLayout>
    )
  }

  return (
  //  <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/superadmin/programs">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Program</h1>
              <p className="text-gray-500">Update program details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
              <CardDescription>Update the details for this program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name *</Label>
                <Input id="name" name="name" value={program.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={program.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/superadmin/programs")}
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
   // </AdminLayout>
  )
}
