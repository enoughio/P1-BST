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
import { updateClub } from "@/lib/api"
// import { getClub } from "@/lib/api"

// name: "",
// address: "",
// city: "",
// meetingTime: "",
// position: [0, 0],
// dmsPosition: "",
// description: "",
// Admin: "",
// adminId: "",
// inicative: "",
// adminUsername: "",
// email: "",
// phone: "",

let sampleData = {

  name: "Sample Club",
  address: "123 Sample St, Sample City, SC 12345",
  city: "Sample City",
  meetingTime: "Every Tuesday at 6 PM",
  position: [34.0522, -118.2437], // Sample coordinates (latitude, longitude)
  dmsPosition: "34.0522° N, 118.2437° W",
  description: "",
  Admin: "",
  adminId: "",
  inicative: "",
  adminUsername: "",
  email: "",
  phone: "",
  
} 


export default function EditClubPage({clubData : sampleData}) {

  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [club, setClub] = useState(clubData || null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target
    setClub((prev) => ({ ...prev, [name]: value }))
  }

  const handlePositionChange = (axis, value) => {
    if (!club.position) {
      const newPosition = [0, 0]
      newPosition[axis] = Number.parseFloat(value) || 0
      setClub((prev) => ({ ...prev, position: newPosition }))
    } else {
      const newPosition = [...club.position]
      newPosition[axis] = Number.parseFloat(value) || 0
      setClub((prev) => ({ ...prev, position: newPosition }))
    }
  }



  const handleSubmit = async (e) => {

    e.preventDefault()
    setIsSaving(true)
  

    // TODO: complete this edit club function
    try {
      
      const data = updateClub(params.id, club)

      
      console.log("Club updated successfully:")

      toast({
        title: "Club Updated",
        description: "The club has been successfully updated.",
      })

      router.push(`/superadmin/clubs/`)
      setIsSaving(false)

    } catch (error) {
      console.error("Error updating club:", error)
      toast({
        title: "Error",
        description: "Failed to update club details",
        variant: "destructive",
      })
      setIsSaving(false)  
    }

  }

  if (!club) {
    return (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Club Not Found</h1>
          <p className="text-gray-500 mb-6">The club you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/superadmin/clubs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clubs
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
              <Link href={`/superadmin/clubs/${params.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Club</h1>
              <p className="text-gray-500">Update the details for {club.name}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
              <CardDescription>Edit the basic details for this club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Club Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={club.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={club.address}
                onChange={handleChange}
                placeholder="e.g., 123 Main St, Apt 4B"
                rows={3}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={club.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingTime">Meeting Time *</Label>
                <Input
                  id="meetingTime"
                  name="meetingTime"
                  placeholder="e.g., Tuesdays, 6:30 PM"
                  value={club.meetingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inicative">
                </Label>
                {/* <Input
                    id="inicative"
                    name="inicative"
                    placeholder=""
                    value={club.meetingTime}
                    onChange={handleChange}
                    required
                  /> */}

                <Select
                  id="inicative"
                  name="inicative"
                  value={club.inicative}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select an Inicative" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Storytellers">Storytellers</SelectItem>
                    <SelectItem value="Young Orater's">
                      Young Orater's
                    </SelectItem>
                    <SelectItem value="Young Leaders">Young Leaders</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className="space-y-2">
              <Label>Location Coordinates</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    value={club.position[0]}
                    onChange={(e) => handlePositionChange(0, e.target.value)}
                    placeholder="e.g., 23.2339"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    value={club.position[1]}
                    onChange={(e) => handlePositionChange(1, e.target.value)}
                    placeholder="e.g., 77.4401"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dmsPosition">DMS Position (Optional)</Label>
              <Input
                id="dmsPosition"
                name="dmsPosition"
                placeholder="e.g., 40°42'46.08&quot;N, 74°00'21.6&quot;W"
                value={club.dmsPosition}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={club.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Information</CardTitle>
              <CardDescription>Contact details for the club administrator</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Admin">Admin Name *</Label>
              <Input
                id="Admin"
                name="Admin"
                value={club.Admin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminId">Admin Id *</Label>
              <Input
                id="adminId"
                name="adminId"
                value={club.Admin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminUsername">Admin Username *</Label>
              <Input
                id="adminUsername"
                name="adminUsername"
                value={club.adminUsername}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={club.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={club.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>



            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/superadmin/clubs/${params.id}`)}
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
    
  )
}

