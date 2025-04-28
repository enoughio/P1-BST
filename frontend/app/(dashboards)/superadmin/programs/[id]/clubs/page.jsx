"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Building2, Users } from "lucide-react"
import Link from "next/link"

export default function ProgramClubsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [program, setProgram] = useState(null)
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgramClubs = async () => {
      try {
        // In a real app, these would be API calls
        // const programData = await getProgram(params.id)
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

        // Mock clubs for this program
        const mockClubs = [
          {
            id: "1",
            name: "Bhopal Storytellers",
            address:
              "First Floor, Bharat Storytellers, B-66, near Chetak Bridge, Housing Board Colony, Kasturba Nagar, Bhopal, Madhya Pradesh 462022",
            city: "Bhopal",
            meetingTime: "Tuesdays, 6:30 PM",
            members: 32,
            admin: "John Doe",
            email: "jhondoe@example.com",
            phone: "123-456-7890",
          },
          {
            id: "2",
            name: "Delhi Orators",
            address: "123 MG Road, Connaught Place, New Delhi",
            city: "New Delhi",
            meetingTime: "Wednesdays, 7:00 PM",
            members: 45,
            admin: "Priya Sharma",
            email: "priya@example.com",
            phone: "999-888-7777",
          },
          {
            id: "3",
            name: "Mumbai Speakers",
            address: "Andheri West, Mumbai, Maharashtra",
            city: "Mumbai",
            meetingTime: "Fridays, 6:00 PM",
            members: 38,
            admin: "Rahul Desai",
            email: "rahul@example.com",
            phone: "888-777-6666",
          },
          {
            id: "4",
            name: "Bangalore Toastmasters",
            address: "MG Road, Bangalore, Karnataka",
            city: "Bangalore",
            meetingTime: "Mondays, 7:00 PM",
            members: 42,
            admin: "Aisha Khan",
            email: "aisha@example.com",
            phone: "777-666-5555",
          },
          {
            id: "5",
            name: "Chennai Speakers Club",
            address: "Anna Nagar, Chennai, Tamil Nadu",
            city: "Chennai",
            meetingTime: "Thursdays, 6:30 PM",
            members: 35,
            admin: "Vikram Mehta",
            email: "vikram@example.com",
            phone: "666-555-4444",
          },
        ]

        setProgram(programData)
        setClubs(mockClubs)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching program clubs:", error)
        toast({
          title: "Error",
          description: "Failed to load program clubs",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchProgramClubs()
  }, [params.id, toast])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!program) {
    return (
      <AdminLayout>
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
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/superadmin/programs/${params.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{program.name} - Clubs</h1>
              <p className="text-gray-500">Clubs participating in the {program.name} program</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/superadmin/clubs/add">
                <Building2 className="mr-2 h-4 w-4" />
                Add New Club
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Meeting Time</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No clubs found for this program.
                    </TableCell>
                  </TableRow>
                ) : (
                  clubs.map((club) => (
                    <TableRow key={club.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                          {club.name}
                        </div>
                      </TableCell>
                      <TableCell>{club.city}</TableCell>
                      <TableCell>{club.meetingTime}</TableCell>
                      <TableCell>{club.admin}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">
                          <Users className="h-3 w-3 mr-1" />
                          {club.members}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild className="text-blue-600">
                          <Link href={`/superadmin/clubs/${club.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
