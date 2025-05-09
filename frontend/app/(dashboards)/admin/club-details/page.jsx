"use client"

import { useEffect, useState } from "react"
import { getClub, updateClub } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Building, CalendarClock, Loader2, Mail, MapPin, Phone, Save, User, Users, Image as ImageIcon } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import ExecutiveCommitteeManager from "@/components/executive-committee-manager" // Import the new component

export default function ClubDetailsPage() {
  const [club, setClub] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchClubDetails = async () => {    
      try {
        const data = await getClub(user.clubId)
        setClub(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching club details:", error)
        setIsLoading(false)
        toast({
          title: "Error",
          description: "Failed to load club details. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchClubDetails()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setClub((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      await updateClub(club.club_id, club)
      setIsEditing(false)

      toast({
        title: "Club Details Updated",
        description: "Your club details have been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating club details:", error)
      toast({
        title: "Error",
        description: "Failed to update club details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle updates from the ExecutiveCommitteeManager
  const handleCommitteeUpdate = (updatedClub) => {
    setClub(updatedClub)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Details</h1>
          <p className="text-muted-foreground">View and manage your club's information.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {club && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
              <CardDescription>Basic information about your club.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {club.image && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Label>Club Image</Label>
                  </div>
                  <div className="overflow-hidden rounded-md border">
                    <img 
                      src={club.image} 
                      alt={club.club_name} 
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <Input
                      type="file"
                      accept="image/*"
                      // Note: You'll need to implement file upload logic
                    />
                  )}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Club Name</Label>
                </div>
                {isEditing ? (
                  <Input name="club_name" value={club.club_name} onChange={handleChange} />
                ) : (
                  <p className="text-sm font-medium">{club.club_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Address</Label>
                </div>
                {isEditing ? (
                  <Textarea name="address" value={club.address} onChange={handleChange} />
                ) : (
                  <p className="text-sm">{club.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>City</Label>
                </div>
                {isEditing ? (
                  <Input name="city" value={club.city} onChange={handleChange} />
                ) : (
                  <p className="text-sm">{club.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Meeting Time</Label>
                </div>
                {isEditing ? (
                  <Input name="meeting_time" value={club.meeting_time} onChange={handleChange} />
                ) : (
                  <p className="text-sm">{club.meeting_time}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Members Count</Label>
                </div>
                <p className="text-sm font-medium">{club.members}</p>
              </div>
              
              {club.initiative !== null && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Label>Initiative</Label>
                  </div>
                  {isEditing ? (
                    <Input name="initiative" value={club.initiative || ""} onChange={handleChange} />
                  ) : (
                    <p className="text-sm">{club.initiative || "N/A"}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Contact details for club administration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Admin Name</Label>
                </div>
                <p className="text-sm font-medium">{club.admin}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Admin Username</Label>
                </div>
                <p className="text-sm">{club.admin_username}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Email</Label>
                </div>
                {isEditing ? (
                  <Input name="email" value={club.email} onChange={handleChange} />
                ) : (
                  <p className="text-sm">{club.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Label>Phone</Label>
                </div>
                {isEditing ? (
                  <Input name="mobile" value={club.mobile} onChange={handleChange} />
                ) : (
                  <p className="text-sm">{club.mobile}</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Club Description</Label>
                {isEditing ? (
                  <Textarea name="description" value={club.description} onChange={handleChange} rows={5} />
                ) : (
                  <p className="text-sm">{club.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Club Location</CardTitle>
              <CardDescription>The geographical location of your club.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden aspect-video">
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59365.55110417767!2d77.40113913124998!3d23.233433599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1690356415188!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {isEditing && (
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="map">Map Embed Code</Label>
                    <Textarea 
                      id="map" 
                      name="map" 
                      value={club.map || ""}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter Google Maps embed code or map URL"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Executive Committee Manager Component */}
          <ExecutiveCommitteeManager club={club} onUpdate={handleCommitteeUpdate} />
        </div>
      )}
    </div>
  )
}