"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Building, Calendar, Edit, Loader2, Mail, MapPin, Phone, Trash, Users } from "lucide-react"
import Link from "next/link"

// Mock function to get admin details
const getAdminDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 98765 43210",
        joinDate: "2020-03-10",
        status: "Active",
        role: "Club Admin",
        club: {
          id: "1",
          name: "Bhopal Storytellers",
          location: "Bhopal, Madhya Pradesh",
          members: 45,
          established: "2015-03-15",
        },
        address: "456 Park Avenue, Bhopal, Madhya Pradesh",
        bio: "Dedicated to fostering a supportive environment for public speaking and leadership development.",
        profileImage: "",
      })
    }, 1000)
  })
}

export default function ClubAdminDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminDetails(params.id)
        setAdmin(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching admin details:", error)
        toast({
          title: "Error",
          description: "Failed to load admin details",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  const handleDelete = async () => {
    try {
      // In a real app, this would be an API call
      // await deleteAdmin(admin.id)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Admin Deleted",
        description: "The club admin has been successfully deleted.",
      })

      router.push("/superadmin/club-admins")
    } catch (error) {
      console.error("Error deleting admin:", error)
      toast({
        title: "Error",
        description: "Failed to delete admin. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
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

  if (!admin) {
    return (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Admin Not Found</h1>
          <p className="text-gray-500 mb-6">The club admin you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/superadmin/club-admins">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Club Admins
            </Link>
          </Button>
        </div>
    )
  }

  return (
  //  <AdminLayout>
  <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/superadmin/club-admins">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{admin.name}</h1>
              <p className="text-gray-500">
                {admin.role} of {admin.club.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-gray-700 border-gray-200 hover:bg-gray-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Admin
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href={`/superadmin/club-admins/${admin.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Admin
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status:</span>
                  <Badge className="bg-green-100 text-green-800">{admin.status}</Badge>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{admin.email}</span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{admin.phone}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Joined: {new Date(admin.joinDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Club: {admin.club.name}</span>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                  <span className="text-gray-700">{admin.address}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={`/superadmin/clubs/${admin.club.id}`}>
                    <Building className="mr-2 h-4 w-4" />
                    View Club Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{admin.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Club Information</CardTitle>
                <CardDescription>Details about the club this admin manages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Club Name:</span>
                  <span className="font-medium">{admin.club.name}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Location:</span>
                  <span className="font-medium">{admin.club.location}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Members:</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="font-medium">{admin.club.members}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Established:</span>
                  <span className="font-medium">{new Date(admin.club.established).toLocaleDateString()}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={`/superadmin/clubs/${admin.club.id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    View Club Members
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
            <DialogTitle>Delete Club Admin</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this club admin? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name: </span>
                <span>{admin.name}</span>
              </div>
              <div>
                <span className="font-medium">Email: </span>
                <span>{admin.email}</span>
              </div>
              <div>
                <span className="font-medium">Club: </span>
                <span>{admin.club.name}</span>
              </div>
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
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              <Trash className="mr-2 h-4 w-4" />
              Delete Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
   // </AdminLayout>
  )
}
