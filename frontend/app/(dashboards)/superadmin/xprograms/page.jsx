"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Book, MoreHorizontal, Plus, Trash, Users, Pencil } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Mock data for programs
        const mockPrograms = [
          {
            id: "1",
            name: "Young Orators",
            description: "A program designed for young speakers to develop their public speaking skills.",
            clubCount: 5,
            projectCount: 12,
          },
          {
            id: "2",
            name: "Young Leaders",
            description: "Focused on developing leadership skills in young individuals.",
            clubCount: 3,
            projectCount: 8,
          },
          {
            id: "3",
            name: "Storytellers",
            description: "A program for those who want to master the art of storytelling.",
            clubCount: 4,
            projectCount: 10,
          },
        ]

        setPrograms(mockPrograms)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching programs:", error)
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const handleDelete = async () => {
    if (!selectedProgram) return

    try {
      // In a real app, this would be an API call
      // await deleteProgram(selectedProgram.id)

      // Update local state
      setPrograms(programs.filter((program) => program.id !== selectedProgram.id))
      setIsDeleteDialogOpen(false)

      toast({
        title: "Program Deleted",
        description: "The program has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
  //  <AdminLayout>
  <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Programs</h1>
            <p className="text-gray-500">Manage programs across the organization.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/superadmin/programs/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Program
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Clubs</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      Loading programs...
                    </TableCell>
                  </TableRow>
                ) : programs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      No programs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-2 text-blue-600" />
                          {program.name}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md truncate">{program.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {program.clubCount} clubs
                        </div>
                      </TableCell>
                      <TableCell>{program.projectCount} projects</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/programs/${program.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/programs/${program.id}/edit`}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Program
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/programs/${program.id}/clubs`}>
                                <Users className="h-4 w-4 mr-2" />
                                View Clubs
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedProgram(program)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Program
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
            {selectedProgram && (
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{selectedProgram.name}</p>
                <p className="text-sm text-gray-500">{selectedProgram.description}</p>
              </div>
            )}
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
